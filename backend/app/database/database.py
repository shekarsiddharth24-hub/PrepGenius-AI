from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings


# DATABASE_URL = "sqlite:///./prepgenius.db"
DATABASE_URL= settings.DATABASE_URL


class Base(DeclarativeBase):
    pass


engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False},
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()