import re


COMMON_SECTIONS = [
    "Abstract",
    "Introduction",
    "Related Work",
    "Background",
    "Methodology",
    "Methods",
    "Approach",
    "Experiments",
    "Evaluation",
    "Results",
    "Discussion",
    "Conclusion",
    "Limitations",
    "Future Work",
    "References",
]


def extract_sections(text: str) -> dict[str, str]:
    sections = {}

    pattern = "|".join(re.escape(section) for section in COMMON_SECTIONS)

    matches = list(re.finditer(rf"(?m)^({pattern})$", text))

    if not matches:
        return {"Full Text": text}

    for i, match in enumerate(matches):
        start = match.end()

        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)

        title = match.group(1)

        content = text[start:end].strip()

        sections[title] = content

    return sections