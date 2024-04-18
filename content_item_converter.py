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
parser.add_argument("output", help="Output folder where the converted files  will be saved.")


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

if not (os.path.exists(args.output) and os.path.isdir(args.output)):
    print(f"\033[31m\033[1mError:\033[0m\033[31m The given output '{args.output}' is a directory !\033[39m")
    sys.exit(3)


# Starting the process
print(f"Compiling '{args.input}' to '{args.output}'...")
input_folder = os.path.abspath(args.input)
output_folder = os.path.abspath(args.output)


for item_filename in os.listdir(input_folder):
    if item_filename.startswith("_") or not (item_filename.endswith(".yml") or item_filename.endswith(".yaml")):
        continue

    print("> Processing '{}'".format(item_filename))

    with open(os.path.join(input_folder, item_filename), 'r') as f:
        item_raw_data = yaml.safe_load(f)

    # Grabbing the output ID
    output_id = list(item_raw_data.keys())[0]

    # Un-nesting the data
    item_raw_data = item_raw_data[output_id]

    # Converting content
    def process_content(content_element) -> dict:
        if type(content_element) is dict:
            pass
        return content_element

    output_content = list()
    for content_item in item_raw_data["content"]:
        content_item = process_content(content_item)
        output_content.append(content_item)

    item_raw_data["content"] = output_content
    print(item_raw_data)
