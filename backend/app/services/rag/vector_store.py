from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    PointStruct,
    VectorParams,
    Filter,
    FieldCondition,
    MatchValue,
)
from pathlib import Path

Path("storage/qdrant").mkdir(parents=True, exist_ok=True)

client = QdrantClient(path="storage/qdrant")
COLLECTION = "papers"


def create_collection():
    collections = [
        c.name
        for c in client.get_collections().collections
    ]

    if COLLECTION not in collections:
        client.create_collection(
            collection_name=COLLECTION,
            vectors_config=VectorParams(
                size=384,
                distance=Distance.COSINE,
            ),
        )


import uuid

def add_chunks(paper_id: str, chunks, embeddings):
    points = []

    for chunk, embedding in zip(chunks, embeddings):
        points.append(
            PointStruct(
                id=str(uuid.uuid4()),
                vector=embedding,
                payload={
                    "paper_id": paper_id,
                    "text": chunk["text"],
                    "page": chunk["page"],
                },
            )
        )

    client.upsert(
        collection_name=COLLECTION,
        points=points,
    )

    count = client.count(
        collection_name=COLLECTION,
        count_filter=Filter(
            must=[
                FieldCondition(
                    key="paper_id",
                    match=MatchValue(value=paper_id),
                )
            ]
        ),
    )

    # print("=" * 80)
    # print("Vectors stored for this paper:", count.count)
    # print("=" * 80)


def search(paper_id: str, query_embedding, limit=20):

    count = client.count(
        collection_name=COLLECTION,
        count_filter=Filter(
            must=[
                FieldCondition(
                    key="paper_id",
                    match=MatchValue(value=paper_id),
                )
            ],
        ),
    )

    # print()
    # print("=" * 80)
    # print("SEARCHING PAPER:", paper_id)
    # print("Vectors for this paper:", count.count)
    # print("=" * 80)

    results = client.query_points(
        collection_name=COLLECTION,
        query=query_embedding,
        limit=limit,
        query_filter=Filter(
            must=[
                FieldCondition(
                    key="paper_id",
                    match=MatchValue(value=paper_id),
                )
            ]
        ),
    )

    # print("=" * 80)
    # print("SEARCH RESULTS")
    # print("=" * 80)

    # for point in results.points:
    #     print("Score:", point.score)
    #     print(point.payload["text"][:200])
    #     print("-" * 60)

    return [
        {
            "text": point.payload["text"],
            "page": point.payload.get("page", 1),
        }
        for point in results.points
    ]

def delete_paper_vectors(paper_id: str):
    client.delete(
        collection_name=COLLECTION,
        points_selector=Filter(
            must=[
                FieldCondition(
                    key="paper_id",
                    match=MatchValue(value=paper_id),
                )
            ]
        ),
    )