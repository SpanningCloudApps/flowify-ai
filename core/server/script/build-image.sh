#!/usr/bin/env bash

#
# Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
#

set -e

export DEFAULT_SERVER_IMAGE_NAME=server
export DEFAULT_SERVER_IMAGE_TAG=latest
export DEFAULT_CONFIG_DIR=${AI_HOME}/server/config
export DEFAULT_NODE_ENV=custom

valid_options=(
  "server"
)

if [ -z "${NODE_CUSTOM_CONFIG_DIR}" ]; then
    export NODE_CUSTOM_CONFIG_DIR=${DEFAULT_CONFIG_DIR}
fi

if [ -z "${NODE_CUSTOM_ENV}" ]; then
    export NODE_CUSTOM_ENV=${DEFAULT_NODE_ENV}
fi

remove_image_if_exists() {
  local image=$(docker images | grep $1)
  if [[ ! -z "$image" ]]; then
    docker rmi -f $1
  fi
}

get_help_message() {
cat << EOF
Usage:
  ./scripts/build-image <image-name> - To run build image with name <image-name>.
      <image-name> - server
  <image-name> is required
EOF
}

build_server_image() {
  echo 'Build server'
  pushd "${AI_HOME}/core/server"

  if [ -z "${SERVER_IMAGE_NAME}" ]; then
      export SERVER_IMAGE_NAME=${DEFAULT_SERVER_IMAGE_NAME}
  fi

  if [ -z "${SERVER_IMAGE_TAG}" ]; then
      export SERVER_IMAGE_TAG=${DEFAULT_SERVER_IMAGE_TAG}
  fi

  DOCKER_BUILDKIT=1 docker build \
      -t ${SERVER_IMAGE_NAME}:${SERVER_IMAGE_TAG} \
      --build-arg NODE_CUSTOM_CONFIG_DIR=${NODE_CUSTOM_CONFIG_DIR} \
      --build-arg NODE_CUSTOM_ENV=${NODE_CUSTOM_ENV} .

  popd
}

array_contains () {
  local array="$1[@]"
  local seeking=$2
  local in=1
  for element in "${!array}"; do
      if [[ $seeking == $element* ]]; then
          return 0
      fi
  done
  return 1
}

if [ "$#" -ne 1 ]; then
  get_help_message
  exit
fi

if ! array_contains valid_options "$1"; then
  echo "Command does not contain valid image name: $1"
  get_help_message
  exit
fi;

echo $1

case $1 in
  server)
    build_server_image
    ;;

  *)
    echo "Command does not contain valid image name: $1"
    get_help_message
    exit 1
    ;;
esac
