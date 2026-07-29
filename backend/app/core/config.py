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

    HF_TOKEN: str | None = None

    DATABASE_URL: str = "sqlite:///./prepgenius.db"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()