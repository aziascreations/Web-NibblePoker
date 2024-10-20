from .l10n.utils import ALLOWED_LANGS

import yaml

__SITEMAP_ENTRIES: list[str] = list()


def reload_sitemap_entries(definition_file: str) -> None:
    global __SITEMAP_ENTRIES

    __SITEMAP_ENTRIES = list()

    with open(definition_file, 'r') as f:
        raw_sitemap_entries = yaml.safe_load(f)

    for sitemap_entry in raw_sitemap_entries:
        __SITEMAP_ENTRIES.append(sitemap_entry)

        for allowed_lang in ALLOWED_LANGS:
            __SITEMAP_ENTRIES.append(("/" + allowed_lang + "/" + sitemap_entry).replace("//", "/"))


def get_sitemap_entries() -> list[str]:
    return __SITEMAP_ENTRIES
