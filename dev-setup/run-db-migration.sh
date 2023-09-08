#!/bin/bash
set -e

script=`basename "$0"`;

DB_CONFIG=${AI_HOME}/db/src/main/resources/application.yaml
PROFILE=default

usage() {
  echo "Usage:  $script [-h] -c config -p profile"
  echo "    -h           Display this help message"
  echo "    -c config    The configuration file for Databases connection. Default: ${AI_HOME}/db/src/main/resources/application.yaml"
  echo "    -p profile   The Java profile under which you will run the script. Default: default"
}

while getopts "c:p:h" opt; do
    case "$opt" in
        h)
          usage
          exit 0
          ;;
        c)
          DB_CONFIG=${OPTARG}
          ;;
        p)
          PROFILE=${OPTARG}
          ;;
        *)
          usage
          exit 1
          ;;
    esac
done

pushd $SCAR_HOME > /dev/null

echo "Preparing migration for the next config=[${DB_CONFIG}] and profile=[${PROFILE}]..."

# Run migration
java -Dspring.config.additional-location=file:${DB_CONFIG} \
     -Dspring.profiles.active=${PROFILE} \
     -Dfile.encoding=UTF8 \
     -Duser.timezone=UTC \
     -jar ${AI_HOME}/db/target/db-migration.jar

popd > /dev/null
