from pydantic import BaseSettings


class Settings(BaseSettings):
    email: str
    password: str
    mongouri: str

    class Config:
        env_file = ".env"