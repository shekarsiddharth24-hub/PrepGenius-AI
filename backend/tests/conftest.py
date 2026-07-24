from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def get_token():
    # Register user (ignore if already exists)
    client.post(
        "/api/v1/auth/register",
        json={
            "name": "Demo",
            "email": "demo@test.com",
            "password": "password123",
        },
    )

    response = client.post(
        "/api/v1/auth/login",
        json={
            "email": "demo@test.com",
            "password": "password123",
        },
    )

    return response.json()["access_token"]