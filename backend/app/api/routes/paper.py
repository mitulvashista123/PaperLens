from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.services.storage.storage import (
    load_metadata,
    delete_paper_folder,
)

from app.services.rag.vector_store import (
    delete_paper_vectors,
)

router = APIRouter(
    prefix="/paper",
    tags=["Paper"],
)


@router.get("/{paper_id}")
def get_paper(paper_id: str):
    try:
        return load_metadata(paper_id)

    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="Paper not found",
        )

@router.get("/{paper_id}/pdf")
def get_pdf(paper_id: str):

    pdf_path = Path("storage") / "papers" / paper_id / "paper.pdf"

    if not pdf_path.exists():
        raise HTTPException(
            status_code=404,
            detail="PDF not found",
        )

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
    )

@router.delete("/{paper_id}")
def delete_paper(paper_id: str):
    try:
        delete_paper_vectors(paper_id)
        delete_paper_folder(paper_id)

        return {
            "success": True,
        }

    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="Paper not found",
        )