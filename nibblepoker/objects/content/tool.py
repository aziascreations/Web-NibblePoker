from dataclasses import dataclass, field

from .metadata import ContentMetadata


@dataclass
class ContentTool:
    # NOTE: could extend `ContentProject`
    id: str
    applet_id: str
    download_base_name: str
    metadata: ContentMetadata

    applet_config: dict[str, str|bool|int|float] = field(default_factory=dict)

    def __post_init__(self):
        self.metadata: dict
        self.metadata = ContentMetadata(**self.metadata)
        self.metadata: ContentMetadata
