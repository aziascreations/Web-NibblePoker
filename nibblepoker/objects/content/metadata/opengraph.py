from dataclasses import dataclass, field
from typing import Optional


@dataclass
class ContentOpengraphMetadata:
    title_key: str
    description_key: str
    type: Optional[str] = field(default=None)
    url: Optional[str] = field(default=None)
    image_url: Optional[str] = field(default=None)
    image_type: Optional[str] = field(default=None)
