#!/usr/bin/env bash

set -o errexit
set -o pipefail

BASE_DIR="$(cd `dirname ${0}` && pwd)"

cd "${BASE_DIR}"

export RUN_UID="$(id -u)"
export RUN_GID="$(id -g)"
export COMPOSE_PROJECT_NAME="nest-example-project"

docker-compose -f ./docker-compose/docker-compose.openapi.yml run --rm generate-user
