from datetime import datetime
from app.schemas.resume import ResumeAnalysisResponse
import json

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy.orm import relationship

from app.database.database import Base


class ResumeAnalysis(Base):
    __tablename__ = "resume_analyses"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    filename = Column(
        Text,
        nullable=False,
    )

    resume_score = Column(
        Integer,
        nullable=False,
    )

    technical_skills = Column(
        Text,
        nullable=False,
        default="[]",
    )

    soft_skills = Column(
        Text,
        nullable=False,
        default="[]",
    )

    projects = Column(
    Text,
    nullable=False,
    default="[]",
    )

    strengths = Column(
        Text,
        nullable=False,
        default="[]",
    )

    weaknesses = Column(
        Text,
        nullable=False,
        default="[]",
    )

    missing_skills = Column(
        Text,
        nullable=False,
        default="[]",
    )

    recommended_topics = Column(
        Text,
        nullable=False,
        default="[]",
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        index=True,
    )

    user = relationship(
        "User",
        back_populates="resume_analyses",
    )

    @property
    def technical_skills_list(self):
        return json.loads(self.technical_skills)

    @property
    def soft_skills_list(self):
        return json.loads(self.soft_skills)

    @property
    def projects_list(self):
        return json.loads(self.projects)

    @property
    def strengths_list(self):
        return json.loads(self.strengths)

    @property
    def weaknesses_list(self):
        return json.loads(self.weaknesses)

    @property
    def missing_skills_list(self):
        return json.loads(self.missing_skills)

    @property
    def recommended_topics_list(self):
        return json.loads(self.recommended_topics)

    @property
    def parsed_analysis(self) -> ResumeAnalysisResponse:
        return ResumeAnalysisResponse(
            resume_score=self.resume_score,
            technical_skills=json.loads(self.technical_skills),
            soft_skills=json.loads(self.soft_skills),
            projects=json.loads(self.projects),
            strengths=json.loads(self.strengths),
            weaknesses=json.loads(self.weaknesses),
            missing_skills=json.loads(self.missing_skills),
            recommended_topics=json.loads(self.recommended_topics),
    )