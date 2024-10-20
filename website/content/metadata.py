from dataclasses import dataclass, field
from typing import Optional


@dataclass
class ContentHeadMetadata:
    title_key: str
    description_key: str


@dataclass
class ContentOpengraphMetadata:
    title_key: str
    description_key: str
    type: Optional[str] = field(default=None)
    url: Optional[str] = field(default=None)
    image_url: Optional[str] = field(default=None)
    image_type: Optional[str] = field(default=None)


@dataclass
class ContentTwitterMetadata:
    title_key: str
    description_key: str


@dataclass
class ContentIndexMetadata:
    priority: int
    enable: bool
    title_key: str
    preamble_key: str
    image_alt_key: str
    image_url: str = field(default="/resources/NibblePoker/images/placeholder.png")


@dataclass
class ContentGeneralMetadata:
    icon: str
    title_key: str
    subtitle_key: str
    tags: list[str]


@dataclass
class ContentMetadata:
    head: ContentHeadMetadata
    opengraph: ContentOpengraphMetadata
    twitter: ContentTwitterMetadata
    index: ContentIndexMetadata
    general: ContentGeneralMetadata

    def __post_init__(self):
        self.head: dict
        self.head = ContentHeadMetadata(**self.head)

        self.opengraph: dict
        self.opengraph = ContentOpengraphMetadata(**self.opengraph)

        self.twitter: dict
        self.twitter = ContentTwitterMetadata(**self.twitter)

        self.index: dict
        self.index = ContentIndexMetadata(**self.index)

        self.general: dict
        self.general = ContentGeneralMetadata(**self.general)
