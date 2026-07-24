from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password

from app.core.security import verify_password

from fastapi import HTTPException

from app.repositories.user_repository import (
    user_repository,
)

from app.schemas.user import (
    UserCreate,
    UserUpdate,
    ChangePasswordRequest,
)

from app.core.security import (
    hash_password,
    verify_password,
)

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user: UserCreate):

    hashed_password = hash_password(user.password)

    db_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def update_profile(
    db: Session,
    current_user: User,
    user_update: UserCreate,
):

    existing_user = get_user_by_email(
        db,
        user_update.email,
    )

    if (
        existing_user
        and existing_user.id != current_user.id
    ):
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    current_user.name = user_update.name
    current_user.email = user_update.email

    return user_repository.update(
        db,
        current_user,
    )

def change_password(
    db: Session,
    current_user: User,
    password_data: ChangePasswordRequest,
):

    if not verify_password(
        password_data.current_password,
        current_user.password,
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect",
        )

    if verify_password(
        password_data.new_password,
        current_user.password,
    ):
        raise HTTPException(
            status_code=400,
            detail="New password must be different from the current password",
        )

    current_user.password = hash_password(
        password_data.new_password,
    )

    user_repository.update(
        db,
        current_user,
    )

    return {
        "message": "Password updated successfully"
    }