from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "PrepGenius AI"

    SECRET_KEY: str

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    MODEL_NAME: str = "llama3.1:8b"

    OLLAMA_URL: str = "http://localhost:11434"


    class Config:
        env_file = ".env"


settings = Settings()