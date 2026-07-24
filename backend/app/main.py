from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI

from app.api.test import router
from app.api.interview import router as interview_router

from app.database.database import Base, engine
import app.database.base

from app.api.router import api_router

from app.core.exceptions import global_exception_handler

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="PrepGenius AI API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(api_router)

app.include_router(router)

app.include_router(interview_router)

app.add_exception_handler(
    Exception,
    global_exception_handler,
)

@app.get("/")
def home():
    return {"message": "Welcome to PrepGenius AI"}


@app.get("/health")
def health():
    return {"status": "OK"}