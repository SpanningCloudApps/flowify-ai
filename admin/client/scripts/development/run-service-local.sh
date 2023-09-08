#!/usr/bin/env bash

set -e

options=( "$@" )

valid_options=(
  "--skip-image-build"
  "--help"
)

export IMAGE_NAME="hackathon-admin-ui"
export IMAGE_TAG="latest"

main () {

  # Checks version of docker-compose. If lower than 1.25.0 exits script.
  min_version=1.25.0
  actual_version=$(docker-compose version --short)
  if version_comparision $min_version $actual_version; then
       echo "Minimal version of docker-compose must be $min_version but was $actual_version. Aborting..."
       exit 1
  fi

  # Checks that all provided options are valid,
  # otherwise prints help message and exits script.
  check_options_are_valid

  if [ "$#" -eq 1 ] && [ $options = "--help" ]; then
      get_help_message
      exit 0
  fi

  pushd ${AI_HOME}/admin/client

  # Removes hackathon-admin-ui container if exists
  stop_and_remove_if_exists hackathon-admin-ui

  if ! array_contains options "--skip-image-build"; then

    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} \
        --build-arg CODEARTIFACT_AUTH_TOKEN=${CODEARTIFACT_AUTH_TOKEN} .

  fi

  docker-compose up -d hackathon-admin-ui

  popd
}

check_options_are_valid () {
  for i in "${options[@]}"
  do
    if ! array_contains valid_options $i; then
      echo "Unexpected option: $i"
      get_help_message
      exit
    fi;
  done
}

get_option_value () {
  local array="$1[@]"
  local seeking=$2
  local in=1
  local value
  for element in "${!array}"; do
      if [[ $element == $seeking* ]]; then
         value=$(cut -d "=" -f2- <<< "$element")
         if [[ $value == $seeking ]] || [ -z "$value" ]; then
            exit
         else
            echo $value
         fi
      fi
  done
}


stop_and_remove_if_exists () {
  docker-compose rm -f -s -v $1
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

get_help_message () {
cat << EOF
Usage:
  ./scripts/development/run-service-local.sh [options] - To run only dependent services(hackathon-admin-ui).
Options:
  --help                        Show usage with available options. Has no effect if combined with other options.
  --skip-image-build            Skips image build.
If you want to run hackathon-admin-ui in docker you should use:
  ./scripts/development/run-service-local.sh
EOF
}

function version_comparision() {
  test "$(printf '%s\n' "$@" | sort -V | head -n 1)" != "$1";
}

main "$@";

exit
