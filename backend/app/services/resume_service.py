from fastapi import UploadFile
import json

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
            prompt,
        )


        response = (
          response.replace("```json", "")
          .replace("```", "")
          .strip()
        )

       
        analysis=json.loads(response)


        return ResumeAnalysisResponse(**analysis)
    
    def save_analysis(
            self,
            db,
            user_id:int,
            filename: str,
            analysis: dict,
    ):
        return resume_repository.create(
            db=db,
            user_id=user_id,
            filename=filename,
            resume_score=analysis.resume_score,
            technical_skills=json.dumps(
                analysis.technical_skills
            ),
            soft_skills=json.dumps(
               analysis.soft_skills
            ),
            strengths=json.dumps(
              analysis.strengths
            ),
            weaknesses=json.dumps(
              analysis.weaknesses
            ),
            missing_skills=json.dumps(
                analysis.missing_skills
            ),
            recommended_topics=json.dumps(
                analysis.recommended_topics
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
            user_id
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
            analysis,
        )

 
resume_service = ResumeService()