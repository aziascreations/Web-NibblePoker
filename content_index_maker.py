#!/bin/python

import argparse
import json
import os
import sys

# Importing YAML parser safely
try:
    import yaml
except ImportError:
    print("You need to install the 'PyYAML' module to continue !")
    sys.exit(10)

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
    print("\033[36m\033[1mUsage:\033[0m\033[36m content_index_maker.py <input_folder> <output_file>\033[39m")
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

index_data = list()

for index_entry_filename in os.listdir(input_folder):
    if index_entry_filename.startswith("_"):
        continue

    print("> Processing '{}'".format(index_entry_filename))

    # Loading the YAML data
    # See: https://github.com/yaml/pyyaml/issues/123#issuecomment-395431735
    with open(os.path.join(input_folder, index_entry_filename), 'rt', encoding='utf8') as f:
        index_entry_data = yaml.safe_load(f)

    # Checking some stuff
    if type(index_entry_data) is not dict:
        raise ValueError(f"The data for '{index_entry_filename}' isn't a dict !")

    if len(index_entry_data.keys()) < 1:
        raise ValueError(f"The '{index_entry_filename}' file is empty !")

    # Fixing the ID
    _id_tmp = list(index_entry_data.keys())[0]
    index_entry_data[_id_tmp]["id"] = _id_tmp

    # Un-nesting the data
    index_entry_data = index_entry_data[_id_tmp]

    # Joining the preamble's lines
    if "preamble" not in index_entry_data.keys():
        raise ValueError(f"The 'preamble' field is missing from ''{index_entry_filename}' !")

    if type(index_entry_data["preamble"]) is not dict:
        raise ValueError(f"The 'preamble' field for '{index_entry_filename}' isn't a dict !")

    for preamble_lang_key in index_entry_data["preamble"].keys():
        if type(index_entry_data["preamble"][preamble_lang_key]) is list:
            index_entry_data["preamble"][preamble_lang_key] = "<br>".join(index_entry_data["preamble"][preamble_lang_key])

    # Saving the data
    index_data.append(index_entry_data)

try:
    os.remove(output_file)
except IOError:
    pass

with open(output_file, "wb") as f:
    f.write(json.dumps(index_data, separators=(',', ':'), ensure_ascii=False).encode("utf-8"))
