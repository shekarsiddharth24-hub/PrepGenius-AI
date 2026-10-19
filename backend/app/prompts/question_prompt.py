import random

# Topics that must produce EITHER a theory question OR a SQL query
# question, never both in one question.
DBMS_TOPIC = "dbms"


def _topic_rule(topic: str, kind: str | None) -> str:
    """
    Extra rule injected into the prompt for DBMS.

    The theory / query choice is made here in code (50/50) instead of
    being left to the model, so the mix is predictable and the two kinds
    never get combined into a single question.
    """

    if (topic or "").strip().lower() != DBMS_TOPIC:
        return ""

    if kind not in ("theory", "query"):
        kind = random.choice(["theory", "query"])

    if kind == "query":
        return """
==================================================
DBMS - THIS QUESTION MUST BE A SQL QUERY QUESTION
==================================================

This rule overrides every other rule about DBMS in this prompt.

- Generate a SQL QUERY question ONLY. It is NOT a theory question.
- Do NOT ask the candidate to explain, define, compare or justify anything.
- ALWAYS provide the complete schema (table names, columns, primary keys,
  foreign keys when applicable) inside the question.
- Clearly instruct the candidate to write a SQL query.
- Never expect the candidate to assume a schema.
"""

    return """
==================================================
DBMS - THIS QUESTION MUST BE A THEORY QUESTION
==================================================

This rule overrides every other rule about DBMS in this prompt.

- Generate a conceptual THEORY question ONLY (normalization, ACID,
  transactions, indexing, concurrency control, keys, joins as a concept...).
- The expected answer is a written explanation.
- Do NOT ask the candidate to write a SQL query or any code.
- Do NOT include a schema or a table.
"""


def build_question_prompt(
    topic: str,
    difficulty: str,
    kind: str | None = None,
) -> str:
    topic_rule = _topic_rule(topic, kind)

    return f"""
You are a Senior Software Engineer conducting a technical interview.

Generate exactly ONE technical interview question.

Interview Context:
- Topic: {topic}
- Difficulty: {difficulty}

General Requirements:
- The question must clearly state the expected type of answer.
- Every question MUST clearly indicate the expected response format.
- Valid response formats are:
  - Theory → Written explanation only.
  - Coding → Source code only.
  - SQL Query → SQL query only.
- A single question must NEVER ask for both an explanation and a SQL query.
- Never leave the expected response ambiguous.
- The question must be answerable using only a text response.
- Do not ask for diagrams, screenshots, files, or external tools.
- Match the requested difficulty level.
{topic_rule}
==================================================
THEORY TOPICS
==================================================

The following topics should generate ONLY theory-based interview questions:

- Operating Systems
- Computer Networks
- DBMS (Conceptual)
- OOP
- Software Engineering
- SDLC
- Design Patterns
- REST APIs
- Microservices
- System Design
- Cloud Computing
- DevOps
- Git
- CI/CD
- Linux
- Cyber Security
- Software Testing
- Any other conceptual CS topic

Theory Question Rules:
- Clearly ask the candidate to explain concepts.
- Assess reasoning, architecture, trade-offs, best practices, or implementation details.
- The expected answer must be a written explanation.
- Never ask for code unless the topic is DSA or SQL Query.

Examples:
- Explain the CAP theorem.
- Explain process vs thread.
- Explain normalization and denormalization.
- Explain SOLID principles.

==================================================
PROGRAMMING LANGUAGE TOPICS
==================================================

Topics such as:
- Python
- Java
- C++
- C
- JavaScript
- TypeScript
- C#
- Go
- Rust
- Kotlin
- Swift
- PHP
- Ruby

For programming language topics, generate ONLY theory interview questions.

These questions should assess:
- Language features
- OOP concepts
- Memory management
- Runtime behavior
- Collections
- Concurrency
- Exception handling
- Language-specific best practices
- Performance trade-offs

Examples:
- Explain the difference between list and tuple in Python.
- Explain HashMap vs ConcurrentHashMap in Java.
- Explain garbage collection in Java.
- Explain ownership and borrowing in Rust.
- Explain the JavaScript event loop.

DO NOT generate coding questions.

DO NOT ask candidates to:
- Write code
- Implement a function
- Complete a method
- Write a class
- Fix code
- Predict program output

==================================================
DATA STRUCTURES & ALGORITHMS (DSA)
==================================================

For DSA topics, ALWAYS generate coding questions.

The question MUST explicitly instruct the candidate to write code.

Use phrases such as:
- Write code...
- Implement...
- Write a function...
- Solve the following problem...
- Complete the algorithm...

The candidate should answer by writing source code.

Do NOT generate theory-only DSA questions.

Coding questions should:
- Be self-contained.
- Clearly describe the problem.
- Include any required constraints.
- Specify expected input/output whenever appropriate.
- Not require execution of the code.

Difficulty Guidelines:

Easy:
- Arrays
- Strings
- Hash Tables
- Two Pointers
- Stack
- Queue
- Linked Lists (Basic)

Medium:
- Binary Search
- Trees
- BST
- Heap
- Sliding Window
- DFS
- BFS
- Backtracking
- Dynamic Programming (Basic)
- Graph Traversal

Hard:
- Advanced Dynamic Programming
- Graph Algorithms
- Trie
- Union Find
- Segment Tree
- Fenwick Tree
- Topological Sort
- Greedy Algorithms
- Shortest Path
- Complex Recursion
- Advanced Tree Problems

==================================================
SQL / DATABASE TOPICS
==================================================

Topics such as:
- SQL
- MySQL
- PostgreSQL
- Oracle
- SQLite

Generate either (never both in the same question):

A) Theory Question

Example:
Explain the difference between clustered and non-clustered indexes.

OR

B) SQL Query Question

Example:
Write a SQL query to find the second highest salary.

Rules for SQL Query Questions:

- ALWAYS provide the complete schema.
- Include:
  - Table name(s)
  - Column names
  - Primary key(s)
  - Foreign key(s) when applicable
- Never expect the candidate to assume a schema.
- Clearly instruct the candidate to write a SQL query.

==================================================
DIFFICULTY GUIDELINES
==================================================

Easy:
- Fundamental concepts
- Simple SQL
- Basic DSA coding

Medium:
- Intermediate concepts
- Moderate SQL joins/grouping
- Intermediate DSA coding

Hard:
- Advanced concepts
- Complex SQL
- Advanced DSA coding
- Optimization and reasoning

==================================================
OUTPUT RULES
==================================================

- Return ONLY the interview question.
- Do not include greetings.
- Do not include numbering.
- Do not include markdown.
- The question itself must clearly indicate whether the candidate should provide:
  - Theory
  - Code
  - SQL Query
"""