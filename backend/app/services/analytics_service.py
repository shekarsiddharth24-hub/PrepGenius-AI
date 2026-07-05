from collections import defaultdict

from app.models.interview import Interview


class AnalyticsService:

    def calculate(self, interviews: list[Interview]):

        if not interviews:
            return {
                "total_interviews": 0,
                "average_score": 0,
                "best_score": 0,
                "best_topic": None,
                "weakest_topic": None,
                "average_semantic": 0,
                "average_technical": 0,
                "average_communication": 0,
            }

        overall_scores = []
        semantic_scores = []
        technical_scores = []
        communication_scores = []

        topic_scores = defaultdict(list)

        for interview in interviews:

            overall_scores.append(interview.overall_score)
            semantic_scores.append(interview.semantic_score)
            technical_scores.append(interview.technical_score)
            communication_scores.append(interview.communication_score)

            topic_scores[interview.topic].append(
                interview.overall_score
            )

        average_topic_scores = {
            topic: sum(scores) / len(scores)
            for topic, scores in topic_scores.items()
        }

        best_topic = max(
            average_topic_scores,
            key=average_topic_scores.get,
        )

        weakest_topic = min(
            average_topic_scores,
            key=average_topic_scores.get,
        )

        return {
            "total_interviews": len(interviews),
            "average_score": round(
                sum(overall_scores) / len(overall_scores),
                2,
            ),
            "best_score": max(overall_scores),
            "best_topic": best_topic,
            "weakest_topic": weakest_topic,
            "average_semantic": round(
                sum(semantic_scores) / len(semantic_scores),
                2,
            ),
            "average_technical": round(
                sum(technical_scores) / len(technical_scores),
                2,
            ),
            "average_communication": round(
                sum(communication_scores) / len(communication_scores),
                2,
            ),
        }


analytics_service = AnalyticsService()