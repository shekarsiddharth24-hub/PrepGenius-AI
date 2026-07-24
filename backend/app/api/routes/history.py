from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.repositories.interview_repository import (
    interview_repository,
)

from fastapi.responses import StreamingResponse

from app.services.pdf_service import pdf_service

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

@router.get("/{interview_id}/pdf")
def download_pdf(
    interview_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    interview = interview_repository.get_by_id(
        db,
        interview_id,
        current_user.id,
    )

    if interview is None:
        raise HTTPException(
            status_code=404,
            detail="Interview not found",
        )

    pdf = pdf_service.build_interview_pdf(interview)

    filename = (
        f"{interview.interview_type}_interview_"
        f"{interview.id}.pdf"
    )

    return StreamingResponse(
        pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
                f'attachment; filename="{filename}"'
        },
    )