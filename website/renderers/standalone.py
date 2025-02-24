
def get_standalone_common_headers() -> str:
    _html = ""
    with open("./static/resources/Standalone/nibblepoker.min.css", encoding='utf-8') as f:
        _html += "<style>" + f.read() + "</style>"
    return _html
