from fastapi import APIRouter

from app.schemas.interview import (
    QuestionRequest,
    QuestionResponse,
    IdealAnswerRequest,
    IdealAnswerResponse,
    EvaluationRequest,
    EvaluationResponse
)

from app.services.interview_service import (
    interview_service,
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

    question = interview_service.generate_question(
        request.topic,
        request.difficulty,
    )

    return {
        "question": question
    }


@router.post(
    "/ideal-answer",
    response_model=IdealAnswerResponse,
)
def generate_answer(
    request: IdealAnswerRequest,
):

    answer = interview_service.generate_ideal_answer(
        request.question,
    )

    return {
        "ideal_answer": answer
    }

@router.post(
    "/evaluate",
    response_model=EvaluationResponse,
)
def evaluate_answer(
    request: EvaluationRequest,
):

    return interview_service.evaluate_answer(
        request.question,
        request.candidate_answer,
    )