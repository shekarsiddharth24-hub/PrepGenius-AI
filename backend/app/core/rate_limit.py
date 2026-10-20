import threading
import time
from collections import defaultdict, deque

from fastapi import Depends, HTTPException, Request

from app.core.auth import get_current_user
from app.core.config import settings
from app.models.user import User


class SlidingWindowLimiter:
    """
    In-memory sliding-window limiter.

    Per-process only: with several workers/containers each one counts
    separately. Swap the storage for Redis if you scale out.
    """

    def __init__(self):
        self._hits: dict[str, deque] = defaultdict(deque)
        self._lock = threading.Lock()

    def check(self, key: str, limit: int, window: int) -> int | None:
        """Return None if allowed, else seconds until the next slot."""

        now = time.monotonic()

        with self._lock:
            hits = self._hits[key]

            while hits and now - hits[0] >= window:
                hits.popleft()

            if len(hits) >= limit:
                return max(1, int(window - (now - hits[0])) + 1)

            hits.append(now)

            # Drop idle keys so memory cannot grow without bound
            if len(self._hits) > 10_000:
                for k in [k for k, v in self._hits.items() if not v]:
                    del self._hits[k]

            return None


_limiter = SlidingWindowLimiter()


def _reject(retry_after: int):
    raise HTTPException(
        status_code=429,
        detail="Too many requests. Please slow down.",
        headers={"Retry-After": str(retry_after)},
    )


def _client_ip(request: Request) -> str:
    # Behind a reverse proxy run uvicorn with --proxy-headers
    # --forwarded-allow-ips=<proxy ip> so this is the real client IP.
    return request.client.host if request.client else "unknown"


def limit_llm(
    request: Request,
    current_user: User = Depends(get_current_user),
):
    """Per-user limit for endpoints that call the LLM. Returns the user."""

    retry = _limiter.check(
        f"llm:{current_user.id}",
        settings.RATE_LIMIT_LLM_PER_WINDOW,
        settings.RATE_LIMIT_WINDOW_SECONDS,
    )

    if retry is not None:
        _reject(retry)

    return current_user


def limit_auth(request: Request):
    """Per-IP limit for login/register (slows password guessing)."""

    retry = _limiter.check(
        f"auth:{_client_ip(request)}",
        settings.RATE_LIMIT_AUTH_PER_WINDOW,
        settings.RATE_LIMIT_WINDOW_SECONDS,
    )

    if retry is not None:
        _reject(retry)
