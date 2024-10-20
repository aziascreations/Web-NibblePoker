from flask import render_template


def render_splide(inner_html_panes: list[str]) -> str:
    return render_template(
        "elements/splide.jinja",
        splide_inner_html_panes=inner_html_panes,
    )
