from dataclasses import dataclass, field
from typing import Optional

import yaml


@dataclass
class SidebarEntry:
    title_key: str
    icon: str
    active_id: str
    abs_href: Optional[str] = field(default=None)
    raw_href: Optional[str] = field(default=None)


__SIDEBAR_ENTRIES: list[Optional[SidebarEntry]] = list()


def reload_sidebar_entries(definition_file: str) -> None:
    global __SIDEBAR_ENTRIES

    __SIDEBAR_ENTRIES = list()

    with open(definition_file, 'r') as f:
        raw_sidebar_entries = yaml.safe_load(f)

    for raw_sidebar_entry in raw_sidebar_entries:
        try:
            __SIDEBAR_ENTRIES.append(SidebarEntry(**raw_sidebar_entry))
        except Exception:
            __SIDEBAR_ENTRIES.append(None)


def get_sidebar_entries() -> list[Optional[SidebarEntry]]:
    return __SIDEBAR_ENTRIES
