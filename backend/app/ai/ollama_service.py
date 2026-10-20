import logging
import threading

import requests

from app.core.config import settings
from app.core.exceptions import ServerBusyError
from app.utils.json_parser import extract_json, strip_thinking

logger = logging.getLogger("prepgenius")


class OllamaService:
    def __init__(self):
        self.base_url = settings.OLLAMA_URL
        self.url = f"{self.base_url}/api/generate"
        self.timeout = settings.OLLAMA_TIMEOUT
        # Caps simultaneous model calls so a burst of requests cannot
        # exhaust the machine; extra requests wait, then get HTTP 503.
        self._slots = threading.BoundedSemaphore(
            settings.MAX_CONCURRENT_LLM_CALLS
        )

    def _post(
        self,
        payload: dict,
        timeout: int | None = None,
    ) -> requests.Response:
        return requests.post(
            self.url,
            json=payload,
            timeout=timeout or self.timeout,
        )

    def _request(
        self,
        *,
        prompt: str,
        model: str | None = None,
        temperature: float = 0.3,
        max_tokens: int | None = None,
        timeout: int | None = None,
        json_mode: bool = False,
    ) -> dict:
        """
        Send a request to the Ollama API.

        Returns the raw JSON response.
        """

        options = {
            "temperature": temperature,
        }

        if max_tokens:
            options["num_predict"] = max_tokens

        payload = {
            "model": model or settings.CHAT_MODEL,
            "prompt": prompt,
            "stream": False,
            "think": settings.OLLAMA_THINK,
            "keep_alive": settings.OLLAMA_KEEP_ALIVE,
            "options": options,
        }

        # Constrain output to valid JSON (avoids wasted retries)
        if json_mode:
            payload["format"] = "json"

        if not self._slots.acquire(timeout=settings.LLM_QUEUE_TIMEOUT):
            raise ServerBusyError()

        try:
            response = self._post(payload, timeout)

            # Models without thinking support may reject the "think" field.
            # Retry once without it instead of failing the request.
            if (
                response.status_code == 400
                and "think" in response.text.lower()
            ):
                payload.pop("think")
                response = self._post(payload, timeout)
        finally:
            self._slots.release()

        response.raise_for_status()

        data = response.json()

        self._log_timing(payload["model"], data)

        return data

    @staticmethod
    def _log_timing(model: str, data: dict) -> None:
        """Log how long the model took, so slow calls are easy to spot."""

        total_s = data.get("total_duration", 0) / 1e9
        load_s = data.get("load_duration", 0) / 1e9
        eval_s = data.get("eval_duration", 0) / 1e9
        tokens = data.get("eval_count", 0)
        prompt_tokens = data.get("prompt_eval_count", 0)
        tps = tokens / eval_s if eval_s else 0

        logger.info(
            "Ollama | model=%s total=%.1fs load=%.1fs "
            "prompt_tokens=%d output_tokens=%d (%.1f tok/s)",
            model,
            total_s,
            load_s,
            prompt_tokens,
            tokens,
            tps,
        )

    def generate(
        self,
        prompt: str,
        model: str | None = None,
        temperature: float = 0.3,
        max_tokens: int | None = None,
        timeout: int | None = None,
        json_mode: bool = False,
    ) -> str:
        """
        Generate a text response (any <think> reasoning is removed).
        """

        data = self._request(
            prompt=prompt,
            model=model,
            temperature=temperature,
            max_tokens=max_tokens,
            timeout=timeout,
            json_mode=json_mode,
        )

        return strip_thinking(data["response"])

    def generate_json(
        self,
        prompt: str,
        model: str | None = None,
        temperature: float = 0.2,
        max_tokens: int | None = None,
        timeout: int | None = None,
    ) -> dict:
        """
        Generate structured JSON.

        The prompt should instruct the model to return
        only valid JSON. Raises ValueError if none can be parsed.
        """

        response = self.generate(
            prompt=prompt,
            model=model,
            temperature=temperature,
            max_tokens=max_tokens,
            timeout=timeout,
            json_mode=True,
        )

        return extract_json(response)

    def warmup(self, models: list[str]) -> None:
        """
        Load models into memory so the first real request is not slow.

        Never raises: if Ollama is down the app should still start.
        """

        for model in dict.fromkeys(models):
            try:
                # An empty prompt just loads the model
                response = requests.post(
                    self.url,
                    json={
                        "model": model,
                        "prompt": "",
                        "stream": False,
                        "keep_alive": settings.OLLAMA_KEEP_ALIVE,
                    },
                    timeout=self.timeout,
                )
                response.raise_for_status()
                logger.info("Ollama warm-up complete | model=%s", model)

            except Exception as e:
                logger.warning(
                    "Ollama warm-up failed | model=%s error=%s", model, e
                )


ollama = OllamaService()
