from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import HTTPException
from fastapi import Form
from fastapi import Depends
from fastapi.responses import StreamingResponse
from fastapi.concurrency import run_in_threadpool

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.auth import get_current_user

from app.models.user import User
from app.core.roles import TargetRole
from app.core.exceptions import ResumeAnalysisError
from app.core.logging import logger

from app.schemas.resume import ResumeAnalysisResponse
from app.schemas.resume_history import (
    ResumeHistoryResponse,
    ResumeDetailResponse,
)

from app.services.resume_service import resume_service

router = APIRouter(
    prefix="/resume",
    tags=["Resume"],
)


@router.post(
    "/analyze",
    response_model=ResumeAnalysisResponse,
)
async def upload_resume(
    file: UploadFile = File(...),
    target_role: TargetRole = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        # Validate uploaded file
        await resume_service.validate_resume(file)

        # Extract text from the PDF
        resume_text = await resume_service.extract_resume_text(file)

        # Analyze the resume using Ollama
        # (blocking, can take minutes -> run in a worker thread so the
        # event loop keeps serving other requests)
        analysis = await run_in_threadpool(
            resume_service.analyze_resume,
            resume_text,
            target_role.value,
        )

        # Save the analysis to the database
        await run_in_threadpool(
            resume_service.save_analysis,
            db=db,
            user_id=current_user.id,
            filename=file.filename or "resume.pdf",
            analysis=analysis,
        )

        # Return the structured AI analysis
        return analysis

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except ResumeAnalysisError as e:
        logger.warning("Resume analysis failed: %s", e)
        raise HTTPException(
            status_code=502,
            detail="The AI could not analyze this resume. Please try again.",
        )

    except Exception:
        logger.exception("Unexpected error while analyzing resume")
        raise HTTPException(
            status_code=500,
            detail="Internal server error while analyzing resume.",
        )


@router.get(
    "/history",
    response_model=ResumeHistoryResponse,
)
def get_resume_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    history = resume_service.get_history(
        db=db,
        user_id=current_user.id,
    )

    return {
        "items": history,
    }


@router.get(
    "/{analysis_id}",
    response_model=ResumeDetailResponse,
)
def get_resume_analysis(
    analysis_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    analysis = resume_service.get_analysis(
        db=db,
        analysis_id=analysis_id,
        user_id=current_user.id,
    )

    if analysis is None:
        raise HTTPException(
            status_code=404,
            detail="Resume analysis not found",
        )

    parsed = analysis.parsed_analysis

    return ResumeDetailResponse(
        id=analysis.id,
        filename=analysis.filename,
        created_at=analysis.created_at,

        resume_score=parsed.resume_score,
        technical_skills=parsed.technical_skills,
        soft_skills=parsed.soft_skills,
        projects=parsed.projects,
        strengths=parsed.strengths,
        weaknesses=parsed.weaknesses,
        missing_skills=parsed.missing_skills,
        recommended_topics=parsed.recommended_topics,
    )


@router.get(
    "/{analysis_id}/pdf",
)
def download_resume_pdf(
    analysis_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    pdf = resume_service.generate_pdf(
        db=db,
        analysis_id=analysis_id,
        user_id=current_user.id,
    )

    if pdf is None:
        raise HTTPException(
            status_code=404,
            detail="Resume analysis not found",
        )

    return StreamingResponse(
        pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition": (
                f'attachment; filename="resume_analysis_{analysis_id}.pdf"'
            ),
        },
    )