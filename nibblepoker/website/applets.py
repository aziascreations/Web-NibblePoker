from dataclasses import dataclass, field
from typing import Optional

from nibblepoker.objects.content.applet import ContentApplet
from nibblepoker.objects.content.resource.definition import ContentResourceDefinition


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


def resolve_resource_url(applet_id: str, resource: ContentResourceDefinition) -> str:
    """Turns a `ContentResourceDefinition` declared on an applet's `resources` into a servable URL."""
    if resource.is_remote():
        return resource.raw_uri
    if resource.is_applet():
        return f"/resources/NibblePoker/applets/{applet_id}/{resource.get_clean_path()}"
    raise ValueError(
        f"Unsupported resource type '{resource.resource_type}' for '{resource.raw_uri}' "
        f"on applet '{applet_id}'."
    )


@dataclass
class RequiredResources:
    """Collects the scripts/stylesheets needed by a single page render, deduplicated by URL.

    A fresh instance must be created for every page render and injected into the Jinja context
    as the `required_resources` global (see `prerender.py`). This lets 'elements/applet.jinja' be
    included any number of times on the same page -- the same applet twice, or several different
    applets, e.g. in a long article -- while each resource is only ever required once, however
    many times it's included.

    This class only tracks *what* a page needs, not *how* it gets delivered: the base templates
    turn `get_scripts()`/`get_stylesheets()` into actual <script>/<link> tags for regular pages.
    Standalone pages don't consume this yet; they'll need to inline these resources directly into
    the DOM instead of linking to them, which can reuse the same deduplicated list.
    """
    scripts: list[str] = field(default_factory=list)
    stylesheets: list[str] = field(default_factory=list)

    def require_applet(self, applet_id: str, applet_data: ContentApplet) -> None:
        for script in applet_data.resources.scripts:
            # A `standalone://` resource only makes sense once standalone pages inline it
            # themselves; it's not something this (non-standalone) registry can link to.
            if script.is_standalone():
                continue
            self._require(self.scripts, resolve_resource_url(applet_id, script))
        for stylesheet in applet_data.resources.stylesheets:
            if stylesheet.is_standalone():
                continue
            self._require(self.stylesheets, resolve_resource_url(applet_id, stylesheet))

    @staticmethod
    def _require(bucket: list[str], url: str) -> None:
        if url not in bucket:
            bucket.append(url)

    def get_scripts(self) -> list[str]:
        return self.scripts

    def get_stylesheets(self) -> list[str]:
        return self.stylesheets
