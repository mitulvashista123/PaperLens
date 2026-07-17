import re


def normalize_whitespace(text: str) -> str:
    # Replace multiple spaces/tabs with a single space
    text = re.sub(r"[ \t]+", " ", text)

    # Collapse 3+ newlines into 2
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


def remove_page_numbers(text: str) -> str:
    # Remove lines that contain only digits (page numbers)
    return re.sub(r"(?m)^\d+\s*$\n?", "", text)


def clean_text(text: str) -> str:
    text = normalize_whitespace(text)
    text = remove_page_numbers(text)
    return text