
__CUSTOM_TAGS = {
    "default" : {
        "<np-content-spacer>": "<div class='content-spacer'>",
        "</np-content-spacer>": "</div>",
        "<np-section>": "<section class='mt-l mt-0-if-first'>",
        "</np-section>": "</section>",
    }
}


def resolve_custom_tags(html: str, theme="default"):
    if theme not in __CUSTOM_TAGS:
        return html

    for k, v in __CUSTOM_TAGS[theme].items():
        html = html.replace(k, v)

    return html
