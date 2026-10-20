import axios from "axios";

/**
 * Turn any request error into a message that is safe and useful to show.
 */
export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (!axios.isAxiosError(error)) return fallback;

  // Browser gave up waiting (axios timeout) - the AI is just slow.
  if (error.code === "ECONNABORTED") {
    return "The AI is taking longer than usual. Please try again in a moment.";
  }

  // No response at all: server down or network problem.
  if (!error.response) {
    return "Cannot reach the server. Check your connection and try again.";
  }

  switch (error.response.status) {
    case 429:
      return "You're going too fast. Please wait a minute and try again.";
    case 503:
      return "The AI is busy right now. Please try again shortly.";
    case 502:
      return (
        error.response.data?.detail ??
        "The AI could not process this. Please try again."
      );
  }

  const detail = error.response.data?.detail;

  // 400-level validation messages from our API are plain strings.
  if (
    error.response.status < 500 &&
    typeof detail === "string"
  ) {
    return detail;
  }

  return fallback;
}
