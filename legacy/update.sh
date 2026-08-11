#!/bin/bash

cd "$(dirname "$0")"

EXCLUDE=("release.tar" "docker-compose.yml" "update.sh")

for item in * .*; do
    # Skip current and parent directory entries
    [[ "$item" == "." || "$item" == ".." ]] && continue

    delete=true

    for pattern in "${EXCLUDE[@]}"; do
        if [[ "$item" == $pattern ]]; then
            delete=false
            break
        fi
    done

    if [ "$delete" = true ]; then
        echo "Deleting '$item'"
        rm -rf "$item"
    fi
done

tar -xvf release.tar

rm data/tools/ico-maker.yml
rm data/tools/png-analyser.yml

docker-compose up --build --force-recreate -d
