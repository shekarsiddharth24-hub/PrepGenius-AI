from app.ai.ollama_service import ollama
from app.core.logging import logger

from app.prompts.question_prompt import (
    build_question_prompt,
)

from app.prompts.answer_prompt import (
    build_answer_prompt,
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
        topic: str,
        difficulty: str,
    ):
        logger.info(f"Generating interview question | topic={topic},difficulty={difficulty}")

        prompt = build_question_prompt(
            topic,
            difficulty,
        )

        return ollama.generate(prompt)

    def generate_ideal_answer(
        self,
        question: str,
    ):
        logger.info("Generating ideal answer")

        prompt = build_answer_prompt(question)

        return ollama.generate(prompt)
    
    def save_interview(
            self,
            db,
            user_id,
            topic,
            difficulty,
            result: dict,
                    ):
        
        logger.info( f" saving interview | user_id={user_id},topic={topic}, difficulty={difficulty}")
        return interview_repository.create(
          db=db,

          user_id=user_id,

          topic=topic,

          difficulty=difficulty,

          question=result["question"],

          ideal_answer=result["ideal_answer"],

          user_answer=result["candidate_answer"],

          semantic_score=result["semantic_score"],

          technical_score=result["technical_score"],

          completeness_score=result["completeness_score"],

          communication_score=result["communication_score"],

          overall_score=result["overall_score"],

          feedback=str(result),
        )
    
    def evaluate_answer(self,question: str, candidate_answer: str,):
        logger.info("Evaluating candidate answer")


        ideal_answer=self.generate_ideal_answer(question,)

        semantic_score = evaluation_service.semantic_score(
        candidate_answer,
        ideal_answer,)

        feedback = evaluation_service.ai_feedback(
        question,
        ideal_answer,
        candidate_answer,)

            # Ensure all required fields exist
        feedback.setdefault("technical_score", 0)
        feedback.setdefault("completeness_score", 0)
        feedback.setdefault("communication_score", 0)

        if "overall_score" not in feedback:
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