from pydantic import BaseModel


class EvaluationRequest(BaseModel):
    question: str
    ideal_answer: str
    candidate_answer: str


class EvaluationResponse(BaseModel):
    semantic_score: float
    technical_score: float
    completeness_score: float
    communication_score: float
    strengths: list[str]
    weaknesses: list[str]
    suggestions: list[str]
    overall_score: float