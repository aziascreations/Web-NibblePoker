from dataclasses import dataclass, field


@dataclass
class ContentIndexMetadata:
    priority: int
    enable: bool
    title_key: str
    preamble_key: str
    image_alt_key: str
    image_url: str = field(default="/resources/NibblePoker/images/placeholder.png")
