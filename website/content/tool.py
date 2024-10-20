from dataclasses import dataclass, field

from .metadata import ContentMetadata


@dataclass
class ContentToolData:
    scripts: list[str] = field(default_factory=list)
    stylesheets: list[str] = field(default_factory=list)


@dataclass
class ContentTool:
    id: str
    metadata: ContentMetadata
    data: ContentToolData
