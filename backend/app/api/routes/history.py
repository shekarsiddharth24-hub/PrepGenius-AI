from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.repositories.interview_repository import (
    interview_repository,
)

router = APIRouter(
    prefix="/history",
    tags=["History"],
)


@router.get("/")
def history(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    return interview_repository.get_history(
        db,
        current_user.id,
    )