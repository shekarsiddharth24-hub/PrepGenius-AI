def build_question_prompt(topic: str, difficulty: str) -> str:
    return f"""
You are a Senior Software Engineer conducting a technical interview.

Generate exactly ONE interview question.

Rules:
- Topic: {topic}
- Difficulty: {difficulty}
- Return only the interview question.
- Do not include greetings.
- Do not include numbering.
- Do not include explanations.
- Do not include markdown.
- Keep it under 40 words.
"""