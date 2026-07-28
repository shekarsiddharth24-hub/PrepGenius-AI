from datetime import datetime

from pydantic import BaseModel

from app.schemas.resume import ResumeAnalysisResponse


class ResumeHistoryItem(BaseModel):
    id: int

    filename: str

    resume_score: int

    created_at: datetime

    class Config:
        from_attributes = True


class ResumeHistoryResponse(BaseModel):
    items: list[ResumeHistoryItem]


class ResumeDetailResponse(ResumeAnalysisResponse):
    id: int

    filename: str

    created_at: datetime

    class Config:
        from_attributes = True