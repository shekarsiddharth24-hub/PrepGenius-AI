from app.ai.embedding_service import (
    embedding_service,
)

from app.ai.ollama_service import (
    ollama,
)

from app.core.config import settings
from app.core.exceptions import EvaluationParseError
from app.core.logging import logger

from app.prompts.evaluation_prompt import (
    build_evaluation_prompt,
)

from app.prompts.hr_evaluation_prompt import (
    build_hr_evaluation_prompt,
)

from app.prompts.code_evaluation_prompt import (
    build_code_evaluation_prompt,
)

from app.utils.json_parser import extract_json


SCORE_KEYS = (
    "technical_score",
    "completeness_score",
    "communication_score",
    "professionalism_score",
    "leadership_score",
    "problem_solving_score",
    "star_score",
    "overall_score",
)

LIST_KEYS = (
    "strengths",
    "weaknesses",
    "suggestions",
)


class EvaluationService:

    # Total attempts at getting a usable evaluation from the model
    MAX_ATTEMPTS = 2

    def normalize(
        self,
        data: dict,
    ) -> dict:
        """
        Clean up an LLM evaluation:
        - scores become numbers clamped to 0-100
        - non-numeric scores are dropped (callers fill defaults)
        - strengths / weaknesses / suggestions become lists of strings

        Raises ValueError if there is not a single usable score.
        """

        result = dict(data)

        found_score = False

        for key in SCORE_KEYS:

            if key not in result:
                continue

            value = result[key]

            if isinstance(value, bool) or not isinstance(
                value,
                (int, float),
            ):
                # e.g. "85", None, "N/A" -> try a plain number, else drop
                try:
                    value = float(str(value).strip().rstrip("%"))
                except (TypeError, ValueError):
                    del result[key]
                    continue

            result[key] = max(0.0, min(100.0, float(value)))
            found_score = True

        if not found_score:
            raise ValueError("Evaluation contained no valid scores.")

        for key in LIST_KEYS:

            value = result.get(key, [])

            if isinstance(value, str):
                value = [value]

            elif not isinstance(value, list):
                value = []

            result[key] = [str(item) for item in value if item]

        return result


    def _evaluate(
        self,
        prompt: str,
    ) -> dict:
        """
        Run an evaluation prompt on the evaluation model.

        Retries once if the output is not usable JSON. Raises
        EvaluationParseError if every attempt fails, so a broken
        evaluation is never saved as a real result.
        """

        last_error: Exception | None = None

        for attempt in range(1, self.MAX_ATTEMPTS + 1):

            response = ollama.generate(
                prompt,
                model=settings.EVALUATION_MODEL,
                temperature=0.2,
                max_tokens=settings.MAX_TOKENS_EVALUATION,
            )

            try:
                return self.normalize(
                    extract_json(response)
                )

            except ValueError as e:
                last_error = e
                logger.warning(
                    "Evaluation attempt %d/%d returned unusable output: %s",
                    attempt,
                    self.MAX_ATTEMPTS,
                    e,
                )

        raise EvaluationParseError(
            f"Model returned unusable evaluation after "
            f"{self.MAX_ATTEMPTS} attempts: {last_error}"
        )


    def semantic_score(
        self,
        candidate_answer: str,
        ideal_answer: str,
    ):

        similarity = embedding_service.similarity(
            candidate_answer,
            ideal_answer,
        )

        return round(
            similarity * 100,
            2,
        )


    def ai_feedback(
        self,
        question: str,
        ideal_answer: str,
        candidate_answer: str,
    ):

        prompt = build_evaluation_prompt(
            question,
            ideal_answer,
            candidate_answer,
        )

        return self._evaluate(prompt)


    def code_feedback(
        self,
        question: str,
        reference_solution: str,
        candidate_code: str,
        language: str | None = None,
    ):
        """
        Evaluate a coding answer on correctness, complexity and edge cases.

        Embedding similarity is deliberately NOT used for code: two correct
        solutions can look very different, and a wrong solution can look
        very similar to the reference.
        """

        prompt = build_code_evaluation_prompt(
            question,
            reference_solution,
            candidate_code,
            language,
        )

        return self._evaluate(prompt)


    def hr_feedback(
        self,
        question: str,
        candidate_answer: str,
    ):

        prompt = build_hr_evaluation_prompt(
            question,
            candidate_answer,
        )

        return self._evaluate(prompt)


evaluation_service = EvaluationService()
