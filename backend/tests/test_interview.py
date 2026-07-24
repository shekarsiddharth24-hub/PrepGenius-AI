from .conftest import client


def get_token():

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


def test_generate_question():

    token = get_token()

    response = client.get(
        "/api/v1/interview/question",
        params={
            "topic": "Python",
            "difficulty": "Easy",
        },
        headers={
            "Authorization": f"Bearer {token}",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "question" in data