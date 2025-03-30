from flask import render_template


def render_paragraph(inner_html: str) -> str:
    return render_template(
        "elements/paragraph.jinja",
        paragraph_inner_html=inner_html,
    )
