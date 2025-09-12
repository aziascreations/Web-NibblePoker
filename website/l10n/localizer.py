from typing import Optional

from locked_dict.locked_dict import LockedDict

from website.l10n import flatten_dict


class Localizer:
    _langs_data: LockedDict[LockedDict[str, str]]
    _default_lang: str
    _allowed_langs: list[str]

    def __init__(self, default_lang: str, allowed_langs: Optional[list[str]]):
        self._langs_data = LockedDict()
        self._default_lang = default_lang

        self._allowed_langs = allowed_langs
        if self._allowed_langs is None:
            self._allowed_langs = list()
            self._allowed_langs.append(self._default_lang)

    def add_lang(self, lang: str):
        if lang not in self._langs_data.keys():
            self._langs_data[lang] = LockedDict()

    def add_domain(self, lang: str, domain: str, domain_data: Optional[dict[str, str]], strip_prefix: bool = False):
        if domain not in self._langs_data[lang].keys():
            self._langs_data[lang][domain] = LockedDict()

        if domain_data is not None:
            domain_data = flatten_dict(domain_data)

        if strip_prefix:
            new_domain_data = dict()
            for key, value in domain_data.items():
                if key.startswith(f"{domain}."):
                    new_domain_data[key[len(f"{domain}."):]] = value
            domain_data = new_domain_data

        self._langs_data[lang][domain].update(domain_data)

    def _localize_internal(self, lang: str, domain: str, key: str, args: list[str] = None) -> Optional[str]:
        if lang not in self._allowed_langs:
            return None

        if lang not in self._langs_data.keys():
            return None

        lang_data = self._langs_data[lang]
        if domain not in lang_data.keys():
            return None

        domain_data = lang_data[domain]
        if key not in domain_data.keys():
            return None

        localized_text = domain_data[key]
        if args is not None:
            for arg_index, arg_value in enumerate(args):
                localized_text = localized_text.replace(f"%{arg_index}", arg_value)

        return localized_text

    def localize(self, lang: str, domain: str, key: str, args: list[str] = None) -> str:
        localized_string = None

        if localized_string is None:
            localized_string = self._localize_internal(lang, domain, key, args)

        if localized_string is None and lang != self._default_lang:
            localized_string = self._localize_internal(self._default_lang, domain, key, args)

        if localized_string is None:
            return domain + "." + key

        return localized_string
