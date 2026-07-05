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

    topic = Column(Text, nullable=False)

    difficulty = Column(Text, nullable=False)

    question = Column(Text, nullable=False)

    ideal_answer = Column(Text, nullable=False)

    user_answer = Column(Text, nullable=False)

    semantic_score = Column(Float)

    technical_score = Column(Float)

    completeness_score = Column(Float)

    communication_score = Column(Float)

    overall_score = Column(Float)

    feedback = Column(Text)

    status=Column(Text,default="completed",nullable=False,)

    created_at = Column(DateTime, default=datetime.utcnow,index=True)

    user = relationship("User",back_populates="interviews")