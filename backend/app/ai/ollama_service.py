import json

import requests

from app.core.config import settings


class OllamaService:
    def __init__(self):
        self.url = f"{settings.OLLAMA_URL}/api/generate"
        self.timeout = 180

    def _request(
        self,
        *,
        prompt: str,
        model: str | None = None,
        temperature: float = 0.3,
    ) -> dict:
        """
        Send a request to the Ollama API.

        Returns the raw JSON response.
        """

        payload = {
            "model": model or settings.CHAT_MODEL,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": temperature,
            },
        }

        response = requests.post(
            self.url,
            json=payload,
            timeout=self.timeout,
        )

        response.raise_for_status()

        return response.json()

    def generate(
        self,
        prompt: str,
        model: str | None = None,
        temperature: float = 0.3,
    ) -> str:
        """
        Generate a text response.
        """

        data = self._request(
            prompt=prompt,
            model=model,
            temperature=temperature,
        )

        return data["response"].strip()

    def generate_json(
        self,
        prompt: str,
        model: str | None = None,
        temperature: float = 0.2,
    ) -> dict:
        """
        Generate structured JSON.

        The prompt should instruct the model to return
        only valid JSON.
        """

        response = self.generate(
            prompt=prompt,
            model=model,
            temperature=temperature,
        )

        response = (
            response.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(response)


ollama = OllamaService()