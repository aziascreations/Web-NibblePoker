# This script is only used for internal testing
# NEVER PUBLICLY HOST IT !!!

import configparser
from pathlib import Path
from typing import Optional

from flask import Flask, request, send_from_directory, abort

app = Flask(__name__)

DEFAULT_LANG = "en"
ALLOWED_LANGS = ["en", "fr"]
TLD = "lu"  # only "lu" renders are used, "com" ones are ignored

RENDERS_DIR = Path("static/renders")
RESOURCES_DIR = Path("static/resources")
INI_PATH = Path("data/pages.ini")  # adjust to your actual path


def get_user_lang(url_lang: Optional[str], header_langs: Optional[str], simplify_entries: bool = True) -> str:
    if url_lang is not None:
        return url_lang

    if header_langs is None:
        return DEFAULT_LANG

    processed_header_langs: list[tuple[str, float]] = [(DEFAULT_LANG, 0.01)]

    for header_lang in header_langs.split(","):
        parts = header_lang.split(";")

        if len(parts) == 1:
            parts.append("q=0.1")

        if len(parts) != 2:
            continue

        lang = parts[0].strip()
        if simplify_entries and "-" in lang:
            lang = lang.split("-")[0]

        if lang not in ALLOWED_LANGS:
            continue

        try:
            weight = float(parts[1].replace("q=", "").strip())
        except ValueError:
            continue

        processed_header_langs.append((lang, weight))

    return max(processed_header_langs, key=lambda x: x[1])[0]


# --- Load the ini and build a routing table -------------------------------

class Page:
    def __init__(self, section: configparser.SectionProxy):
        self.id = section["Id"]
        self.file_base_name = section["FileBaseName"]
        self.served_paths = section["ServedPaths"].split("|")
        self.localizable = section.getboolean("Localizable")
        self.standalone = section.getboolean("Standalone")
        self.brandable = section.getboolean("Brandable")


# route_table: normalized_path -> (Page, url_lang_or_None)
route_table: dict[str, tuple[Page, Optional[str]]] = {}


def normalize(path: str) -> str:
    if not path.startswith("/"):
        path = "/" + path
    if len(path) > 1 and path.endswith("/"):
        path = path[:-1]
    return path


def load_pages(ini_path: Path) -> list[Page]:
    parser = configparser.ConfigParser()
    parser.read(ini_path)

    pages = [Page(parser[section]) for section in parser.sections()]

    for page in pages:
        for served_path in page.served_paths:
            served_path = served_path.strip()
            if not served_path:
                continue

            url_lang = None
            for lang in ALLOWED_LANGS:
                prefix = f"/{lang}/"
                prefix_bare = f"/{lang}"
                if served_path.startswith(prefix) or served_path == prefix_bare:
                    url_lang = lang
                    break

            route_table[normalize(served_path)] = (page, url_lang)

    return pages


load_pages(INI_PATH)


def resolve_brand(page: Page) -> str:
    if not page.brandable:
        return "base"
    brand = request.args.get("brand", "base")
    return brand  # trust caller; render_file() will 404 if the brand doesn't exist


def render_file(page: Page, lang: str, explicit: bool, brand: str) -> Path:
    expl_impl = "expl" if explicit else "impl"
    filename = f"{TLD}.{page.id}.{brand}.{expl_impl}.{lang}.html"
    return RENDERS_DIR / filename


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_page(path: str):
    lookup_path = normalize("/" + path)

    entry = route_table.get(lookup_path)
    if entry is None:
        abort(404)

    page, url_lang = entry
    explicit = url_lang is not None

    lang = get_user_lang(url_lang, request.headers.get("Accept-Language"))
    brand = resolve_brand(page)

    file_path = render_file(page, lang, explicit, brand)
    if not file_path.is_file():
        abort(404)

    return send_from_directory(file_path.parent, file_path.name)


@app.route("/resources/<path:path>")
def serve_resource(path: str):
    return send_from_directory(RESOURCES_DIR, path)


if __name__ == "__main__":
    app.run(debug=True)
