from dataclasses import dataclass, field
from typing import Optional

from locked_dict.locked_dict import LockedDict


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
    tags: list[str] = field(default_factory=list)
    languages: list[str] = field(default_factory=list)


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


@dataclass
class ContentResource:
    scripts: list[str] = field(default_factory=list)
    stylesheets: list[str] = field(default_factory=list)


@dataclass
class ContentApplet:
    id: str
    resources: ContentResource

    def __post_init__(self):
        self.resources: dict
        self.resources = ContentResource(**self.resources)


@dataclass
class ContentTool:
    # NOTE: could extend `ContentProject`
    id: str
    applet_id: str
    metadata: ContentMetadata

    def __post_init__(self):
        self.metadata: dict
        self.metadata = ContentMetadata(**self.metadata)


@dataclass
class ContentProject:
    id: str
    metadata: ContentMetadata

    def __post_init__(self):
        self.metadata: dict
        self.metadata = ContentMetadata(**self.metadata)


@dataclass
class ContentRoot:
    applets: LockedDict[str, ContentApplet] = field(default_factory=LockedDict)
    # articles: list[Con] = field(default_factory=list)
    projects: LockedDict[str, ContentProject] = field(default_factory=LockedDict)
    tools: LockedDict[str, ContentTool] = field(default_factory=LockedDict)
    projects_languages: list[str] = field(default_factory=list)
