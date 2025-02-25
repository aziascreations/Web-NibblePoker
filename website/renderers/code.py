import html
from typing import Optional

from flask import render_template


def render_code_block(code_lines: list[str], language: Optional[str] = None):
    _code_lines = list()

    for code_line in code_lines:
        code_line = html.escape(code_line)
        code_line = code_line.replace('\t', '&nbsp;' * 4)
        code_line = code_line.replace(' ', '&nbsp;')
        _code_lines.append(code_line)

    return render_template(
                "elements/code.jinja",
                code_lines=_code_lines,
                code_language=language,
            )
