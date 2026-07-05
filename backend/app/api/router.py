from fastapi import APIRouter

from app.api.routes.auth import router as auth_router
from app.api.routes.interview import router as interview_router

from app.api.routes.history import router as history_router
from app.api.routes.dashboard import router as dashboard_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth_router)
api_router.include_router(interview_router)

api_router.include_router(history_router)
api_router.include_router(dashboard_router)