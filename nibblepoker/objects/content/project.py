from dataclasses import dataclass

from .metadata import ContentMetadata


@dataclass
class ContentProject:
    id: str
    metadata: ContentMetadata

    def __post_init__(self):
        self.metadata: dict
        self.metadata = ContentMetadata(**self.metadata)
