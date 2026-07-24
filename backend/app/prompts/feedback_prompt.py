def build_feedback_prompt(
    question: str,
    ideal_answer: str,
    candidate_answer: str,
) -> str:
    return f"""
You are an expert technical interviewer.

Question:
{question}

Ideal Answer:
{ideal_answer}

Candidate Answer:
{candidate_answer}

Evaluate the candidate.

Return your response using exactly this format:

Strengths:
- ...

Weaknesses:
- ...

Suggestions:
- ...

Technical Score: <0-100>

Completeness Score: <0-100>

Communication Score: <0-100>

Overall Score: <0-100>
"""