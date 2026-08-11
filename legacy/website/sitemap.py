from dataclasses import dataclass

from .l10n.utils import ALLOWED_LANGS

import yaml


@dataclass
class SitemapEntry:
    lastmod: str
    priority: str
    changefreq: str = "monthly"


__SITEMAP_ENTRIES: dict[str, SitemapEntry] = dict()

__XML_SITEMAP_CACHE = None


def reload_sitemap_entries(definition_file: str) -> None:
    global __SITEMAP_ENTRIES

    __SITEMAP_ENTRIES = dict()

    with open(definition_file, 'r') as f:
        raw_sitemap_entries: dict = yaml.safe_load(f)["sitemap"]

    for allowed_lang in [""] + ALLOWED_LANGS:
        for sitemap_entry_path in raw_sitemap_entries:

            entry = SitemapEntry(**raw_sitemap_entries[sitemap_entry_path])
            if not(allowed_lang == ""):
                entry.priority = "0.0"

            __SITEMAP_ENTRIES[
                ("/" + str(allowed_lang) + "/" + str(sitemap_entry_path))
                    .replace("//", "/")
                    .replace("//", "/")
            ] = entry


def get_sitemap_entries() -> list[str]:
    return list(__SITEMAP_ENTRIES.keys())


def get_sitemap_xml(domain) -> str:
    global __XML_SITEMAP_CACHE

    if __XML_SITEMAP_CACHE is None:
        __XML_SITEMAP_CACHE = (
                """<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">""" +
                "".join([
                    f"""
    <url>
        <loc>https://{domain}{k}</loc>
        <lastmod>{v.lastmod}</lastmod>
        <priority>{v.priority}</priority>
        <changefreq>{v.changefreq}</changefreq>
    </url>"""
                    for k, v in __SITEMAP_ENTRIES.items()
                ]) +
                "\n</urlset>").replace("    <priority>0.0</priority>\n    ", "")

    return __XML_SITEMAP_CACHE

