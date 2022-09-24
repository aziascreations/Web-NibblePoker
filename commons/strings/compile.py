#!/bin/python

from datetime import datetime
import json
import os

print("Compiling lang files...")

os.chdir(os.path.dirname(os.path.realpath(__file__)))

lang_data = dict()
lang_data["_compile_date"] = datetime.utcnow().isoformat() + "Z"


for main_dir_entry in os.listdir("./"):
    print("Checking ./{}".format(main_dir_entry))

    if not os.path.isdir(os.path.join("./", main_dir_entry)):
        continue
    
    lang_data[main_dir_entry] = dict()
    
    for sub_dir_entry in os.listdir(os.path.join("./", main_dir_entry)):
        print("Checking ./{}/{}".format(main_dir_entry, sub_dir_entry))
        if not sub_dir_entry.endswith(".json"):
            continue
        
        with open(os.path.join("./", main_dir_entry, sub_dir_entry), "rb") as f:
            input_lang_data: dict = json.loads(f.read().decode("utf-8"))
            
            for lang_record_key in input_lang_data.keys():
                lang_record_key: str
                if lang_record_key.startswith("_"):
                    continue
                
                lang_data[main_dir_entry][lang_record_key] = input_lang_data[lang_record_key]

try:
    os.remove("../strings.json")
except IOError:
    pass

with open("../strings.json", "wb") as f:
    f.write(json.dumps(lang_data, separators=(',', ':')).encode("utf-8"))
