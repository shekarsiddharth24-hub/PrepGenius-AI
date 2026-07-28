from io import BytesIO

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


class PDFGenerator:
    """Generates Resume Analysis PDF Reports."""

    # --------------------------------------------------------
    # Generic Helpers
    # --------------------------------------------------------

    def heading(self, story, styles, text: str):
        story.append(Paragraph(f"<b>{text}</b>", styles["Heading2"]))

    def paragraph(self, story, styles, text: str):
        story.append(Paragraph(text, styles["Normal"]))

    def spacer(self, story, height=12):
        story.append(Spacer(1, height))

    # --------------------------------------------------------
    # Resume Information
    # --------------------------------------------------------

    def add_resume_info(
        self,
        story,
        styles,
        record,
        analysis,
    ):
        self.paragraph(
            story,
            styles,
            f"<b>Filename:</b> {record.filename}",
        )

        self.paragraph(
            story,
            styles,
            f"<b>Resume Score:</b> {analysis.resume_score}/100",
        )

        self.paragraph(
            story,
            styles,
            f"<b>Generated:</b> {record.created_at.strftime('%d %b %Y %I:%M %p')}",
        )

        self.spacer(story, 20)

    # --------------------------------------------------------
    # Technical Skills
    # --------------------------------------------------------

    def add_technical_skills(self, story, styles, skills):
        self.heading(story, styles, "Technical Skills")

        if not skills:
            self.paragraph(story, styles, "No technical skills detected.")
        else:
            for skill in skills:

                text = f"• <b>{skill.skill}</b>"

                if skill.reason:
                    text += f"<br/><font size='9'>{skill.reason}</font>"

                self.paragraph(story, styles, text)

        self.spacer(story)

    # --------------------------------------------------------
    # Soft Skills
    # --------------------------------------------------------

    def add_soft_skills(self, story, styles, skills):
        self.heading(story, styles, "Soft Skills")

        if not skills:
            self.paragraph(story, styles, "No soft skills detected.")
        else:
            for skill in skills:

                text = f"• <b>{skill.text}</b>"

                if skill.evidence:
                    text += f"<br/><font size='9'>{skill.evidence}</font>"

                self.paragraph(story, styles, text)

        self.spacer(story)

    # --------------------------------------------------------
    # Projects
    # --------------------------------------------------------

    def add_projects(self, story, styles, projects):
        self.heading(story, styles, "Projects")

        if not projects:
            self.paragraph(story, styles, "No projects detected.")

        else:
            for project in projects:

                self.paragraph(
                    story,
                    styles,
                    f"<b>{project.name}</b>",
                )

                if project.description:
                    self.paragraph(
                        story,
                        styles,
                        project.description,
                    )

                if project.tech_stack:

                    tech = ", ".join(
                        skill.skill for skill in project.tech_stack
                    )

                    self.paragraph(
                        story,
                        styles,
                        f"<b>Tech Stack:</b> {tech}",
                    )

                self.spacer(story, 8)

        self.spacer(story)

    # --------------------------------------------------------
    # Strengths
    # --------------------------------------------------------

    def add_strengths(self, story, styles, strengths):
        self.heading(story, styles, "Strengths")

        if not strengths:
            self.paragraph(story, styles, "No strengths detected.")

        else:
            for item in strengths:

                self.paragraph(
                    story,
                    styles,
                    f"• <b>{item.text}</b>",
                )

                self.paragraph(
                    story,
                    styles,
                    f"<font size='9'>{item.evidence}</font>",
                )

                self.spacer(story, 6)

        self.spacer(story)

    # --------------------------------------------------------
    # Weaknesses
    # --------------------------------------------------------

    def add_weaknesses(self, story, styles, weaknesses):
        self.heading(story, styles, "Weaknesses")

        if not weaknesses:
            self.paragraph(story, styles, "No weaknesses detected.")

        else:
            for item in weaknesses:

                self.paragraph(
                    story,
                    styles,
                    f"• <b>{item.text}</b>",
                )

                self.paragraph(
                    story,
                    styles,
                    f"<font size='9'>{item.evidence}</font>",
                )

                self.spacer(story, 6)

        self.spacer(story)

    # --------------------------------------------------------
    # Missing Skills
    # --------------------------------------------------------

    def add_missing_skills(self, story, styles, skills):
        self.heading(story, styles, "Missing Skills")

        if not skills:
            self.paragraph(story, styles, "No missing skills detected.")

        else:
            for skill in skills:

                self.paragraph(
                    story,
                    styles,
                    f"• <b>{skill.skill}</b>",
                )

                self.paragraph(
                    story,
                    styles,
                    f"<font size='9'>{skill.reason}</font>",
                )

                self.spacer(story, 6)

        self.spacer(story)

    # --------------------------------------------------------
    # Recommended Topics
    # --------------------------------------------------------

    def add_recommended_topics(self, story, styles, topics):
        self.heading(story, styles, "Recommended Interview Topics")

        if not topics:
            self.paragraph(
                story,
                styles,
                "No recommendations available.",
            )

        else:
            for topic in topics:

                self.paragraph(
                    story,
                    styles,
                    f"• <b>{topic.topic}</b>",
                )

                self.paragraph(
                    story,
                    styles,
                    f"<font size='9'>{topic.reason}</font>",
                )

                self.spacer(story, 6)

        self.spacer(story)

    # --------------------------------------------------------
    # Build PDF
    # --------------------------------------------------------

    def build_resume_report(
        self,
        record,
        analysis,
    ):

        buffer = BytesIO()

        doc = SimpleDocTemplate(buffer)

        styles = getSampleStyleSheet()

        story = []

        story.append(
            Paragraph(
                "PrepGenius AI",
                styles["Title"],
            )
        )

        story.append(
            Paragraph(
                "Resume Analysis Report",
                styles["Heading2"],
            )
        )

        self.spacer(story, 20)

        self.add_resume_info(
            story,
            styles,
            record,
            analysis,
        )

        self.add_technical_skills(
            story,
            styles,
            analysis.technical_skills,
        )

        self.add_soft_skills(
            story,
            styles,
            analysis.soft_skills,
        )

        self.add_projects(
            story,
            styles,
            analysis.projects,
        )

        self.add_strengths(
            story,
            styles,
            analysis.strengths,
        )

        self.add_weaknesses(
            story,
            styles,
            analysis.weaknesses,
        )

        self.add_missing_skills(
            story,
            styles,
            analysis.missing_skills,
        )

        self.add_recommended_topics(
            story,
            styles,
            analysis.recommended_topics,
        )

        self.spacer(story, 20)

        story.append(
            Paragraph(
                "Generated by PrepGenius AI",
                styles["Italic"],
            )
        )

        doc.build(story)

        buffer.seek(0)

        return buffer


pdf_generator = PDFGenerator()