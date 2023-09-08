#!/bin/bash
#
# Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
#

set -e

export DEFAULT_STABMIN_CLIENT_IMAGE_NAME="stabmin-client"
export DEFAULT_STABMIN_CLIENT_IMAGE_TAG="latest"

valid_options=(
  "--start-wf"
  "--publish-fn"
  "--publish-cd"
)

array_contains() {
  local array=("$1[@]")
  local seeking="$2"
  for element in "${!array}"; do
    if [[ "$seeking" == "$element"* ]]; then
      return 0
    fi
  done
  return 1
}

get_help_message() {
  cat <<EOF
Usage:
  ./prepare-local.sh [options]

Options:
  --help                       Show usage with available options.
  --build-image                Builds image for frontend. Name and tag could be overriden using env
                               variables: IMAGE_NAME and IMAGE_TAG
EOF
}

check_options_are_valid() {
  for option in "${options[@]}"; do
    if ! array_contains valid_options ${option}; then
      echo "Command does not contain option: ${option}"
      get_help_message
      exit
    fi
  done
}

start_workflow() {
  docker exec localstack-ai awslocal sqs send-message \
      --queue-url http://localhost:8666/000000000000/dev_workflow_requests \
      --message-body '{"workflowName": "ADD_USER", "actor": "Andrei Kozel"}'
}

publish_full_name() {
  docker exec localstack-ai awslocal sqs send-message \
        --queue-url http://localhost:8666/000000000000/dev_workflow_step_interaction_result \
        --message-body '{"workflowExecutionId": 1, "type": "ASK_FOR_FULL_NAME", "clientResponse": "Andrei Kozel2"}'
}

publish_create_date() {
  docker exec localstack-ai awslocal sqs send-message \
          --queue-url http://localhost:8666/000000000000/dev_workflow_step_interaction_result \
          --message-body '{"workflowExecutionId": 1, "type": "ASK_ABOUT_THE_DATE", "clientResponse": "Andrei Kozel2"}'
}

main() {
  options=( "$@" )
  check_options_are_valid

  if array_contains options "--start-wf"; then
    start_workflow
  fi

  if array_contains options "--publish-fn"; then
    publish_full_name
  fi

  if array_contains options "--publish-cd"; then
    publish_create_date
  fi

  if array_contains options "--publish-cu"; then
    publish_create_user
  fi
}

main "$@";
