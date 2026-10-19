from fastapi import Request
from fastapi.responses import JSONResponse


async def global_exception_handler(
    request: Request,
    exc: Exception,
):

    return JSONResponse(
        status_code=500,
        content={
            "detail": str(exc),
        },
    )


class ResumeAnalysisError(Exception):
    """Raised when the LLM output cannot be turned into a valid resume analysis."""


class EvaluationParseError(Exception):
    """Raised when the LLM evaluation cannot be turned into valid scores."""
