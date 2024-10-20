from dataclasses import dataclass

from .metadata import ContentMetadata


@dataclass
class ContentProject:
    id: str
    metadata: ContentMetadata
