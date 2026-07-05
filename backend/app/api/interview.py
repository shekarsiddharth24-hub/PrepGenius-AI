from fastapi import APIRouter

from app.ai.ollama_service import ollama
from app.prompts.question_prompt import build_question_prompt

router = APIRouter(prefix="/interview", tags=["Interview"])


@router.get("/question")
def generate_question(
    topic: str,
    difficulty: str,
):

    prompt = build_question_prompt(topic, difficulty)

    question = ollama.generate(prompt)

    return {
        "topic": topic,
        "difficulty": difficulty,
        "question": question
    }