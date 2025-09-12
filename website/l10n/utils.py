import json
import os.path
from pathlib import Path
from typing import Optional

import yaml

from .localizer import Localizer

DEFAULT_LANG = "en"
ALLOWED_LANGS = ["en", "fr"]

L10N = Localizer(DEFAULT_LANG, ALLOWED_LANGS)


def reload_strings(strings_root: str) -> None:
    global L10N

    for allowed_lang in ALLOWED_LANGS:
        print(f"Adding lang '{allowed_lang}'...")
        L10N.add_lang(allowed_lang)

    for lang_dir in os.listdir(strings_root):
        lang_dir_path = os.path.join(strings_root, lang_dir)

        if not os.path.isdir(lang_dir_path):
            print(f"Ignoring lang non-folder '{lang_dir}'...")
            continue

        if lang_dir not in ALLOWED_LANGS:
            print(f"Ignoring lang folder '{lang_dir}'...")
            continue

        for lang_domain in os.listdir(os.path.join(lang_dir_path)):
            if lang_domain.startswith("_"):
                continue

            lang_domain_path = os.path.join(os.getcwd(), strings_root, lang_dir, lang_domain)

            if not os.path.isfile(lang_domain_path):
                continue

            domain_key = str(Path(lang_domain).with_suffix(''))

            if lang_domain.endswith(".json"):
                #print(f"Loading JSON lang data from '{lang_domain_path}'...")
                L10N.add_domain(
                    lang_dir,
                    domain_key,
                    json.loads(open(lang_domain_path, "rb").read().decode("utf-8"))
                )

            if lang_domain.endswith(".yml"):
                #print(f"Loading YAML lang data from '{lang_domain_path}'...")
                L10N.add_domain(
                    lang_dir,
                    domain_key,
                    yaml.safe_load(open(lang_domain_path, "rb").read().decode("utf-8"))
                )


def localize(strings_key: str, domain: str, language: str, args: list[str] = None) -> str:
    global L10N
    # print(f"l10n({strings_key}, {domain}, {language})")
    return L10N.localize(language, domain, strings_key, args)


def get_user_lang(url_lang: Optional[str], header_langs: Optional[str], simplify_entries: bool = True) -> str:
    if url_lang is not None:
        return url_lang

    if header_langs is None:
        return DEFAULT_LANG

    processed_header_langs: list[tuple[str, float]] = list()
    processed_header_langs.append((DEFAULT_LANG, 0.01))

    for header_lang in header_langs.split(","):
        header_lang_parts: list[str] = header_lang.split(";")

        # Modifying entries without a "q=<float>" part to have a '0.1' value
        if len(header_lang_parts) == 1:
            header_lang_parts.append("0.1")

        if len(header_lang_parts) != 2:
            continue

        header_lang_parts: list[str, float]

        # Simplifying complex entries from "en-US" to "en".
        # We'll ignore duplicates since it won't matter after sorting.
        if simplify_entries and "-" in header_lang_parts[0]:
            header_lang_parts[0] = header_lang_parts[0].split("-")[0]

        # Only allowing supported languages
        if header_lang_parts[0] not in ALLOWED_LANGS:
            continue

        # Parsing the language's weight
        try:
            header_lang_parts[1] = float(header_lang_parts[1].replace("q=", ""))
        except ValueError:
            continue

        processed_header_langs.append((header_lang_parts[0], header_lang_parts[1], ))

    # Returning the preferred language
    return max(processed_header_langs, key=lambda x: x[1])[0]


def l10n_url_abs(url: str, raw_lang: Optional[str] = None) -> str:
    if raw_lang is None:
        return f"/{url}".replace("//", "/")
    else:
        return f"/{raw_lang}/{url}".replace("//", "/")


def l10n_url_switch(url: str, new_lang: Optional[str] = None) -> str:
    for allowed_lang in ALLOWED_LANGS:
        url = url.replace(f"/{allowed_lang}/", "/")

    if new_lang is not None:
        url = "/" + new_lang + url

    return url.replace("//", "/")
