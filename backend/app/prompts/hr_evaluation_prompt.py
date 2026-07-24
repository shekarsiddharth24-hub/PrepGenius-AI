def build_hr_evaluation_prompt(
    question: str,
    candidate_answer: str,
) -> str:

    return f"""
You are an experienced HR interviewer.

Evaluate the candidate's behavioral interview answer.

Interview Question:
{question}

Candidate Answer:
{candidate_answer}

Evaluate ONLY the following criteria:

1. Communication
2. Professionalism
3. Leadership
4. Problem Solving
5. STAR Method

Return ONLY valid JSON.

JSON Schema:

{{
    "communication_score": 0,
    "professionalism_score": 0,
    "leadership_score": 0,
    "problem_solving_score": 0,
    "star_score": 0,
    "overall_score": 0,
    "strengths": [],
    "weaknesses": [],
    "suggestions": []
}}

Scoring Rules:

- Scores must be between 0 and 100.
- overall_score should reflect the overall interview performance.
- strengths, weaknesses and suggestions should each contain 3 concise items.

Do not return explanations outside the JSON.
"""