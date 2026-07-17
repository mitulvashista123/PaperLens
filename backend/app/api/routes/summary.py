from fastapi import APIRouter, HTTPException

from app.services.storage.storage import load_chunks, load_metadata
from app.services.llm.summarizer import summarize

router = APIRouter()

@router.get("/{paper_id}")
def paper_summary(paper_id: str):

    try:
        chunks = load_chunks(paper_id)

    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Paper not found",
        )

    if chunks and isinstance(chunks[0], dict):
        text = "\n\n".join(
            chunk["text"]
            for chunk in chunks[:4]
        )
    else:
        text = "\n\n".join(chunks[:4])

    metadata = load_metadata(paper_id)

    summary = summarize(text)

    return {
        "paper_id": paper_id,
        "metadata": metadata,
        "summary": summary,
    }