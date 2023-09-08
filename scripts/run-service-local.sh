set -e

valid_options=(
  "--help"
  "--setup-infrastructure"
  "--init-dbs"
  "--run-db-migrations"
  "--internal"
)

function array_contains() {
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

function check_options_are_valid() {
  for option in "${options[@]}"; do
    if ! array_contains valid_options ${option}; then
      echo "Command does not contain option: ${option}"
      get_help_message
      exit
    fi
  done
}

function get_help_message() {
  cat <<EOF
Usage:
  ./run-service-local.sh - prepare the local environment.
  ./run-service-local.sh [options]

Options:
  --help                       Prints this message

  --setup-infrastructure       Runs all the containers except tomcat, since on tomcat start all applications will be                           running, but databases doesn't have installed infrastructure
  --init-dbs                   TimescaleDB initialization. Creates dev user, all the necessary databases, applies migrations
  --run-db-migrations          Run timescaledb db migrations script.
  --internal                   Runs all the previous commands in appropriate order to setup full infrastructure
EOF
}


function setup_infrastructure() {
  if array_contains options "--setup-infrastructure" || array_contains options "--internal"; then
    echo "Run infrastructure in the doсker"
    pushd "${AI_HOME}"
      docker-compose up -d timescale-ai
    popd
  fi
}

function init_dbs() {
  if array_contains options "--init-dbs" || array_contains options "--internal"; then
    while ! docker logs timescale-ai 2>&1 | grep "/var/run/postgresql/.s.PGSQL.5432"; do
      echo "Waiting for timescaledb"
      sleep 2
    done
    docker exec -i timescale-ai psql -U postgres -c "CREATE DATABASE index;"
    docker exec -i timescale-ai psql -U postgres -c "CREATE USER dev WITH PASSWORD 'dev';"
    docker exec -i timescale-ai psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE index TO dev;"

    ${AI_HOME}/scripts/run-db-migration.sh -p dev
  fi
}

function run_db_migrations() {
  if array_contains options "--run-db-migrations" && ! array_contains options "--init-dbs"; then
    echo "Run DB migrations"
    while ! docker logs timescale-ai 2>&1 | grep "/var/run/postgresql/.s.PGSQL.5432"; do
        echo "Waiting for timescaledb"
        sleep 2
    done
    pushd "${AI_HOME}/db"
       ./mvnw clean package
    popd
    ${AI_HOME}/scripts/run-db-migration.sh -p dev
  fi
}

function create_logs_folder() {
   if [ ! -d /var/log/spanning ]; then
      sudo mkdir -p /var/log/spanning
      sudo chown $USER /var/log/spanning
      sudo chmod 755 /var/log/spanning
   fi
}

function main() {
  options=("$@")
  check_options_are_valid

  if [ -z $AI_HOME ]; then
    RED='\033[0;31m'
    NC='\033[0m'
    echo -e "${RED}[ERROR] There is no AI_HOME env variable. Please set up it${NC}"
    exit
  fi

  if [ "$#" -eq 0 ]; then
    exit
  fi

  if [ "$#" -eq 1 ] && [ $options = "--help" ]; then
    get_help_message
    exit
  fi

  create_logs_folder
  setup_infrastructure
  init_dbs
  run_db_migrations
}

main "${@}"
