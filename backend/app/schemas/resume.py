from pydantic import BaseModel, Field


class ResumeProject(BaseModel):
    name: str
    description: str | None = None
    tech_stack: list[str] = Field(default_factory=list)


class ResumeAnalysisResponse(BaseModel):
    resume_score: int
    technical_skills: list[str]
    soft_skills: list[str]
    projects: list[ResumeProject]
    strengths: list[str]
    weaknesses: list[str]
    missing_skills: list[str]
    recommended_topics: list[str]