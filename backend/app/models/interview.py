from datetime import datetime

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy.orm import relationship

from app.database.database import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    topic = Column(Text, nullable=True)

    difficulty = Column(Text, nullable=False)

    interview_type= Column(
        Text,
        nullable=False,
        default="technical",
    )

    question = Column(Text, nullable=False)

    ideal_answer = Column(Text, nullable=True)

    user_answer = Column(Text, nullable=False)

    semantic_score = Column(Float,nullable=True)

    technical_score = Column(Float,nullable=True)

    completeness_score = Column(Float,nullable=True)

    communication_score = Column(Float,nullable=True)

    overall_score = Column(Float)

    feedback = Column(Text)

    status=Column(Text,default="completed",nullable=False,)

    created_at = Column(DateTime, default=datetime.utcnow,index=True)

    user = relationship("User",back_populates="interviews")


    professionalism_score = Column(
        Float,
        nullable=True,
    )

    leadership_score = Column(
        Float,
        nullable=True,
    )

    problem_solving_score = Column(
        Float,
        nullable=True,
    )

    star_score = Column(
        Float,
        nullable=True,
    )