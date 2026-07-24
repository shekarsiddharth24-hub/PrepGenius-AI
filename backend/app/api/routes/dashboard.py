from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.schemas.analytics import AnalyticsResponse

from app.core.auth import get_current_user
from app.database.database import get_db
from app.models.user import User

from app.repositories.interview_repository import (
    interview_repository,
)

from app.services.analytics_service import (
    analytics_service,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/analytics",
            response_model=AnalyticsResponse,
            summary="Get dashboard analytics")
def analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):

    interviews = interview_repository.get_history(
        db,
        current_user.id,
    )

    return analytics_service.calculate(
        interviews,
    )