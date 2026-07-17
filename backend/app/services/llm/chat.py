from app.services.llm.client import client, MODEL
from app.services.rag.embedder import embed_texts
from app.services.rag.vector_store import search

SYSTEM = """
You are PaperLens.

Answer ONLY using the provided context.

Rules:

- Never use outside knowledge.
- If the answer is not in the context, reply:
  "I couldn't find that information in the paper."

- Explain clearly and concisely.
- Format the answer using Markdown.
- At the end, include:
Sources:
- Page X
- Page Y
"""


def ask(paper_id: str, question: str):
    embedding = embed_texts([question])[0]

    context = search(
        paper_id,
        embedding,
        limit=8,
    )

    context_text = "\n\n".join(
        f"[Page {chunk['page']}]\n{chunk['text']}"
        for chunk in context
    )

    prompt = f"""
Context:

{context_text}

Question:

{question}
"""

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": SYSTEM,
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
    )

    answer = response.choices[0].message.content

    sources = []

    seen = set()

    for chunk in context:
        page = chunk["page"]

        if page not in seen:
            seen.add(page)
            sources.append({"page": page})

    return {
        "answer": answer,
        "sources": sources,
    }