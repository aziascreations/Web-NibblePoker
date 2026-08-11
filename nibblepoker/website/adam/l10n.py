import json
import os.path
from pathlib import Path

import yaml

from ...l10n.localizer import Localizer


DEFAULT_LANG = "en"
ALLOWED_LANGS = ["en", "fr"]


def load_strings(strings_root: str) -> Localizer:
    localizer = Localizer(DEFAULT_LANG, ALLOWED_LANGS)

    for allowed_lang in ALLOWED_LANGS:
        print(f"Adding lang '{allowed_lang}'...")
        localizer.add_lang(allowed_lang)

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
                localizer.add_domain(
                    lang_dir,
                    domain_key,
                    json.loads(open(lang_domain_path, "rb").read().decode("utf-8"))
                )

            if lang_domain.endswith(".yml"):
                #print(f"Loading YAML lang data from '{lang_domain_path}'...")
                localizer.add_domain(
                    lang_dir,
                    domain_key,
                    yaml.safe_load(open(lang_domain_path, "rb").read().decode("utf-8"))
                )

    return localizer