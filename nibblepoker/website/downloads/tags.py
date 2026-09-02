from dataclasses import dataclass


@dataclass
class Tag:
    lang_key: str
    lang_domain: str
    keywords: list[str]

    def matches(self, text: str) -> bool:
        for keyword in self.keywords:
            for segment_divider in ['.', '-', "_"]:
                if f"{segment_divider}{keyword}" in text:
                    return True
                if f"{keyword}{segment_divider}" in text:
                    return True
        return False


TAG_GROUPS: dict[str, list[Tag]] = {
    "arch": [
        Tag("arch.x64", "commons", ["x64", "amd64"]),
        Tag("arch.x86", "commons", ["x86", "i386"]),
        Tag("arch.arm64", "commons", ["arm64"]),
    ],
    "win32crt": [
        Tag("win32crt.msvcrt", "commons", ["msvcrt"]),
        Tag("win32crt.ucrt", "commons", ["ucrt"]),
    ],
}

#"lang": {
#    "en":           ["english"],
#    "fr":           ["french"],
#    "multilingual": [],# empty = matches anything not matched above
#},
