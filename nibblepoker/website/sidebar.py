from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Optional

import yaml


@dataclass
class SidebarEntry:
    title_key: str
    icon: str
    active_id: str
    has_new_until_utc: int
    abs_href: Optional[str] = field(default=None)
    raw_href: Optional[str] = field(default=None)

    def has_new(self) -> bool:
        return datetime.fromtimestamp(self.has_new_until_utc, tz=timezone.utc) > datetime.now(timezone.utc)


def _load_sidebar_def_file(file_path: str, ignore_errors: bool = False) -> list[SidebarEntry]:
    loaded_sidebar_defs = list()

    with open(file_path, 'r') as f:
        raw_sidebar_entries = yaml.safe_load(f)

    for raw_sidebar_entry in raw_sidebar_entries:
        # noinspection PyBroadException
        try:
            loaded_sidebar_defs.append(SidebarEntry(**raw_sidebar_entry))
        except Exception:
            if not ignore_errors:
                loaded_sidebar_defs.append(None)

    return loaded_sidebar_defs


class SidebarEntryRepository:

    __sidebar_def_data: list[SidebarEntry]

    def __init__(self) -> None:
        self.__sidebar_def_data = list()

    def load_file(self, file_path: str, ignore_errors: bool = False, clear: bool = False):
        if clear:
            self.__sidebar_def_data = list()

        for x in _load_sidebar_def_file(file_path=file_path, ignore_errors=ignore_errors):
            self.__sidebar_def_data.append(x)

    def get_all_sidebar_defs(self) -> list[SidebarEntry]:
        return self.__sidebar_def_data
