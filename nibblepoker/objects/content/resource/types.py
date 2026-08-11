from enum import Enum


class ContentResourceType(Enum):
    UNKNOWN = []
    REMOTE = ["http", "https"]
    APPLET = ["applet"]
    STANDALONE = ["standalone", "stand"]
