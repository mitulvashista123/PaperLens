from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class ChatSource(BaseModel):
    page: int


class ChatResponse(BaseModel):
    answer: str
    sources: list[ChatSource]