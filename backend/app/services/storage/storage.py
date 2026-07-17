from pathlib import Path
import json
import shutil
import uuid

BASE_DIR = Path("storage/papers")
BASE_DIR.mkdir(parents=True, exist_ok=True)


def create_paper_folder():
    paper_id = str(uuid.uuid4())

    folder = BASE_DIR / paper_id

    folder.mkdir(parents=True, exist_ok=True)

    return paper_id, folder


def save_pdf(folder: Path, uploaded_pdf: str):
    destination = folder / "paper.pdf"

    shutil.copy(uploaded_pdf, destination)

    return destination


def save_metadata(folder: Path, metadata: dict):
    with open(folder / "metadata.json", "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)


def save_chunks(folder: Path, chunks: list[str]):
    with open(folder / "chunks.json", "w", encoding="utf-8") as f:
        json.dump(chunks, f, indent=2)

def get_paper_folder(paper_id: str):
    return BASE_DIR / paper_id


def load_metadata(paper_id: str):
    folder = get_paper_folder(paper_id)

    with open(folder / "metadata.json", encoding="utf-8") as f:
        return json.load(f)


def load_chunks(paper_id: str):
    folder = get_paper_folder(paper_id)

    with open(folder / "chunks.json", encoding="utf-8") as f:
        return json.load(f)


def get_pdf_path(paper_id: str):
    folder = get_paper_folder(paper_id)

    return folder / "paper.pdf"

def list_papers():
    papers = []

    if not BASE_DIR.exists():
        return papers

    for folder in BASE_DIR.iterdir():

        if not folder.is_dir():
            continue

        metadata_file = folder / "metadata.json"

        if not metadata_file.exists():
            continue

        with open(metadata_file, encoding="utf-8") as f:
            metadata = json.load(f)

        papers.append(
            {
                "paper_id": folder.name,
                "title": metadata.get("title", "Untitled"),
                "authors": metadata.get("authors", []),
                "pages": metadata.get("pages", 0),
            }
        )

    papers.sort(
        key=lambda x: x["title"].lower()
    )

    return papers

def delete_paper_folder(paper_id: str):
    folder = get_paper_folder(paper_id)

    if folder.exists():
        shutil.rmtree(folder)