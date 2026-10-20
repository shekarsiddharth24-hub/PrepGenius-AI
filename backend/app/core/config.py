from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "PrepGenius AI"

    # "development" or "production" (production hides /docs and /openapi.json)
    ENVIRONMENT: str = "development"

    # Must be a long random string, e.g.:
    #   python -c "import secrets; print(secrets.token_urlsafe(48))"
    SECRET_KEY: str = Field(min_length=32)

    # Allowed browser origins. In .env use JSON: CORS_ORIGINS=["https://app.example.com"]
    CORS_ORIGINS: list[str] = ["http://localhost:5173"]

    # ---- Abuse protection ----
    # Max simultaneous Ollama calls (the GPU/CPU is the bottleneck)
    MAX_CONCURRENT_LLM_CALLS: int = 2
    # Seconds a request waits for a free LLM slot before getting HTTP 503
    LLM_QUEUE_TIMEOUT: int = 60

    # Requests allowed per window, per user (or per IP for /auth)
    RATE_LIMIT_WINDOW_SECONDS: int = 60
    RATE_LIMIT_LLM_PER_WINDOW: int = 10
    RATE_LIMIT_AUTH_PER_WINDOW: int = 10

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Models
    QUESTION_MODEL: str = "qwen3:8b"

    ANSWER_MODEL: str = "qwen3:8b"

    EVALUATION_MODEL: str = "qwen3:14b"

    RESUME_MODEL: str = "qwen3:8b"

    CHAT_MODEL: str = "qwen3:8b"

    OLLAMA_URL: str = "http://localhost:11434"

    # Speed / behaviour of Ollama requests
    # qwen3 "thinking" adds a lot of hidden tokens; keep it off for fast,
    # structured answers.
    OLLAMA_THINK: bool = False

    # How long Ollama keeps a model loaded after the last request
    OLLAMA_KEEP_ALIVE: str = "30m"

    # Load models into memory when the backend starts
    WARMUP_ON_STARTUP: bool = True

    # Read timeout (seconds) for Ollama requests
    OLLAMA_TIMEOUT: int = 180
    OLLAMA_RESUME_TIMEOUT: int = 600

    # Max tokens generated per task (caps rambling and long waits)
    MAX_TOKENS_QUESTION: int = 600
    MAX_TOKENS_ANSWER: int = 1200
    MAX_TOKENS_EVALUATION: int = 1200
    MAX_TOKENS_RESUME: int = 1800

    HF_TOKEN: str | None = None

    DATABASE_URL: str = "sqlite:///./prepgenius.db"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()