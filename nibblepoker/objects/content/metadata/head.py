from dataclasses import dataclass, field
from typing import Optional


@dataclass
class ContentHeadMetadata:
    title_key: str
    description_key: str
