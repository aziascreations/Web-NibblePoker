from typing import Optional


def consolidate_applet_config(defaults: dict[str, str|bool|int|float],
                              overrides: Optional[dict[str, str|bool|int|float]]
                              ) -> dict[str, str|bool|int|float]:
    if overrides is None:
        return defaults

    consolidated_config = dict()

    for k, v in defaults.items():
        if k in overrides:
            consolidated_config[k] = overrides[k]
        else :
            consolidated_config[k] = v

    return consolidated_config
