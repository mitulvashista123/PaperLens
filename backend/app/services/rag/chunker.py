import fitz
from langchain_text_splitters import RecursiveCharacterTextSplitter


def chunk_pdf(pdf_path: str):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150,
    )

    chunks = []

    doc = fitz.open(pdf_path)

    for page_number, page in enumerate(doc, start=1):
        text = page.get_text()

        page_chunks = splitter.split_text(text)

        for chunk in page_chunks:
            chunks.append(
                {
                    "text": chunk,
                    "page": page_number,
                }
            )

    return chunks