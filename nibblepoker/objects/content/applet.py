from dataclasses import dataclass, field

from .resource.info import ContentResourceInfo


@dataclass
class ContentApplet:
    id: str
    resources: ContentResourceInfo

    default_config: dict[str, str|bool|int|float] = field(default_factory=dict)

    def __post_init__(self):
        self.resources: dict
        self.resources = ContentResourceInfo(**self.resources)
        self.resources: ContentResourceInfo
        # print(self.resources)
