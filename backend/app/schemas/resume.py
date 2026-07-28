from pydantic import BaseModel, Field


class ResumeSkill(BaseModel):
    skill: str
    reason: str | None = None


class ResumeSoftSkill(BaseModel):
    text: str
    evidence: str | None = None


class ResumeProject(BaseModel):
    name: str
    description: str | None = None
    tech_stack: list[ResumeSkill] = Field(default_factory=list)


class ResumeStrength(BaseModel):
    text: str
    evidence: str


class ResumeWeakness(BaseModel):
    text: str
    evidence: str


class ResumeMissingSkill(BaseModel):
    skill: str
    reason: str


class RecommendedTopic(BaseModel):
    topic: str
    reason: str


class ResumeAnalysisResponse(BaseModel):
    resume_score: int = Field(..., ge=0, le=100)

    technical_skills: list[ResumeSkill] = Field(default_factory=list)
    soft_skills: list[ResumeSoftSkill] = Field(default_factory=list)

    projects: list[ResumeProject] = Field(default_factory=list)

    strengths: list[ResumeStrength] = Field(default_factory=list)
    weaknesses: list[ResumeWeakness] = Field(default_factory=list)
    missing_skills: list[ResumeMissingSkill] = Field(default_factory=list)

    recommended_topics: list[RecommendedTopic] = Field(default_factory=list)