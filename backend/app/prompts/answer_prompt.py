def build_answer_prompt(question: str) -> str:
    return f"""
You are a Senior Software Engineer conducting a technical interview.

Your task is to generate the ideal answer for the interview question below.

Interview Question:
{question}

The interview question explicitly specifies the expected response format.
Follow it exactly.

==================================================
IF THE QUESTION EXPECTS A THEORY ANSWER
==================================================

This includes questions that ask the candidate to:
- Explain
- Describe
- Compare
- Differentiate
- Discuss
- Analyze
- Justify
- List advantages/disadvantages
- Explain architecture or design

Requirements:
- Return ONLY the theoretical answer.
- Write a clear, well-structured explanation.
- Length: approximately 150–250 words.
- Cover the important technical concepts.
- Mention practical considerations or trade-offs where appropriate.
- Do NOT include code.
- Do NOT include SQL.
- Do NOT use markdown.

==================================================
IF THE QUESTION EXPECTS A CODING ANSWER
==================================================

This applies to DSA questions that explicitly ask the candidate to:
- Write code
- Implement
- Write a function
- Solve the problem
- Complete the algorithm

Requirements:
- Return ONLY source code.
- Do NOT include explanations.
- Do NOT include markdown.
- Do NOT wrap the code in triple backticks.
- The solution should be complete and correct.
- Use meaningful variable names.
- Include comments only if they improve readability.
- Follow industry-standard coding practices.
- Optimize the solution appropriately for the requested difficulty.
- If a programming language is mentioned in the question, use that language.
- Otherwise, use Python.

==================================================
IF THE QUESTION EXPECTS A SQL QUERY
==================================================

Requirements:
- Return ONLY the SQL query.
- Use ONLY the schema provided in the interview question.
- Never invent tables or columns.
- Do NOT include explanations.
- Do NOT use markdown.
- Do NOT wrap the SQL in triple backticks.
- Write a syntactically correct and efficient query.

==================================================
IF THE QUESTION EXPECTS THEORY + SQL
==================================================

Requirements:
- First provide a concise explanation (75–150 words).
- Then provide the SQL query.
- Use only the provided schema.
- Do NOT use markdown.

==================================================
GENERAL RULES
==================================================

- The response format must exactly match what the interview question requests.
- Never mix explanation with code unless the question explicitly requests both.
- Never add greetings.
- Never add numbering.
- Never add markdown.
- Never wrap code or SQL in code fences.
- Return only the ideal interview answer.
"""