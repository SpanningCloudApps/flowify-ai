function run_ec2() {
  echo 'Running EC2'
}

function download_git() {
  echo 'Downloading git'
}

function pull_code() {
  echo 'Pulling code'
}

function download_docker_compose() {
  echo 'Downloading docker-compose'
}

function run_services() {
  echo 'Running services'
}

function main() {
  run_ec2
  download_git
  pull_code
  download_docker_compose
  run_services
}

main "${@}"
