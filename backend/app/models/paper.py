from dataclasses import dataclass, field


@dataclass
class Paper:
    title: str = ""
    authors: list[str] = field(default_factory=list)
    raw_text: str = ""
    metadata: dict = field(default_factory=dict)
    num_pages: int = 0

    sections: dict[str, str] = field(default_factory=dict)
    chunks: list[str] = field(default_factory=list)