from dataclasses import dataclass, field
from typing import Optional, List

import yaml


@dataclass
class ContributorConfig:
    root_image_path: str = "/"
    root_sound_path: str = "/"


@dataclass
class ContributorEntry:
    name: str
    image: str
    image_hover: Optional[str] = None
    sound_entry: Optional[str] = None
    sound_hover: Optional[str] = None
    sound_exit: Optional[str] = None
    achievements: list[str] = field(default_factory=list)


@dataclass
class ContributorsIndex:
    config: ContributorConfig = field(default_factory=ContributorConfig)
    regular: List[ContributorEntry] = field(default_factory=list)
    spiritual: List[ContributorEntry] = field(default_factory=list)

    def __post_init__(self):
        contributor_entry: dict

        if self.regular is None:
            self.regular = list()
        else:
            self.regular = [ContributorEntry(**contributor_entry) for contributor_entry in self.regular]

        if self.spiritual is None:
            self.spiritual = list()
        else:
            self.spiritual = [ContributorEntry(**contributor_entry) for contributor_entry in self.spiritual]


__CONTRIBUTORS_DATA: ContributorsIndex = ContributorsIndex()


def reload_contributors_data(definition_file: str) -> None:
    global __CONTRIBUTORS_DATA

    with open(definition_file, 'r') as f:
        __CONTRIBUTORS_DATA = ContributorsIndex(**yaml.safe_load(f))


def get_contributors_data() -> ContributorsIndex:
    return __CONTRIBUTORS_DATA
