import json

from app.ai.embedding_service import (
    embedding_service,
)

from app.ai.ollama_service import (
    ollama,
)

from app.prompts.evaluation_prompt import (
    build_evaluation_prompt,
)

from app.prompts.hr_evaluation_prompt import (
    build_hr_evaluation_prompt,
)


class EvaluationService:

    def parse_json(
        self,
        response: str,
    ):
        """
        Parse Ollama JSON response safely.
        Handles markdown code blocks.
        """

        response = response.strip()

        # Remove markdown JSON wrapper if Ollama returns it
        if response.startswith("```json"):
            response = response.replace(
                "```json",
                "",
                1,
            )

        if response.endswith("```"):
            response = response[:-3]

        response = response.strip()

        try:
            return json.loads(response)

        except json.JSONDecodeError:
            return {
                "technical_score": None,
                "completeness_score": None,
                "communication_score": None,
                "professionalism_score": None,
                "leadership_score": None,
                "problem_solving_score": None,
                "star_score": None,
                "overall_score": 0,
                "strengths": [
                    "Unable to parse AI response."
                ],
                "weaknesses": [],
                "suggestions": [
                    "Retry evaluation."
                ],
            }


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

        response = ollama.generate(prompt)

        return self.parse_json(
            response
        )


    def hr_feedback(
        self,
        question: str,
        candidate_answer: str,
    ):

        prompt = build_hr_evaluation_prompt(
            question,
            candidate_answer,
        )

        response = ollama.generate(prompt)

        return self.parse_json(
            response
        )


evaluation_service = EvaluationService()