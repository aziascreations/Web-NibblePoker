from flask import render_template


def render_file_input(input_id: str, multiple: bool, accept: str = None,
                      upload_button: bool = False, clear_button: bool = False) -> str:
    return render_template(
        "elements/file-input.jinja",
        file_input_id=input_id,
        file_multiple=multiple,
        file_accept=accept,
        file_upload_button=upload_button,
        file_clear_button=clear_button,
    )
