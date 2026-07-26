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
        "recommended_topics": [],
    }

    return f"""
You are an expert Technical Recruiter, ATS Resume Reviewer, and Hiring Manager.

Analyze the following resume as if you are reviewing it for the position of:

{role["title"]}

Prioritize evaluating the candidate based on these key competencies:

{focus}

Return ONLY valid JSON matching the schema.

====================================
General Rules
====================================

- Return ONLY JSON.
- Do NOT wrap the response in markdown.
- Do NOT include explanations.
- Do NOT include reasoning.
- Every field in the schema MUST exist.
- Every array MUST contain at least one item.
- Never leave any field empty.
- Never fabricate information.
- Base every conclusion ONLY on the resume.

====================================
Evidence Requirement
====================================

Every evaluation must be supported by explicit evidence from the resume.

For every strength:

- Include the exact resume evidence that supports it.
- Do not infer experience that is not written.

For every weakness:

- Cite the missing or insufficient evidence that caused the weakness.
- If something is absent from the resume, use phrases such as:
    - "Not mentioned in resume"
    - "No evidence provided"

For every missing skill:

- Explain why it is considered missing for the target role.
- Do not claim the candidate lacks a skill unless it is not mentioned anywhere in the resume.

====================================
Important Evaluation Principle
====================================

No resume is perfect.

Evaluate the resume realistically as a recruiter would.

Every resume has strengths, weaknesses, and improvement areas.

If information is missing:

- Do NOT invent details.
- Clearly indicate the absence of evidence.
- Provide improvement-oriented observations.
- Use phrases such as:
    - "Not mentioned in resume"
    - "No evidence provided"
    - "Could be improved by adding..."
    - "Limited information available"

The goal is not to reject the candidate.

The goal is to identify the current resume quality and improvement opportunities.

====================================
Analysis Workflow
====================================

Before generating the final JSON, perform the following steps internally.

Step 1: Extract Facts

Extract ONLY information explicitly stated in the resume, including:

- Technical skills
- Soft skills
- Projects
- Education
- Work experience
- Certifications
- Tools
- Frameworks
- Programming languages
- Databases
- Cloud platforms
- Achievements

Do NOT infer or assume any information.

Step 2: Identify Missing Information

Compare the extracted facts against the target role competencies.

Determine:

- Important skills explicitly missing
- Areas with limited evidence
- Technologies expected for the role but not mentioned
- Missing project depth
- Missing measurable impact

If information is absent, treat it as:

- "Not mentioned in resume"

Step 3: Evaluate the Resume

Using ONLY the extracted facts:

- Calculate the resume score.
- Identify strengths supported by resume evidence.
- Identify weaknesses supported by missing or limited evidence.
- Recommend interview topics based on:
    1. Missing skills
    2. Weak technical areas
    3. Technologies mentioned in projects that deserve deeper assessment

Do NOT introduce any new facts during evaluation.

Step 4: Generate Output

Return ONLY valid JSON matching the provided schema.

Ensure every evaluation is supported by resume evidence or explicitly states:

- "Not mentioned in resume"
- "No evidence provided"

Do not include your intermediate reasoning or these steps in the output.

====================================
Resume Score
====================================

Calculate resume_score out of 100 using the following weights.

{weights}

Total = 100

Scoring Guidelines:

90–100
Excellent resume for the target role.

80–89
Good resume with only minor improvements required.

70–79
Average resume with noticeable technical gaps.

60–69
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

- Leadership
- Communication
- Teamwork
- Problem Solving

Do NOT infer soft skills.

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

Generate strengths ONLY from explicit resume evidence.

Each strength must include:

- text
- evidence

Example:

{{
    "text": "Strong backend development experience",
    "evidence": "Developed REST APIs using FastAPI and SQLAlchemy."
}}

Rules:

- Evidence should quote or closely paraphrase the resume.
- Do NOT invent evidence.
- Do NOT infer experience.
- Focus on strengths relevant to the target role.
- Maximum: 5

====================================
Weaknesses
====================================

Weaknesses MUST be based ONLY on technical gaps found in the resume.

Never generate personality weaknesses.

Each weakness must include:

- text
- evidence

Example:

{{
    "text": "No deployment experience mentioned",
    "evidence": "No evidence provided"
}}

Weaknesses should come from:

- Missing important technologies
- Limited project complexity
- Limited production experience
- Missing tools commonly expected
- Lack of measurable impact

Never invent missing experience.

Maximum: 5

====================================
Missing Skills
====================================

Identify important skills that are missing for this target role.

Use the prioritized competencies below as your reference:

{focus}

Each item must contain:

- skill
- reason

Example:

{{
    "skill": "Docker",
    "reason": "Not mentioned in resume."
}}

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

Every evaluative statement must include supporting evidence.

Evidence Rules:

- Do NOT fabricate quotes.
- Do NOT fabricate experience.
- Do NOT fabricate projects.
- Do NOT fabricate skills.
- Evidence must come directly from the resume.
- If evidence does not exist, explicitly state:
    - "Not mentioned in resume"
    - "No evidence provided"

If you cannot support a conclusion with resume evidence, do NOT make that conclusion.

Keep lists concise.

Prioritize observations relevant to the target role.

Return JSON matching EXACTLY this schema.

Schema:

{json.dumps(schema, indent=2)}

Resume:

{resume_text}
"""