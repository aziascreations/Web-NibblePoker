from flask import render_template


def render_button(inner_html: str, disabled: bool = False, dom_id: str = None, extra_classes: str = "") -> str:
    return render_template(
        "elements/button.jinja",
        button_inner_html=inner_html,
        button_disabled=disabled,
        button_extra_classes=extra_classes,
        button_id=dom_id,
    )
