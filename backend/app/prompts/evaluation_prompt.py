def build_evaluation_prompt(
    question: str,
    ideal_answer: str,
    candidate_answer: str,
):
    return f"""
You are a Senior Software Engineer and Technical Interviewer.

Evaluate the candidate's answer against the ideal answer.

Question:
{question}

Ideal Answer:
{ideal_answer}

Candidate Answer:
{candidate_answer}

Scoring Criteria:
- technical_score: Rate technical correctness from 0 to 100.
- completeness_score: Rate how completely the answer covers the expected concepts from 0 to 100.
- communication_score: Rate clarity, structure, and grammar from 0 to 100.
- overall_score: Overall evaluation from 0 to 100 considering all the above factors.

Return ONLY valid JSON.
Do not include markdown.
Do not include explanations.
Do not include any text before or after the JSON.

The JSON MUST exactly match this structure:

{{
    "technical_score": 0,
    "completeness_score": 0,
    "communication_score": 0,
    "overall_score": 0,
    "strengths": [],
    "weaknesses": [],
    "suggestions": []
}}
"""