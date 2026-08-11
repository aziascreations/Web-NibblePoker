from dataclasses import dataclass, field

from .definition import ContentResourceDefinition


@dataclass
class ContentResourceInfo:
    scripts: list[ContentResourceDefinition] = field(default_factory=list)
    stylesheets: list[ContentResourceDefinition] = field(default_factory=list)

    def __post_init__(self):
        self.scripts: list[str]
        self.stylesheets: list[str]

        self.scripts = [ContentResourceDefinition(x) for x in self.scripts]
        self.stylesheets = [ContentResourceDefinition(x) for x in self.stylesheets]

        self.scripts: list[ContentResourceDefinition]
        self.stylesheets: list[ContentResourceDefinition]
