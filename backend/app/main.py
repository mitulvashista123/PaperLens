from fastapi import FastAPI

app = FastAPI(
    title="PaperLens API",
    version="0.1.0",
    description="Backend API for PaperLens",
)


@app.get("/")
def health():
    return {
        "status": "healthy",
        "project": "PaperLens",
        "version": "0.1.0",
    }