from fastapi import APIRouter, HTTPException

from app.models.chat import ChatRequest, ChatResponse
from app.services.storage.storage import load_metadata
from app.services.llm.chat import ask

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("/{paper_id}", response_model=ChatResponse)
def chat_with_paper(
    paper_id: str,
    request: ChatRequest,
):
    # Ensure the paper exists
    try:
        load_metadata(paper_id)
    except Exception:
        raise HTTPException(
            status_code=404,
            detail="Paper not found",
        )

    result = ask(paper_id, request.question)

    return ChatResponse(
        answer=result["answer"],
        sources=result["sources"],
    )