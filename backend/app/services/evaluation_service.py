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


class EvaluationService:

    def semantic_score(
        self,
        candidate_answer: str,
        ideal_answer: str,
    ):

        similarity = embedding_service.similarity(
            candidate_answer,
            ideal_answer,
        )

        return round(similarity * 100, 2)

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

        try:
            return json.loads(response)
        
        except json.JSONDecoderError:
            return {
            "technical_score": 0,
            "completeness_score": 0,
            "communication_score": 0,
            "overall_score": 0,
            "strengths": [
                "Unable to parse AI response."
            ],
            "weaknesses": [],
            "suggestions": [
                "Retry evaluation."
            ],
            }


evaluation_service = EvaluationService()