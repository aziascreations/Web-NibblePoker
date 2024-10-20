from flask import render_template


def render_button(inner_html: str, disabled: bool = False) -> str:
    return render_template(
        "elements/button.jinja",
        button_inner_html=inner_html,
        button_disabled=disabled,
        button_extra_classes=""
    )
