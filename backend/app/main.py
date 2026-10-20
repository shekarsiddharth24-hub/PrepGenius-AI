from dotenv import load_dotenv
load_dotenv()

import threading
from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.ai.ollama_service import ollama
from app.core.config import settings

from app.database.database import Base, engine
import app.database.base

from app.api.router import api_router

from app.core.exceptions import (
    global_exception_handler,
    ServerBusyError,
    server_busy_handler,
)

from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the Ollama models in the background so the first user request
    # is not slow. Never blocks startup and never fails if Ollama is down.
    if settings.WARMUP_ON_STARTUP:
        threading.Thread(
            target=ollama.warmup,
            args=(
                [
                    settings.QUESTION_MODEL,
                    settings.ANSWER_MODEL,
                    settings.EVALUATION_MODEL,
                    settings.RESUME_MODEL,
                ],
            ),
            daemon=True,
        ).start()

    yield


_is_prod = settings.ENVIRONMENT.lower() == "production"

app = FastAPI(
    title="PrepGenius AI API",
    version="1.0.0",
    lifespan=lifespan,
    # Don't publish the API schema / Swagger UI in production
    docs_url=None if _is_prod else "/docs",
    redoc_url=None if _is_prod else "/redoc",
    openapi_url=None if _is_prod else "/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

Base.metadata.create_all(bind=engine)

app.include_router(api_router)

app.add_exception_handler(ServerBusyError, server_busy_handler)

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