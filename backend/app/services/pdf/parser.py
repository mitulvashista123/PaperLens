import fitz

from app.models.paper import Paper
from app.services.pdf.cleaner import clean_text
from app.services.pdf.section_extractor import extract_sections
from app.services.pdf.metadata_extractor import (
    infer_title,
    infer_authors,
)
from app.services.rag.chunker import chunk_pdf

def parse_pdf(pdf_path: str) -> Paper:
    doc = fitz.open(pdf_path)

    pages = []

    for page in doc:
        pages.append(page.get_text())

    cleaned_text = clean_text("".join(pages))

    paper = Paper(
    title=infer_title(cleaned_text),
    authors=infer_authors(cleaned_text),
    metadata=doc.metadata,
    raw_text=cleaned_text,
    num_pages=len(doc),
    )

    paper.sections = extract_sections(cleaned_text)
    paper.chunks = chunk_pdf(pdf_path)
    
    # print("=" * 80)
    # print("FIRST 5 CHUNKS")
    # print("=" * 80)

    # for i, chunk in enumerate(paper.chunks[:5]):
    #     print(f"\nChunk {i}")
    #     print(chunk[:800])

    return paper