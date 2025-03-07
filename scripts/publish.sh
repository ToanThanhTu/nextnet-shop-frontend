#!/bin/bash
set -e

# Check if a version argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <version>"
  exit 1
fi

# Assign the version argument to a variable
version=$1

docker build --platform linux/amd64 --pull -f ./deployments/Dockerfile -t nextnetshop-frontend-v$version . --no-cache

docker push nextnetshop-frontend-v$version