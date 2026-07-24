from fastapi import APIRouter

from app.ai.ollama_service import ollama
from app.prompts.question_prompt import build_question_prompt

from app.schemas.interview import (
    QuestionRequest,
    QuestionResponse,
)

router = APIRouter(
    prefix="/interview",
    tags=["Interview"],
)


@router.post(
    "/question",
    response_model=QuestionResponse,
)
def generate_question(
    request: QuestionRequest,
):
    prompt = build_question_prompt(
        request.topic,
        request.difficulty,
    )

    question = ollama.generate(prompt)
    print(question)
    print(type(question))

    return QuestionResponse(
        topic=request.topic,
        difficulty=request.difficulty,
        question=question,
    )