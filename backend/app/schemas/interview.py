from pydantic import BaseModel


class EvaluationRequest(BaseModel):
    question: str
    candidate_answer: str


class EvaluationResponse(BaseModel):
    question: str
    ideal_answer: str
    candidate_answer: str

    semantic_score: float

    technical_score: float

    completeness_score: float

    communication_score: float

    overall_score: float

    strengths: list[str]

    weaknesses: list[str]

    suggestions: list[str]

class QuestionRequest(BaseModel):
    topic: str
    difficulty: str


class QuestionResponse(BaseModel):
    question: str


class IdealAnswerRequest(BaseModel):
    question: str


class IdealAnswerResponse(BaseModel):
    ideal_answer: str