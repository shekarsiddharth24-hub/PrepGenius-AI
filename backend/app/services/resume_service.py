from fastapi import UploadFile
from fastapi.encoders import jsonable_encoder
import json

from app.core.config import settings
from app.utils.pdf_parser import (
    extract_text_from_pdf,
    clean_text,
)
from app.prompts.resume_prompt import build_resume_prompt
from app.ai.ollama_service import ollama
from app.schemas.resume import ResumeAnalysisResponse

from app.repositories.resume_repository import resume_repository

from app.utils.pdf_generator import pdf_generator


class ResumeService:

    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

    ALLOWED_TYPES = {
        "application/pdf",
    }

    async def validate_resume(
        self,
        file: UploadFile,
    ):
        if file.content_type not in self.ALLOWED_TYPES:
            raise ValueError(
                "Only PDF files are supported."
            )

        contents = await file.read()

        size = len(contents)

        if size > self.MAX_FILE_SIZE:
            raise ValueError(
                "File size exceeds 10 MB."
            )

        await file.seek(0)

        return size

    async def extract_resume_text(
        self,
        file: UploadFile,
    ):
        file_bytes = await file.read()

        text = extract_text_from_pdf(
            file_bytes,
        )

        await file.seek(0)

        text = clean_text(text)

        if not text:
            raise ValueError(
                "No readable text found in the PDF."
            )

        return text

    def analyze_resume(
        self,
        resume_text: str,
        target_role: str,
    ):
        prompt = build_resume_prompt(
            resume_text,
            target_role,
        )

        response = ollama.generate(
            prompt=prompt,
            model=settings.RESUME_MODEL,
        )

        response = (
            response.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        analysis = json.loads(response)

        return ResumeAnalysisResponse(**analysis)

    def save_analysis(
        self,
        db,
        user_id: int,
        filename: str,
        analysis: ResumeAnalysisResponse,
    ):
        data = jsonable_encoder(analysis)

        return resume_repository.create(
            db=db,
            user_id=user_id,
            filename=filename,
            resume_score=data["resume_score"],
            technical_skills=json.dumps(
                data["technical_skills"]
            ),
            soft_skills=json.dumps(
                data["soft_skills"]
            ),
            projects=json.dumps(
                data["projects"]
            ),
            strengths=json.dumps(
                data["strengths"]
            ),
            weaknesses=json.dumps(
                data["weaknesses"]
            ),
            missing_skills=json.dumps(
                data["missing_skills"]
            ),
            recommended_topics=json.dumps(
                data["recommended_topics"]
            ),
        )

    def get_history(
        self,
        db,
        user_id: int,
    ):
        return resume_repository.get_history(
            db,
            user_id,
        )

    def get_analysis(
        self,
        db,
        analysis_id: int,
        user_id: int,
    ):
        return resume_repository.get_by_id(
            db,
            analysis_id,
            user_id,
        )

    def generate_pdf(
        self,
        db,
        analysis_id: int,
        user_id: int,
    ):
        analysis = resume_repository.get_by_id(
            db,
            analysis_id,
            user_id,
        )

        if analysis is None:
            return None

        return pdf_generator.build_resume_report(
            record=analysis,
            analysis=analysis.parsed_analysis,
        )


resume_service = ResumeService()