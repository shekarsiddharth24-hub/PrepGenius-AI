from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.user import UserCreate
from app.schemas.user import UserResponse

from app.services.user_service import (
    create_user,
    get_user_by_email,
)

from app.schemas.user import UserLogin
from app.schemas.user import Token
from app.services.user_service import authenticate_user
from app.core.auth import create_access_token

from app.core.auth import get_current_user
from app.models.user import User

from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):

    existing_user = get_user_by_email(
        db,
        user.email,
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    return create_user(
        db,
        user,
    )


@router.post(
    "/login",
    response_model=Token,
)
def login(
    # user: UserLogin,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):

    authenticated_user = authenticate_user(
        db,
        form_data.username,
        form_data.password,
        # user.email,
        # user.password,
    )

    if authenticated_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    token = create_access_token(
        {
            "sub": authenticated_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }

@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user