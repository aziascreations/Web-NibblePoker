from typing import Optional


def url_set_lang(url: str, new_lang: Optional[str], possible_langs: list[str]) -> str:
    """
    Changes the lang prefix in the given URL, or removes it.
    :param url: URL to manipulate
    :param new_lang: New lang prefix, removes it if `None`
    :param possible_langs: Possible lang prefixes used to remove any other ones present.
    :return: The new URL with the lang prefix, or none.
    """
    for possible_lang in possible_langs:
        url = url.replace(f"/{possible_lang}/", "/")

    if new_lang is not None:
        url = "/" + new_lang + url

    return url.replace("//", "/")


#def l10n_url_abs(url: str, raw_lang: Optional[str] = None) -> str:
#    if raw_lang is None:
#        return f"/{url}".replace("//", "/")
#    else:
#        return f"/{raw_lang}/{url}".replace("//", "/")
