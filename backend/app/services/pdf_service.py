from io import BytesIO
import json

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


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
                f"<b>Interview Type:</b> {interview.interview_type.title()}",
                styles["Normal"],
            )
        )

        if interview.topic:
            story.append(
                Paragraph(
                    f"<b>Topic:</b> {interview.topic}",
                    styles["Normal"],
                )
            )

        story.append(
            Paragraph(
                f"<b>Difficulty:</b> {interview.difficulty}",
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
                interview.question,
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
                    interview.ideal_answer,
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
                interview.user_answer,
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
        try:
            feedback = json.loads(interview.feedback)

            for section in [
                "strengths",
                "weaknesses",
                "suggestions",
            ]:

                if feedback.get(section):

                    story.append(
                        Paragraph(
                            section.title(),
                            styles["Heading2"],
                        )
                    )

                    for item in feedback[section]:
                        story.append(
                            Paragraph(
                                f"• {item}",
                                styles["BodyText"],
                            )
                        )

                    story.append(Spacer(1, 0.15 * inch))

        except Exception:
            pass

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