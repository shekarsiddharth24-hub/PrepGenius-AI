from fastapi import APIRouter

from app.ai.ollama_service import generate

router = APIRouter()


@router.get("/test-ai")
def test_ai():

    answer = generate("Say Hello from PrepGenius AI")

    return {
        "response": answer
    }