#!/bin/python

import argparse
from datetime import datetime
import json
import os
import sys

# Including nicer-looking print function if possible.
try:
    from rich import print
except ImportError:
    pass

# Preparing and parsing launch arguments
parser = argparse.ArgumentParser()
parser.add_argument("input", help="Input folder where the strings are located.")
parser.add_argument("output", help="Output file where the compiled strings will be saved.")


# Fixing some issues with "argparse"
def argparse_error(message):
    raise argparse.ArgumentError(None, message)


# Parsing launch options
parser.error = argparse_error
try:
    args = parser.parse_args()
except argparse.ArgumentError as err:
    print(f"\033[31m\033[1mError:\033[0m\033[31m {err.message.capitalize()}\033[39m")
    print("\033[36m\033[1mUsage:\033[0m\033[36m compile_strings.py <input_folder> <output_file>\033[39m")
    sys.exit(1)

# Checking the given options are valid
if not (os.path.exists(args.input) and os.path.isdir(args.input)):
    print(f"\033[31m\033[1mError:\033[0m\033[31m The given input directory '{args.input}' doesn't exist or is a file !\033[39m")
    sys.exit(2)

if os.path.isdir(args.output):
    print(f"\033[31m\033[1mError:\033[0m\033[31m The given output '{args.output}' is a directory !\033[39m")
    sys.exit(3)

# Starting the process
print(f"Compiling '{args.input}' to '{args.output}'...")
input_folder = os.path.abspath(args.input)
output_file = os.path.abspath(args.output)

lang_data = dict()
lang_data["_compile_date"] = datetime.utcnow().isoformat() + "Z"

for main_dir_entry in os.listdir(input_folder):
    if main_dir_entry.startswith("_"):
        continue

    print("> Processing '{}'".format(main_dir_entry))

    if not os.path.isdir(os.path.join(input_folder, main_dir_entry)):
        continue

    lang_data[main_dir_entry] = dict()

    for sub_dir_entry in os.listdir(os.path.join(input_folder, main_dir_entry)):
        print("-> Checking '{}/{}'".format(main_dir_entry, sub_dir_entry))
        if not sub_dir_entry.endswith(".json"):
            continue

        with open(os.path.join(input_folder, main_dir_entry, sub_dir_entry), "rb") as f:
            input_lang_data: dict = json.loads(f.read().decode("utf-8"))

            for lang_record_key in input_lang_data.keys():
                lang_record_key: str
                if lang_record_key.startswith("_"):
                    continue

                lang_data[main_dir_entry][lang_record_key] = input_lang_data[lang_record_key]

try:
    os.remove(output_file)
except IOError:
    pass

with open(output_file, "wb") as f:
    f.write(json.dumps(lang_data, separators=(',', ':')).encode("utf-8"))
