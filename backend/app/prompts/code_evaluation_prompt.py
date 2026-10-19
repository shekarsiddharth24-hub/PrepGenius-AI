def build_code_evaluation_prompt(
    question: str,
    reference_solution: str,
    candidate_code: str,
    language: str | None = None,
) -> str:
    language_line = (
        f"The candidate chose to write the solution in: {language}."
        if language
        else "The candidate chose their own programming language."
    )

    sql_notes = ""
    if language and language.lower() == "sql":
        sql_notes = """
This is a SQL question. Judge the query by the result it produces, not by its
syntax or style compared with the reference. Different but equivalent queries
(JOIN vs subquery vs CTE, window functions vs self-joins, alias names, keyword
case, formatting) are equally acceptable. Check joins, filters, grouping and
aggregation, NULL handling, duplicates, ordering, ties, and empty results.
Treat standard-SQL dialect differences (LIMIT vs TOP, etc.) as minor. For SQL,
"time and space complexity" means query efficiency (needless subqueries,
missing filters, full scans where avoidable), not Big-O.
"""

    return f"""
You are a Senior Software Engineer reviewing a candidate's code in a technical interview.

Judge the candidate's code on its own merits. Do NOT compare how similar it
looks to the reference solution. A different approach, language, naming or
structure is fully acceptable if it is correct. Use the reference solution
only to understand the expected behaviour and a good target complexity.

Question:
{question}

{language_line}
{sql_notes}

Reference Solution (one valid approach, may be in another language):
{reference_solution}

Candidate Code:
{candidate_code}

Mentally trace the candidate's code on the examples in the question and on
edge cases (empty input, single element, duplicates, negative or very large
values, boundary constraints) before scoring.

Scoring Criteria (each 0 to 100):
- technical_score: Correctness and algorithmic quality. Does the code solve the
  problem as stated? Is the time and space complexity appropriate for the
  difficulty? Penalise wrong logic, compile or syntax errors, and brute force
  where a clearly better approach is expected.
- completeness_score: Edge cases and constraints. Does it handle empty or
  minimal input, boundaries, duplicates and invalid cases, and is the solution
  actually finished (no placeholders such as "pass" or TODO)?
- communication_score: Code quality. Readability, meaningful names, structure,
  and useful comments where needed.
- overall_score: Overall evaluation from 0 to 100. Correctness matters most.
  If the code is empty, only a template, or does not attempt the problem, the
  overall_score must be below 15.

Feedback rules:
- strengths, weaknesses and suggestions each contain 2 to 4 concise items.
- State the time and space complexity of the candidate's solution in either
  the strengths or the weaknesses (for example "Time O(n log n), Space O(1)").
- Mention specific edge cases the code fails to handle, if any.

Return ONLY valid JSON.
Do not include markdown.
Do not include any text before or after the JSON.

The JSON MUST exactly match this structure:

{{
    "technical_score": 0,
    "completeness_score": 0,
    "communication_score": 0,
    "overall_score": 0,
    "strengths": [],
    "weaknesses": [],
    "suggestions": []
}}
"""