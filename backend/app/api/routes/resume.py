from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import HTTPException
from fastapi import Form
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.auth import get_current_user

from app.models.user import User

from app.schemas.resume import ResumeAnalysisResponse
from app.schemas.resume_history import (
    ResumeHistoryResponse,
    ResumeDetailResponse,
)
from app.services.resume_service import resume_service

from fastapi.responses import StreamingResponse

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
    target_role: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        # Validate uploaded file
        await resume_service.validate_resume(file)

        # Extract text from the PDF
        resume_text = await resume_service.extract_resume_text(file)

        # Analyze the resume using Ollama
        analysis = resume_service.analyze_resume(
            resume_text,
            target_role,
        )

        # Save the analysis to the database
        resume_service.save_analysis(
            db=db,
            user_id=current_user.id,
            filename=file.filename or "resume.pdf",
            analysis=analysis,
        )

        # Return the structured AI analysis
        return analysis

    except ValueError as e:
        print(e)
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error while analyzing resume: {str(e)}",
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

    return ResumeDetailResponse(
        id=analysis.id,
        filename=analysis.filename,
        resume_score=analysis.resume_score,
        technical_skills=analysis.technical_skills_list,
        soft_skills=analysis.soft_skills_list,
        strengths=analysis.strengths_list,
        weaknesses=analysis.weaknesses_list,
        missing_skills=analysis.missing_skills_list,
        recommended_topics=analysis.recommended_topics_list,
        created_at=analysis.created_at,
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
            "Content-Disposition":
                f'attachment; filename="resume_analysis_{analysis_id}.pdf"'
        },
    )