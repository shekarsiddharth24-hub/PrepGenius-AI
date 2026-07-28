import json

from app.prompts.role_config import ROLE_CONFIG


def build_resume_prompt(
    resume_text: str,
    target_role: str,
) -> str:

    role = ROLE_CONFIG[target_role]

    focus = "\n".join(
        f"- {skill}" for skill in role["focus"]
    )

    weights = "\n".join(
        f"{category:<22}: {score}"
        for category, score in role["weights"].items()
    )

    schema = {
        "resume_score": 0,
        "technical_skills": [
            {
                "skill": "",
                "reason": "",
            }
        ],
        "soft_skills": [
            {
                "text": "",
                "evidence": "",
            }
        ],
        "projects": [
            {
                "name": "",
                "description": None,
                "tech_stack": [
                    {
                        "skill": "",
                        "reason": "",
                    }
                ],
            }
        ],
        "strengths": [
            {
                "text": "",
                "evidence": "",
            }
        ],
        "weaknesses": [
            {
                "text": "",
                "evidence": "",
            }
        ],
        "missing_skills": [
            {
                "skill": "",
                "reason": "",
            }
        ],
        "recommended_topics": [
            {
                "topic": "",
                "reason": "",
            }
        ],
    }

    return f"""
You are an expert Technical Recruiter, ATS Resume Reviewer, and Hiring Manager.

Analyze the following resume for the role:

{role["title"]}

Focus primarily on these competencies:

{focus}

Return ONLY valid JSON.

==================================================
OUTPUT RULES
==================================================

- Return ONLY JSON.
- Do NOT wrap JSON in markdown.
- Do NOT explain anything.
- Do NOT include reasoning.
- Every field from the schema MUST exist.
- Do NOT rename fields.
- Do NOT add extra fields.
- The JSON must exactly match the schema.
- The JSON must be directly parseable by Pydantic.
- Every array must contain at least one item whenever applicable.
- Never fabricate information.
- Base every conclusion ONLY on the resume.

==================================================
EVIDENCE RULES
==================================================

Every evaluation must be supported by resume evidence.

If evidence does not exist, explicitly state:

- "Not mentioned in resume"
- "No evidence provided"

Never invent:

- Skills
- Experience
- Projects
- Certifications
- Responsibilities
- Achievements

==================================================
RESUME SCORE
==================================================

Calculate resume_score out of 100.

Weights:

{weights}

Score Guidelines

90-100 : Excellent

80-89 : Strong

70-79 : Average

60-69 : Needs Improvement

Below 60 : Weak

==================================================
TECHNICAL SKILLS
==================================================

Extract ONLY technical skills explicitly mentioned.

Return each item as:

{{
    "skill": "...",
    "reason": "Where it was found in the resume."
}}

Example:

[
    {{
        "skill": "Python",
        "reason": "Listed in Skills section."
    }},
    {{
        "skill": "FastAPI",
        "reason": "Used in PrepGenius AI project."
    }}
]

==================================================
SOFT SKILLS
==================================================

Extract ONLY soft skills explicitly mentioned.

Return each item as:

{{
    "text": "...",
    "evidence": "Resume evidence."
}}

Example:

[
    {{
        "text": "Problem Solving",
        "evidence": "Mentioned in project achievements."
    }}
]

==================================================
PROJECTS
==================================================

For every project return:

{{
    "name": "...",
    "description": "...",
    "tech_stack": [
        {{
            "skill": "...",
            "reason": "Mentioned in project."
        }}
    ]
}}

Rules:

- name is required.
- description may be null.
- tech_stack must contain ONLY technologies explicitly mentioned.

==================================================
STRENGTHS
==================================================

Return up to 5 strengths.

Each strength:

{{
    "text": "...",
    "evidence": "Resume evidence."
}}

==================================================
WEAKNESSES
==================================================

Return up to 5 weaknesses.

Weaknesses must be technical.

Each weakness:

{{
    "text": "...",
    "evidence": "No evidence provided"
}}

==================================================
MISSING SKILLS
==================================================

Compare the resume against these competencies:

{focus}

Return up to 8 missing skills.

Each item:

{{
    "skill": "...",
    "reason": "Why it matters."
}}

==================================================
RECOMMENDED INTERVIEW TOPICS
==================================================

Generate up to 6 interview topics.

Each item:

{{
    "topic": "...",
    "reason": "Why this topic should be assessed."
}}

Priority:

1. Missing skills
2. Weak technical areas
3. Technologies used in projects

==================================================
FINAL RULES
==================================================

- Return ONLY JSON.
- Match the schema EXACTLY.
- Every object must contain every required field.
- Do not return strings where objects are expected.
- Do not return objects where strings are expected.
- Do not include markdown.

Schema:

{json.dumps(schema, indent=2)}

Resume:

{resume_text}
"""