from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.interview import (
    QuestionRequest,
    QuestionResponse,
    IdealAnswerRequest,
    IdealAnswerResponse,
    EvaluationRequest,
    EvaluationResponse,
    InterviewHistoryItem,
)

from app.services.interview_service import (
    interview_service,
)

from app.repositories.interview_repository import (
    interview_repository,
)

from app.database.database import get_db
from app.core.auth import get_current_user
from app.models.user import User


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
        interview_type=request.interview_type,
        topic=request.topic,
        difficulty=request.difficulty,
    )

    return {
        "interview_type": request.interview_type,
        "topic": request.topic,
        "difficulty": request.difficulty,
        "question": question,
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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    result = interview_service.evaluate_answer(
        request.interview_type,
        request.question,
        request.candidate_answer,
    )

    interview_service.save_interview(
        db=db,
        user_id=current_user.id,
        topic=request.topic,
        difficulty=request.difficulty,
        interview_type=request.interview_type,
        result=result,
    )

    return result


@router.get(
    "/history",
    response_model=list[InterviewHistoryItem],
)
def history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return interview_repository.get_history(
        db,
        current_user.id,
    )