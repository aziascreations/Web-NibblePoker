
def flatten_dict(d, parent_key='', separator='.'):
    items = []
    for key, value in d.items():
        new_key = f"{parent_key}{separator}{key}" if parent_key else str(key)
        if isinstance(value, dict):
            items.extend(flatten_dict(value, new_key, separator).items())
        else:
            items.append((new_key, value))
    return dict(items)
