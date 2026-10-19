from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "PrepGenius AI"

    SECRET_KEY: str

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Models
    QUESTION_MODEL: str = "qwen3:8b"

    ANSWER_MODEL: str = "qwen3:8b"

    EVALUATION_MODEL: str = "qwen3:14b"

    RESUME_MODEL: str = "qwen3:14b"

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

    # Max tokens generated per task (caps rambling and long waits)
    MAX_TOKENS_QUESTION: int = 600
    MAX_TOKENS_ANSWER: int = 1200
    MAX_TOKENS_EVALUATION: int = 1200
    MAX_TOKENS_RESUME: int = 3500

    HF_TOKEN: str | None = None

    DATABASE_URL: str = "sqlite:///./prepgenius.db"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()