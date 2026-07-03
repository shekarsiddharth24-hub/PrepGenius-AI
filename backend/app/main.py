from fastapi import FastAPI

from app.api.test import router
from app.api.interview import router as interview_router

from app.database.database import Base, engine
import app.database.base

from app.api.router import api_router

app = FastAPI(
    title="PrepGenius AI API",
    version="1.0.0"
)


Base.metadata.create_all(bind=engine)

app.include_router(api_router)

app.include_router(router)

app.include_router(interview_router)

@app.get("/")
def home():
    return {"message": "Welcome to PrepGenius AI"}


@app.get("/health")
def health():
    return {"status": "OK"}