from fastapi import APIRouter

from app.ai.ollama_service import generate
from app.prompts.question_prompt import build_prompt

router = APIRouter(prefix="/interview", tags=["Interview"])


@router.get("/question")
def generate_question(
    topic: str,
    difficulty: str,
):

    prompt = build_prompt(topic, difficulty)

    question = generate(prompt)

    return {
        "topic": topic,
        "difficulty": difficulty,
        "question": question
    }