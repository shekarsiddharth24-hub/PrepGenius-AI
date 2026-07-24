def build_hr_question_prompt(
    difficulty: str,
) -> str:

    return f"""
You are an experienced Human Resources interviewer.

Generate ONE professional behavioral interview question.

Interview Difficulty:
{difficulty}

The question should evaluate one of the following:

- Communication
- Teamwork
- Leadership
- Conflict Resolution
- Adaptability
- Time Management
- Problem Solving
- Decision Making
- Work Ethic
- Professionalism

Rules:

- Return ONLY one interview question.
- Do NOT include explanations.
- Do NOT include numbering.
- Do NOT include bullet points.
- Do NOT include greetings.

The question should sound like a real HR interview.

Examples:

Tell me about yourself.

Describe a time you handled conflict within your team.

Tell me about a difficult decision you had to make.

Describe a situation where you failed and what you learned.

How do you handle tight deadlines?

Now generate ONE behavioral interview question.
"""