import logging

from fastapi import Request
from fastapi.responses import JSONResponse

logger = logging.getLogger("prepgenius")


async def global_exception_handler(
    request: Request,
    exc: Exception,
):
    # Log the real error server-side; never send internals to the client.
    logger.error(
        "Unhandled error on %s %s",
        request.method,
        request.url.path,
        exc_info=exc,
    )

    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


class ServerBusyError(Exception):
    """Raised when every LLM slot stays busy for too long."""


async def server_busy_handler(
    request: Request,
    exc: ServerBusyError,
):
    return JSONResponse(
        status_code=503,
        content={
            "detail": "The AI is busy right now. Please try again shortly.",
        },
        headers={"Retry-After": "15"},
    )


class ResumeAnalysisError(Exception):
    """Raised when the LLM output cannot be turned into a valid resume analysis."""


class EvaluationParseError(Exception):
    """Raised when the LLM evaluation cannot be turned into valid scores."""
