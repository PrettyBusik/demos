#!/usr/bin/env bash

current_directory=$(realpath "$(dirname "$0")")
# Prepare backend

rm -r -f "$current_directory/runtime"
mkdir -m 777 "$current_directory/runtime"

# Build frontend applications
export NG_CLI_ANALYTICS=0

directories=()
directories+=("vocabulary-cards")
directories+=("weather-forecast")
directories+=("weather-history")

for sub_directory in "${directories[@]}"; do
  echo "----------------------------------------------------------------------------------------------------"
  echo "$sub_directory"
  echo "----------------------------------------------------------------------------------------------------"
    cd "$current_directory/$sub_directory"
    npm install
    npm run build-prod
    rm -r -f .angular
    rm -r -f node_modules
done
