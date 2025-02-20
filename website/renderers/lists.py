from typing import Union

from flask import render_template


def render_list_ul(items: list[Union[str|list]]) -> str:
    return render_template(
        "elements/list-ul.jinja",
        list_items=items,
        render_list_ul=render_list_ul
    )
