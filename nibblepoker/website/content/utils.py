
def sanitize_input_tags(input_tags: str) -> list[str]:
    tags: list[str] = input_tags.split(";")
    for tag in tags:
        if not tag.isalnum() or len(tag) == 0:
            raise ValueError(f"Non-alphanumeric or empty tag was given !")
    return tags
