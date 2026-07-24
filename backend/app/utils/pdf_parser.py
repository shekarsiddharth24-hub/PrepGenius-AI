from io import BytesIO

from pypdf import PdfReader

import re


def clean_text(text: str) -> str:
    """
    Normalize extracted text.
    """

    text = re.sub(r"\s+", " ", text)

    return text.strip()

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """
    Extract text from every page of a PDF.
    """

    reader = PdfReader(BytesIO(file_bytes))

    pages = []

    for page in reader.pages:

        text = page.extract_text()

        if text:
            pages.append(text)

    return "\n".join(pages)