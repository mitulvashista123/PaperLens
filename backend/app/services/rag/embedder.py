from sentence_transformers import SentenceTransformer

# Loaded once when the app starts
model = SentenceTransformer("BAAI/bge-small-en-v1.5")


def embed_texts(texts: list[str]) -> list[list[float]]:
    embeddings = model.encode(
        texts,
        normalize_embeddings=True,
        convert_to_numpy=True,
    )

    return embeddings.tolist()