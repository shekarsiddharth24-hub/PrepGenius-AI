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
        "technical_skills": [],
        "soft_skills": [],
        "projects": [
            {
                "name": "",
                "description": None,
                "tech_stack": [],
            }
        ],
        "strengths": [],
        "weaknesses": [],
        "missing_skills": [],
        "recommended_topics": [],
    }

    return f"""
You are an expert Technical Recruiter, ATS Resume Reviewer, and Hiring Manager.

Analyze the following resume as if you are reviewing it for the position of:

{role["title"]}

Prioritize evaluating the candidate based on these key competencies:

{focus}

Return ONLY valid JSON matching the schema.

General Rules:

- Return ONLY JSON.
- Do NOT wrap the response in markdown.
- Do NOT include explanations.
- Do NOT include reasoning.
- Every field in the schema MUST exist.
- Every array MUST contain at least one item.
- Never leave any field empty.
- Never fabricate information.
- Base every conclusion ONLY on the resume.

Important Evaluation Principle:

No resume is perfect.

Evaluate the resume realistically as a recruiter would.
Every resume has strengths, weaknesses, and improvement areas.

If information is missing:

- Do NOT invent details.
- Clearly indicate the absence of evidence.
- Provide improvement-oriented observations.
- Use phrases such as:
  "Not mentioned in resume"
  "No evidence provided"
  "Could be improved by adding..."
  "Limited information available"

The goal is not to reject the candidate.
The goal is to identify the current resume quality and improvement opportunities.

====================================
Resume Score
====================================

Calculate resume_score out of 100 using the following weights.

{weights}

Total = 100

Scoring Guidelines:

90-100
Excellent resume for the target role.

80-89
Good resume with only minor improvements required.

70-79
Average resume with noticeable technical gaps.

60-69
Below average. Missing important skills or project depth.

Below 60
Weak resume needing significant improvement.

Deduct points for:

- Missing important skills for the target role
- Weak or incomplete projects
- Lack of relevant experience
- Poor resume organization
- Missing certifications (when beneficial)
- Lack of measurable project impact

Do NOT randomly assign a score.

====================================
Technical Skills
====================================

Extract ONLY technical skills explicitly mentioned.

Never invent skills.

====================================
Soft Skills
====================================

Extract ONLY soft skills explicitly mentioned.

Examples:

Leadership
Communication
Teamwork
Problem Solving

Do not infer soft skills.

====================================
Projects
====================================

For every project:

- name is mandatory.
- description is optional.
- If missing, return null.
- tech_stack must contain ONLY technologies explicitly mentioned for that project.
- Never invent project descriptions.
- Never invent technologies.

====================================
Strengths
====================================

Generate strengths ONLY from resume evidence.

Focus on strengths relevant to the target role.

Examples:

- Strong project portfolio
- Excellent Python development experience
- Strong backend development skills
- Good machine learning knowledge
- Experience with cloud platforms

Do NOT generate generic strengths.

Maximum: 5

====================================
Weaknesses
====================================

Weaknesses MUST be based ONLY on technical gaps found in the resume.

Never generate personality weaknesses.

Weaknesses should come from:

- Missing important technologies for the target role
- Limited project complexity
- Limited production experience
- Missing tools commonly expected for the role
- Lack of measurable impact

Maximum: 5

====================================
Missing Skills
====================================

Identify important skills that are missing for this target role.

Use the prioritized competencies below as your reference:

{focus}

Return ONLY genuinely missing skills.

Maximum: 8

====================================
Recommended Interview Topics
====================================

Generate interview topics using this priority:

1. Missing Skills
2. Weak technical areas
3. Technologies used in projects that deserve deeper assessment

The topics should be relevant to the target role.

Maximum: 6 topics.

====================================
Final Rules
====================================

- Every output must be supported by resume evidence.
- Never fabricate experience.
- Never fabricate projects.
- Never fabricate skills.
- Keep lists concise.
- Prioritize observations relevant to the target role.
- Return JSON matching EXACTLY this schema.

Schema:

{json.dumps(schema, indent=2)}

Resume:

{resume_text}
"""