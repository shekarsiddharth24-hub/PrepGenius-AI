from sqlalchemy.orm import Session

from app.models.user import User


class UserRepository:

    def update(
        self,
        db: Session,
        user: User,
    ):
        db.commit()
        db.refresh(user)
        return user


user_repository = UserRepository()