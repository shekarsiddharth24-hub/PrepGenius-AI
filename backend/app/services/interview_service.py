from app.ai.ollama_service import ollama
from app.core.config import settings
from app.core.logging import logger

from app.prompts.question_prompt import (
    build_question_prompt,
)

from app.prompts.answer_prompt import (
    build_answer_prompt,
)

from app.prompts.hr_question_prompt import (
    build_hr_question_prompt,
)

from app.services.evaluation_service import (
    evaluation_service,
)

from app.repositories.interview_repository import (
    interview_repository,
)


class InterviewService:

    def generate_question(
        self,
        interview_type: str,
        topic: str,
        difficulty: str,
    ):
        logger.info(
            f"Generating interview question | "
            f"type={interview_type}, "
            f"topic={topic}, "
            f"difficulty={difficulty}"
        )

        if interview_type == "behavioral":
            prompt = build_hr_question_prompt(
                difficulty,
            )
        else:
            prompt = build_question_prompt(
                topic,
                difficulty,
            )

        return ollama.generate(
            prompt=prompt,
            model=settings.QUESTION_MODEL,
        )

    def generate_ideal_answer(
        self,
        question: str,
    ):
        logger.info("Generating ideal answer")

        prompt = build_answer_prompt(question)

        return ollama.generate(
            prompt=prompt,
            model=settings.ANSWER_MODEL,
        )

    def save_interview(
        self,
        db,
        user_id,
        topic,
        difficulty,
        interview_type,
        result: dict,
    ):
        logger.info(
            f"Saving interview | "
            f"user_id={user_id}, "
            f"topic={topic}, "
            f"difficulty={difficulty}, "
            f"interview_type={interview_type}"
        )

        feedback = (
            "Strengths:\n"
            + "\n".join(result["strengths"])
            + "\n\nWeaknesses:\n"
            + "\n".join(result["weaknesses"])
            + "\n\nSuggestions:\n"
            + "\n".join(result["suggestions"])
        )

        return interview_repository.create(
            db=db,
            user_id=user_id,
            topic=topic if topic else "Behavioral",
            difficulty=difficulty,
            interview_type=interview_type,
            question=result["question"],
            ideal_answer=result.get("ideal_answer"),
            user_answer=result["candidate_answer"],

            # Technical scores
            semantic_score=result.get("semantic_score"),
            technical_score=result.get("technical_score"),
            completeness_score=result.get("completeness_score"),
            communication_score=result.get("communication_score"),

            # Behavioral scores
            professionalism_score=result.get("professionalism_score"),
            leadership_score=result.get("leadership_score"),
            problem_solving_score=result.get("problem_solving_score"),
            star_score=result.get("star_score"),

            overall_score=result["overall_score"],
            feedback=feedback,
        )

    def evaluate_answer(
        self,
        interview_type: str,
        question: str,
        candidate_answer: str,
    ):
        logger.info("Evaluating candidate answer")

        if interview_type == "behavioral":

            feedback = evaluation_service.hr_feedback(
                question,
                candidate_answer,
            )

            semantic_score = None
            ideal_answer = None

        else:

            ideal_answer = self.generate_ideal_answer(
                question,
            )

            semantic_score = (
                evaluation_service.semantic_score(
                    candidate_answer,
                    ideal_answer,
                )
            )

            feedback = evaluation_service.ai_feedback(
                question,
                ideal_answer,
                candidate_answer,
            )

        # ---------- Technical defaults ----------
        feedback.setdefault("technical_score", 0)
        feedback.setdefault("completeness_score", 0)
        feedback.setdefault("communication_score", 0)

        # ---------- Behavioral defaults ----------
        feedback.setdefault("professionalism_score", 0)
        feedback.setdefault("leadership_score", 0)
        feedback.setdefault("problem_solving_score", 0)
        feedback.setdefault("star_score", 0)

        # ---------- Overall score ----------
        if "overall_score" not in feedback:

            if interview_type == "behavioral":

                feedback["overall_score"] = round(
                    (
                        feedback["communication_score"]
                        + feedback["professionalism_score"]
                        + feedback["leadership_score"]
                        + feedback["problem_solving_score"]
                        + feedback["star_score"]
                    ) / 5
                )

            else:

                feedback["overall_score"] = round(
                    (
                        feedback["technical_score"]
                        + feedback["completeness_score"]
                        + feedback["communication_score"]
                    ) / 3
                )

        feedback.setdefault("strengths", [])
        feedback.setdefault("weaknesses", [])
        feedback.setdefault("suggestions", [])

        return {
            "question": question,
            "ideal_answer": ideal_answer,
            "candidate_answer": candidate_answer,
            "semantic_score": semantic_score,
            **feedback,
        }


interview_service = InterviewService()