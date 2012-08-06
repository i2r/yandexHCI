#!/usr/bin/env bash

usage() {
cat << EOF
Usage: printargs.sh [OPTIONS] [ARGUMENTS]
  Print the number of arguments.

OPTIONS:
  -h      print help message
  -m MSG  custom message

Examples:
  printargs.sh a b c
  printargs.sh -m 'Arguments count: ' a b c
  printargs.sh -h

EOF
}

while getopts “hm:” OPTION # TODO: add '-v' option for verbose mode
do
    case $OPTION in
        h)
            usage
            exit 1
            shift;;
        m)
            MESSAGE=$OPTARG
            shift;shift;;
    esac
done

COUNT=0

for ARG in $@; do
    # TODO: add '-v' option for verbose mode
    # and print each argument
    let COUNT+=1
done

if [[ "$MESSAGE" != "" ]]; then
    echo $MESSAGE
fi

echo $COUNT