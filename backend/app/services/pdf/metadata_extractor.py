import re

BLACKLIST = [
    "google brain",
    "google research",
    "abstract",
    "introduction",
    "background",
    "results",
    "references",
    "conclusion",
    "copyright",
    "journalistic",
    "permission",
    "arxiv",
    "provided proper attribution",
]


def infer_title(text: str) -> str:
    lines = [line.strip() for line in text.splitlines() if line.strip()]

    # Only inspect the beginning of the paper
    lines = lines[:40]

    best = ""

    for line in lines:

        lower = line.lower()

        if any(word in lower for word in BLACKLIST):
            continue

        if "@" in line:
            continue

        if len(line) < 15:
            continue

        if len(line) > 120:
            continue

        # Paper titles usually have several Title Case words
        words = line.split()

        title_words = sum(
            1
            for word in words
            if word[:1].isupper()
        )

        if title_words >= max(3, len(words) * 0.6):
            if len(line) > len(best):
                best = line

    return best


def infer_authors(text: str) -> list[str]:

    title = infer_title(text)

    lines = [line.strip() for line in text.splitlines() if line.strip()]

    authors = []

    collecting = False

    stop_words = {
        "abstract",
        "introduction",
        "background",
    }

    for line in lines:

        lower = line.lower()

        if line == title:
            collecting = True
            continue

        if not collecting:
            continue

        if lower in stop_words:
            break

        if any(word in lower for word in BLACKLIST):
            continue

        if "@" in line:
            continue

        if len(line.split()) < 2:
            continue

        clean = re.sub(r"[*†‡0-9]", "", line).strip()

        if clean and clean not in authors:
            authors.append(clean)

    return authors