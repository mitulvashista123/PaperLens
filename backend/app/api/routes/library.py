from fastapi import APIRouter

from app.services.storage.storage import list_papers

router = APIRouter(
    prefix="/library",
    tags=["Library"],
)


@router.get("/")
def library():
    return list_papers()