def build_prompt(topic: str, difficulty: str):

    return f"""
You are an expert technical interviewer.

Generate ONE interview question.

Topic:
{topic}

Difficulty:
{difficulty}

Return ONLY the question.

Do not include explanations.
"""