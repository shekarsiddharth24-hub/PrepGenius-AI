import requests

from app.core.config import settings


class OllamaService:

    def __init__(self):
        self.url = "http://localhost:11434/api/generate"
        self.model = settings.MODEL_NAME

    def generate(self, prompt: str) -> str:

        response = requests.post(
            self.url,
            json={
                "model": self.model,
                "prompt": prompt,
                "stream": False,
            },
            timeout=180,
        )

        response.raise_for_status()

        data = response.json()

        return data["response"].strip()


ollama = OllamaService()
