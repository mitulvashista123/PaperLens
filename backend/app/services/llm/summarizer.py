import json
import re

from app.services.llm.client import client, MODEL

SYSTEM_PROMPT = """
You are an expert research assistant.

Return ONLY valid JSON.

{
  "summary":"...",
  "contributions":["..."],
  "methodology":"...",
  "strengths":["..."],
  "limitations":["..."]
}
"""


def summarize(text: str):

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0.2,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": text,
            },
        ],
    )

    content = response.choices[0].message.content.strip()

    # remove markdown fences if present
    content = re.sub(
        r"^```(?:json)?|```$",
        "",
        content,
        flags=re.MULTILINE,
    ).strip()

    try:
        return json.loads(content)

    except json.JSONDecodeError:

        match = re.search(
            r"\{.*\}",
            content,
            re.DOTALL,
        )

        if match:
            return json.loads(match.group())

        raise