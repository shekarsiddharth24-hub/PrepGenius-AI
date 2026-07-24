from sqlalchemy.orm import Session

from app.models.resume_analysis import ResumeAnalysis


class ResumeRepository:

    def create(
        self,
        db: Session,
        **kwargs,
    ):

        analysis = ResumeAnalysis(
            **kwargs,
        )

        db.add(analysis)

        db.commit()

        db.refresh(analysis)

        return analysis

    def get_history(
        self,
        db: Session,
        user_id: int,
    ):

        return (
            db.query(ResumeAnalysis)
            .filter(
                ResumeAnalysis.user_id == user_id
            )
            .order_by(
                ResumeAnalysis.created_at.desc()
            )
            .all()
        )

    def get_by_id(
        self,
        db: Session,
        analysis_id: int,
        user_id: int,
    ):

        return (
            db.query(ResumeAnalysis)
            .filter(
                ResumeAnalysis.id == analysis_id,
                ResumeAnalysis.user_id == user_id,
            )
            .first()
        )


resume_repository = ResumeRepository()