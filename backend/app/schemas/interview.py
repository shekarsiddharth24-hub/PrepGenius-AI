from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Literal
from typing import Optional

class EvaluationRequest(BaseModel):
    interview_type: Literal[
        "technical",
        "behavioral",
    ]
    topic: str | None = None
    difficulty: str
    question: str
    candidate_answer: str = Field(..., min_length=1, max_length=20000)

    # "code" for coding answers (judged without embedding similarity)
    answer_type: Literal["text", "code"] = "text"
    language: str | None = Field(default=None, max_length=30)


class EvaluationResponse(BaseModel):
    question: str

    candidate_answer: str

    overall_score: float

    strengths: list[str]
    weaknesses: list[str]
    suggestions: list[str]

    semantic_score: float | None = None
    technical_score: float | None = None
    completeness_score: float | None = None
    communication_score: float | None = None

    professionalism_score: float | None = None
    leadership_score: float | None = None
    problem_solving_score: float | None = None
    star_score: float | None = None

    ideal_answer: str | None = None


class QuestionRequest(BaseModel):

    interview_type: Literal[
        "technical",
        "behavioral",
    ]
    topic: str | None = None
    difficulty: str


class QuestionResponse(BaseModel):
    interview_type: str
    topic: str | None = None
    difficulty: str
    question: str


class IdealAnswerRequest(BaseModel):
    question: str


class IdealAnswerResponse(BaseModel):
    ideal_answer: str

class InterviewHistoryItem(BaseModel):
    id: int
    interview_type: Literal[
        "technical",
        "behavioral",
    ]
    topic: str | None = None
    difficulty: str
    overall_score: float
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )