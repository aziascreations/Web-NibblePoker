from dataclasses import dataclass, field


@dataclass
class ContentGeneralMetadata:
    icon: str
    title_key: str
    subtitle_key: str
    tags: list[str] = field(default_factory=list)
    languages: list[str] = field(default_factory=list)
