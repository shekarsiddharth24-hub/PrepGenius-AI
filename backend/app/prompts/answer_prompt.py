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
- Respond in EXACTLY this two-part format:

<the complete source code>

Explanation:
<short theory explanation>

- Part 1 is ONLY the source code. The solution must be complete and correct.
- Use meaningful variable names.
- Include comments only if they improve readability.
- Follow industry-standard coding practices.
- Optimize the solution appropriately for the requested difficulty.
- If a programming language is mentioned in the question, use that language.
- Otherwise, use Python.
- Part 2 starts on its own line with the word "Explanation:" followed by
  a SHORT explanation (3 to 5 sentences, about 50-90 words) covering:
  the approach / key idea, why it works, and the time and space
  complexity (for example "Time O(n), Space O(n)").
- Do NOT wrap the code in triple backticks.

==================================================
IF THE QUESTION EXPECTS A SQL QUERY
==================================================

Requirements:
- Respond in EXACTLY this two-part format:

<the SQL query>

Explanation:
<short theory explanation>

- Part 1 is ONLY the SQL query.
- Use ONLY the schema provided in the interview question.
- Never invent tables or columns.
- Write a syntactically correct and efficient query.
- Part 2 starts on its own line with the word "Explanation:" followed by
  a SHORT explanation (2 to 4 sentences, about 40-80 words) of how the
  query works: which tables are joined or filtered, which clauses
  (JOIN, GROUP BY, HAVING, window functions, subqueries...) are used
  and why.
- Do NOT wrap the SQL in triple backticks.
- Do NOT use markdown.

==================================================
GENERAL RULES
==================================================

- The response format must exactly match what the interview question requests.
- Theory questions get a written answer only. Coding and SQL questions
  get the code or query followed by the "Explanation:" section, as above.
- Never add greetings.
- Never add numbering.
- Never add markdown.
- Never wrap code or SQL in code fences.
- Return only the ideal interview answer.
"""