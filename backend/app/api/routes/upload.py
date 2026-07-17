from pathlib import Path
import uuid

import aiofiles
from fastapi import APIRouter, File, HTTPException, UploadFile

from app.schemas.upload import UploadResponse

import shutil

from app.services.pdf.parser import parse_pdf
from app.services.rag.embedder import embed_texts
from app.services.rag.vector_store import (
    create_collection,
    add_chunks,
)
from app.services.storage.storage import (
    create_paper_folder,
    save_pdf,
    save_chunks,
    save_metadata,
)

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/")
async def upload_pdf(file: UploadFile):

    paper_id, folder = create_paper_folder()

    pdf_path = folder / "paper.pdf"

    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print("Parsing PDF...")
    paper = parse_pdf(str(pdf_path))

    print("Creating embeddings...")
    embeddings = embed_texts(
        [chunk["text"] for chunk in paper.chunks]
    )

    print("Creating Qdrant collection...")
    create_collection()

    print("Adding vectors...")
    add_chunks(
        paper_id,
        paper.chunks,
        embeddings,
    )

    save_chunks(
        folder,
        paper.chunks,
    )

    save_metadata(
        folder,
        {
            "title": paper.title,
            "authors": paper.authors,
            "pages": paper.num_pages,
            "sections": list(paper.sections.keys()),
        },
    )

    return {
        "paper_id": paper_id,
        "title": paper.title,
        "authors": paper.authors,
        "pages": paper.num_pages,
        "chunks": len(paper.chunks),
    }