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
                "topic_scores": [],
                "trend": [],
                "technical_interviews": 0,
                "behavioral_interviews": 0,
                "technical_average_score": 0,
                "behavioral_average_score": 0,
            }

        overall_scores = []
        semantic_scores = []
        technical_scores = []
        communication_scores = []

        topic_scores = defaultdict(list)

        technical_interviews = []
        behavioral_interviews = []

        for interview in interviews:

            overall_scores.append(interview.overall_score or 0)
            semantic_scores.append(interview.semantic_score or 0)
            technical_scores.append(interview.technical_score or 0)
            communication_scores.append(interview.communication_score or 0)

            topic_scores[interview.topic].append(
                interview.overall_score or 0
            )

            # Handle legacy interviews with NULL interview_type
            interview_type = interview.interview_type or "technical"

            if interview_type == "technical":
                technical_interviews.append(interview)
            else:
                behavioral_interviews.append(interview)

        average_topic_scores = {
            topic: sum(scores) / len(scores)
            for topic, scores in topic_scores.items()
        }

        topic_scores = [
            {
                "topic": topic,
                "score": round(score, 2),
            }
            for topic, score in average_topic_scores.items()
        ]

        best_topic = max(
            average_topic_scores,
            key=average_topic_scores.get,
        )

        weakest_topic = min(
            average_topic_scores,
            key=average_topic_scores.get,
        )

        trend = [
            {
                "date": interview.created_at.strftime("%d %b"),
                "score": interview.overall_score or 0,
            }
            for interview in sorted(
                interviews,
                key=lambda x: x.created_at,
            )
        ]

        technical_count = len(technical_interviews)
        behavioral_count = len(behavioral_interviews)

        technical_average_score = (
            round(
                sum(
                    (i.overall_score or 0)
                    for i in technical_interviews
                )
                / technical_count,
                2,
            )
            if technical_count
            else 0
        )

        behavioral_average_score = (
            round(
                sum(
                    (i.overall_score or 0)
                    for i in behavioral_interviews
                )
                / behavioral_count,
                2,
            )
            if behavioral_count
            else 0
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

            "topic_scores": topic_scores,

            "trend": trend,

            "technical_interviews": technical_count,

            "behavioral_interviews": behavioral_count,

            "technical_average_score": technical_average_score,

            "behavioral_average_score": behavioral_average_score,
        }


analytics_service = AnalyticsService()