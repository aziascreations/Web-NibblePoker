import json
import os
from dataclasses import asdict, dataclass
from warnings import deprecated

import yaml
from bs4 import BeautifulSoup


__ALLOWED_EXTENSIONS = {'yml', 'yaml'}


@dataclass
class StaticPageData:
    id: str
    output_base_name: str
    template_path: str
    served_paths: list[str]
    canonical_path: str
    localizable: bool
    standalone: bool
    brandable: bool
    release: bool

    def expand_served_paths(self, langs: list[str]):
        new_served_paths = list()

        for served_path in self.served_paths:
            new_served_paths.append(served_path.replace("//", "/"))
            for lang in langs:
                new_served_paths.append(f"/{lang}/{served_path}".replace("//", "/"))

        self.served_paths = new_served_paths


def _load_page_def_file(file_path: str, ignore_errors: bool = False) -> list[StaticPageData]:
    loaded_page_defs = list()

    with open(file_path, 'r') as f:
        if file_path.split(".")[-1] in __ALLOWED_EXTENSIONS:
            raw_page_def_data = yaml.safe_load(f)["pages"]
        else:
            return loaded_page_defs

    for raw_page_def_entry in raw_page_def_data:
        # noinspection PyBroadException
        try:
            loaded_page_defs.append(StaticPageData(**raw_page_def_entry))
        except Exception:
            if not ignore_errors:
                raise

    return loaded_page_defs


def _load_page_def_folder(folder_path, ignore_errors: bool = False) -> dict[str, StaticPageData]:
    page_defs = dict()

    for page_def_file in os.listdir(folder_path):
        if page_def_file.split(".")[-1] not in __ALLOWED_EXTENSIONS:
            continue

        _page_defs = _load_page_def_file(os.path.join(folder_path, page_def_file), ignore_errors=ignore_errors)

        for _page_def in _page_defs:
            page_defs[_page_def.id] = _page_def

    return page_defs


class StaticPageDefRepository:

    __page_def_data: dict[str, StaticPageData]

    def __init__(self):
        self.__page_def_data = dict()

    def load_file(self, file_path: str, ignore_errors: bool = False, overwrite: bool = False):
        for x in _load_page_def_file(file_path=file_path, ignore_errors=ignore_errors):
            if (x.id in self.__page_def_data and overwrite) or (x.id not in self.__page_def_data):
                self.__page_def_data[x.id] = x

    def load_folder(self, folder_path, ignore_errors: bool = False, overwrite: bool = False):
        for x in _load_page_def_folder(folder_path=folder_path, ignore_errors=ignore_errors).values():
            if (x.id in self.__page_def_data and overwrite) or (x.id not in self.__page_def_data):
                self.__page_def_data[x.id] = x

    def expand_served_paths(self, langs: list[str]):
        for k, v in self.__page_def_data.items():
            v.expand_served_paths(langs=langs)

    def get_all_page_defs(self) -> dict[str, StaticPageData]:
        return self.__page_def_data

    @deprecated("XML is not supported in the FCGI workers, this has no real use.")
    def to_xml(self) -> str:
        soup = BeautifulSoup("", 'xml')
        e_pages = soup.new_tag('StaticPages')
        for x in self.__page_def_data.values():
            e_page = soup.new_tag('StaticPage')

            e_page.append(soup.new_tag('Id', string=x.id))
            e_page.append(soup.new_tag('FileBaseName', string=x.output_base_name))

            e_page_paths = soup.new_tag('ServedPaths')
            for served_path in x.served_paths:
                e_page_paths.append(soup.new_tag('ServedPath', string=served_path))
            e_page.append(e_page_paths)

            e_page.append(soup.new_tag('Localizable', string=str(x.localizable)))
            e_page.append(soup.new_tag('Standalone', string=str(x.standalone)))
            e_page.append(soup.new_tag('Brandable', string=str(x.brandable)))

            e_pages.append(e_page)
        soup.append(e_pages)
        return str(soup)

    @deprecated("JSON is not supported in the FCGI workers, it keeps leaking memory...")
    def to_json(self) -> str:
        return json.dumps({k: asdict(self.__page_def_data[k]) for k in self.__page_def_data.keys()})

    def to_ini(self) -> str:
        ini_data = ""
        for x in self.__page_def_data.values():
            ini_data += f"[{x.id}]\n"
            ini_data += f"Id={x.id}\n"
            ini_data += f"FileBaseName={x.output_base_name}\n"
            ini_data += f"ServedPaths={"|".join(x.served_paths)}\n"
            ini_data += f"Localizable={"1" if x.localizable else "0"}\n"
            ini_data += f"Standalone={"1" if x.standalone else "0"}\n"
            ini_data += f"Brandable={"1" if x.brandable else "0"}\n"
            #ini_data += f"IFrame={"1" if x.iframe else "0"}\n"
            ini_data += "\n"
        return ini_data
