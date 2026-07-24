def build_answer_prompt(question: str) -> str:
    return f"""
You are a Senior Software Engineer.

Provide an ideal interview answer for the following question.

Question:
{question}

Rules:
- Return only the answer.
- Keep it concise.
- 150–250 words.
- Technically accurate.
- Suitable for a software engineering interview.
"""