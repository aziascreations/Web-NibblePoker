from typing import Optional

from flask import render_template


def render_heading(inner_html: str, level: int = 1, icon: Optional[str] = None, right_html: Optional[str] = None,
                   anchor_id: Optional[str] = None, background_class: str = "bkgd-grid") -> str:
    return render_template(
        "elements/heading.jinja",
        heading_inner_html=inner_html,
        heading_level=level + 1,
        heading_icon=icon,
        heading_right_html=right_html,
        heading_anchor_id=anchor_id,
        heading_background_class=background_class,
    )


def render_h1(inner_html: str, icon: Optional[str] = None, right_html: Optional[str] = None,
              anchor_id: Optional[str] = None, background_class: str = "bkgd-grid") -> str:
    return render_heading(
        inner_html, 1, icon, right_html, anchor_id, background_class
    )


def render_h2(inner_html: str, icon: Optional[str] = None, right_html: Optional[str] = None,
              anchor_id: Optional[str] = None, background_class: str = "bkgd-grid") -> str:
    return render_heading(
        inner_html, 2, icon, right_html, anchor_id, background_class
    )


def render_h3(inner_html: str, icon: Optional[str] = None, right_html: Optional[str] = None,
              anchor_id: Optional[str] = None, background_class: str = "bkgd-grid") -> str:
    return render_heading(
        inner_html, 3, icon, right_html, anchor_id, background_class
    )


def render_h4(inner_html: str, icon: Optional[str] = None, right_html: Optional[str] = None,
              anchor_id: Optional[str] = None, background_class: str = "bkgd-grid") -> str:
    return render_heading(
        inner_html, 4, icon, right_html, anchor_id, background_class
    )

