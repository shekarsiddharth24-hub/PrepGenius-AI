from datetime import datetime

from pydantic import BaseModel


class ResumeHistoryItem(BaseModel):
    id: int

    filename: str

    resume_score: int

    created_at: datetime

    class Config:
        from_attributes = True


class ResumeHistoryResponse(BaseModel):
    items: list[ResumeHistoryItem]

class ResumeDetailResponse(BaseModel):
    id: int

    filename: str

    resume_score: int

    technical_skills: list[str]

    soft_skills: list[str]

    strengths: list[str]

    weaknesses: list[str]

    missing_skills: list[str]

    recommended_topics: list[str]

    created_at: datetime

    class Congig:
        from_attributes= True