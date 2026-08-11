from urllib.parse import ParseResult, urlparse

from .types import ContentResourceType


class ContentResourceDefinition:
    raw_uri: str
    resource_type: ContentResourceType
    resource_uri: ParseResult

    def __init__(self, raw_uri):
        self.raw_uri = raw_uri
        self.resource_uri = urlparse(self.raw_uri)

        self.resource_type = ContentResourceType.UNKNOWN
        for content_resource_type in ContentResourceType:
            if self.resource_uri.scheme in content_resource_type.value:
                self.resource_type = content_resource_type

    def can_be_standalone(self):
        return self.resource_type in [ContentResourceType.STANDALONE, ContentResourceType.APPLET]

    def is_standalone(self):
        return self.resource_type == ContentResourceType.STANDALONE

    def is_remote(self):
        return self.resource_type == ContentResourceType.REMOTE

    def is_applet(self):
        return self.resource_type == ContentResourceType.APPLET

    def get_clean_path(self):
        return self.raw_uri.replace(f"{self.resource_uri.scheme}://", "")

    def __repr__(self):
        return (f"ContentResourceDefinition(raw_uri: {self.raw_uri}, "
                f"resource_type: {self.resource_type}, "
                f"resource_uri: {self.resource_uri})")
