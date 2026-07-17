from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.upload import router as upload_router
from app.api.routes.summary import router as summary_router
from app.api.routes.chat import router as chat_router
from app.api.routes.paper import router as paper_router
from app.api.routes import library

app = FastAPI(
    title="PaperLens API",
    version="0.1.0",
    description="Backend API for PaperLens",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)

@app.get("/")
def health():
    return {
        "status": "healthy",
        "project": "PaperLens",
        "version": "0.1.0",
    }

app.include_router(
    summary_router,
    prefix="/summary",
    tags=["Summary"],
)

app.include_router(chat_router)
app.include_router(paper_router)
app.include_router(library.router)