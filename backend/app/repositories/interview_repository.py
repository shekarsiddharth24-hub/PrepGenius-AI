from sqlalchemy.orm import Session

from app.models.interview import Interview


class InterviewRepository:

    def create(
        self,
        db: Session,
        **kwargs,
    ):

        interview = Interview(**kwargs)

        db.add(interview)

        db.commit()

        db.refresh(interview)

        return interview

    def get_history(
        self,
        db: Session,
        user_id: int,
    ):

        return (
            db.query(Interview)
            .filter(
                Interview.user_id == user_id
            )
            .order_by(
                Interview.created_at.desc()
            )
            .all()
        )
    
    def get_by_id(
        self,
        db: Session,
        interview_id: int,
        user_id: int,
    ):

        return (
            db.query(Interview)
            .filter(
                Interview.id == interview_id,
                Interview.user_id == user_id,
            )
            .first()
        )


interview_repository = InterviewRepository()