from fastapi import APIRouter

from app.ai.ollama_service import ollama

router = APIRouter()


@router.get("/test-ai")
def test_ai():

    answer = ollama.generate("Say Hello from PrepGenius AI")

    return {
        "response": answer
    }