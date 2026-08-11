import json
import os
from dataclasses import asdict, dataclass
from typing import Any, Optional
from warnings import deprecated

import yaml
from bs4 import BeautifulSoup


__ALLOWED_EXTENSIONS = {'yml', 'yaml'}


@dataclass
class WebBrandData:
    id: str
    name: str
    key: Optional[Any]


def _load_brand_file(file_path: str, ignore_errors: bool = False) -> list[WebBrandData]:
    loaded_brands = list()

    with open(file_path, 'r') as f:
        if file_path.split(".")[-1] in __ALLOWED_EXTENSIONS:
            raw_brand_data = yaml.safe_load(f)["brands"]
        else:
            return loaded_brands

    for raw_brand_entry in raw_brand_data:
        # noinspection PyBroadException
        try:
            loaded_brands.append(WebBrandData(**raw_brand_entry))
        except Exception:
            if not ignore_errors:
                raise

    return loaded_brands


def _load_brands_folder(folder_path, ignore_errors: bool = False) -> dict[str, WebBrandData]:
    brands = dict()

    for brand_file in os.listdir(folder_path):
        if brand_file.split(".")[-1] not in __ALLOWED_EXTENSIONS:
            continue

        _brand_list = _load_brand_file(os.path.join(folder_path, brand_file), ignore_errors=ignore_errors)

        for _brand in _brand_list:
            brands[_brand.id] = _brand

    return brands


class WebBrandRepository:

    __brands_data: dict[str, WebBrandData]

    def __init__(self):
        self.__brands_data = dict()

    def load_file(self, file_path: str, ignore_errors: bool = False, overwrite: bool = False):
        for brand in _load_brand_file(file_path=file_path, ignore_errors=ignore_errors):
            if (brand.id in self.__brands_data and overwrite) or (brand.id not in self.__brands_data):
                self.__brands_data[brand.id] = brand

    def load_folder(self, folder_path, ignore_errors: bool = False, overwrite: bool = False):
        for brand in _load_brands_folder(folder_path=folder_path, ignore_errors=ignore_errors).values():
            if (brand.id in self.__brands_data and overwrite) or (brand.id not in self.__brands_data):
                self.__brands_data[brand.id] = brand

    def get_all_brands(self) -> dict[str, WebBrandData]:
        return self.__brands_data

    @deprecated("XML is not supported in the FCGI workers, this has no real use.")
    def to_xml(self) -> str:
        soup = BeautifulSoup("", 'xml')
        e_brands = soup.new_tag('Brands')
        for brand in self.__brands_data.values():
            e_brand = soup.new_tag('Brand')
            e_brand.append(soup.new_tag('Id', string=brand.id))
            e_brand.append(soup.new_tag('Name', string=brand.name))
            e_brand.append(soup.new_tag('Key', string=brand.key))
            e_brands.append(e_brand)
        soup.append(e_brands)
        return str(soup)

    @deprecated("JSON is not supported in the FCGI workers, it keeps leaking memory...")
    def to_json(self) -> str:
        return json.dumps({k: asdict(self.__brands_data[k]) for k in self.__brands_data.keys()})

    def to_ini(self) -> str:
        ini_data = ""

        for x in self.__brands_data.values():
            ini_data += f"[{x.id}]\n"
            ini_data += f"Id={x.id}\n"
            ini_data += f"Name={x.name}\n"
            ini_data += f"Key={x.key}\n"
            ini_data += "\n"

        return ini_data
