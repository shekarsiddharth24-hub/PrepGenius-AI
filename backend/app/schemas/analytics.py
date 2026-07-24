from pydantic import BaseModel


class TopicScore(BaseModel):
    topic: str
    score: float


class TrendPoint(BaseModel):
    date: str
    score: float


class AnalyticsResponse(BaseModel):
    total_interviews: int

    average_score: float
    best_score: float

    best_topic: str | None
    weakest_topic: str |None

    average_semantic: float
    average_technical: float
    average_communication: float

    topic_scores: list[TopicScore]
    trend: list[TrendPoint]

    technical_interviews: int

    behavioral_interviews: int

    technical_average_score: float

    behavioral_average_score: float