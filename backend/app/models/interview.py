from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime

from datetime import datetime

from app.database.database import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    topic = Column(String)

    difficulty = Column(String)

    question = Column(String)

    ideal_answer = Column(String)

    user_answer = Column(String)

    score = Column(Float)

    feedback = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)