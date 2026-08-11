from dataclasses import dataclass

from .general import ContentGeneralMetadata
from .head import ContentHeadMetadata
from .index import ContentIndexMetadata
from .opengraph import ContentOpengraphMetadata
from .twitter import ContentTwitterMetadata


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
