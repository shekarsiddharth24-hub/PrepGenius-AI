from io import BytesIO
import json
import re
from xml.sax.saxutils import escape

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


FEEDBACK_SECTIONS = ("strengths", "weaknesses", "suggestions")

_SECTION_HEADER = re.compile(
    r"^\s*(strengths|weaknesses|suggestions)\s*:\s*$",
    re.IGNORECASE,
)


def _safe(value) -> str:
    """
    Make arbitrary user/LLM text safe for ReportLab's Paragraph.

    Paragraph parses its input as XML-like markup, so characters such as
    "<", ">" and "&" (very common in code answers) must be escaped.
    Line breaks and indentation are preserved, since Paragraph would
    otherwise collapse them.
    """
    text = escape(str(value if value is not None else ""))
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = text.replace("\t", "    ")

    lines = []
    for line in text.split("\n"):
        stripped = line.lstrip(" ")
        indent = len(line) - len(stripped)
        lines.append("&nbsp;" * indent + stripped)

    return "<br/>".join(lines)


def parse_feedback(raw) -> dict:
    """
    Parse stored feedback into {"strengths": [...], "weaknesses": [...],
    "suggestions": [...]}.

    save_interview stores feedback as plain text:

        Strengths:
        ...

        Weaknesses:
        ...

        Suggestions:
        ...

    A JSON object with the same keys is also accepted.
    """
    result = {name: [] for name in FEEDBACK_SECTIONS}

    if not raw:
        return result

    if isinstance(raw, dict):
        data = raw
    else:
        data = None
        try:
            data = json.loads(raw)
        except (TypeError, ValueError):
            pass

    if isinstance(data, dict):
        for name in FEEDBACK_SECTIONS:
            items = data.get(name) or []
            if isinstance(items, str):
                items = [items]
            result[name] = [str(i) for i in items if str(i).strip()]
        return result

    current = None
    for line in str(raw).splitlines():
        match = _SECTION_HEADER.match(line)
        if match:
            current = match.group(1).lower()
            continue
        if current and line.strip():
            result[current].append(line.strip())

    return result


class PDFService:

    def build_interview_pdf(self, interview):

        buffer = BytesIO()

        doc = SimpleDocTemplate(buffer)

        styles = getSampleStyleSheet()

        story = []

        # Header
        story.append(
            Paragraph(
                "PrepGenius AI",
                styles["Title"],
            )
        )

        story.append(
            Paragraph(
                "Interview Report",
                styles["Heading1"],
            )
        )

        story.append(Spacer(1, 0.25 * inch))

        # Interview Details
        story.append(
            Paragraph(
                f"<b>Interview Type:</b> {_safe(interview.interview_type.title())}",
                styles["Normal"],
            )
        )

        if interview.topic:
            story.append(
                Paragraph(
                    f"<b>Topic:</b> {_safe(interview.topic)}",
                    styles["Normal"],
                )
            )

        story.append(
            Paragraph(
                f"<b>Difficulty:</b> {_safe(interview.difficulty)}",
                styles["Normal"],
            )
        )

        story.append(
            Paragraph(
                f"<b>Date:</b> {interview.created_at.strftime('%d %B %Y')}",
                styles["Normal"],
            )
        )

        story.append(Spacer(1, 0.2 * inch))

        # Question
        story.append(
            Paragraph(
                "<b>Question</b>",
                styles["Heading2"],
            )
        )

        story.append(
            Paragraph(
                _safe(interview.question),
                styles["BodyText"],
            )
        )

        story.append(Spacer(1, 0.2 * inch))

        # Ideal Answer
        if interview.ideal_answer:
            story.append(
                Paragraph(
                    "<b>Ideal Answer</b>",
                    styles["Heading2"],
                )
            )

            story.append(
                Paragraph(
                    _safe(interview.ideal_answer),
                    styles["BodyText"],
                )
            )

            story.append(Spacer(1, 0.2 * inch))

        # Candidate Answer
        story.append(
            Paragraph(
                "<b>Your Answer</b>",
                styles["Heading2"],
            )
        )

        story.append(
            Paragraph(
                _safe(interview.user_answer),
                styles["BodyText"],
            )
        )

        story.append(Spacer(1, 0.2 * inch))

        # Scores
        story.append(
            Paragraph(
                "<b>Scores</b>",
                styles["Heading2"],
            )
        )

        story.append(
            Paragraph(
                f"Overall Score: {interview.overall_score:.2f}",
                styles["Normal"],
            )
        )

        if interview.semantic_score is not None:
            story.append(
                Paragraph(
                    f"Semantic Score: {interview.semantic_score:.2f}",
                    styles["Normal"],
                )
            )

        if interview.technical_score is not None:
            story.append(
                Paragraph(
                    f"Technical Score: {interview.technical_score:.2f}",
                    styles["Normal"],
                )
            )

        if interview.completeness_score is not None:
            story.append(
                Paragraph(
                    f"Completeness Score: {interview.completeness_score:.2f}",
                    styles["Normal"],
                )
            )

        if interview.communication_score is not None:
            story.append(
                Paragraph(
                    f"Communication Score: {interview.communication_score:.2f}",
                    styles["Normal"],
                )
            )

        story.append(Spacer(1, 0.2 * inch))

        # Feedback
        feedback = parse_feedback(interview.feedback)

        for section in FEEDBACK_SECTIONS:
            items = feedback[section]

            if not items:
                continue

            story.append(
                Paragraph(
                    section.title(),
                    styles["Heading2"],
                )
            )

            for item in items:
                story.append(
                    Paragraph(
                        f"&bull; {_safe(item)}",
                        styles["BodyText"],
                    )
                )

            story.append(Spacer(1, 0.15 * inch))

        story.append(
            Paragraph(
                "Generated by PrepGenius AI",
                styles["Italic"],
            )
        )

        doc.build(story)

        buffer.seek(0)

        return buffer


pdf_service = PDFService()