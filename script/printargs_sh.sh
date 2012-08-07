#!/usr/bin/env bash

usage() {
cat << EOF
Usage: printargs.sh [OPTIONS] [ARGUMENTS]
  Print the number of arguments.

OPTIONS:
  -h      print help message
  -m MSG  custom message
  -v 	  print arguments

Examples:
  printargs.sh a b c
  printargs.sh -m 'Arguments count: ' a b c
  printargs.sh -h
  printargs.sh -v a b c
EOF
}

while getopts "hmv:" OPTION # TODO: add '-v' option for verbose mode
do
    case $OPTION in
        h)
            usage
            exit 1
            shift;;
		v)
			PRINTARGS=1			
			shift;;
        m)
            MESSAGE=$OPTARG
            shift;shift;;		
    esac
done

COUNT=0
ARGSSTRING="Arguments: "

for ARG in $@; do
    # TODO: add '-v' option for verbose mode
    # and print each argument
	if [[ $PRINTARGS ]]; then
		ARGSSTRING+=" $ARG"
	fi
	let COUNT+=1
done

if [[ $PRINTARGS ]]; then
	echo $ARGSSTRING
fi

if [[ "$MESSAGE" != "" ]]; then
    echo $MESSAGE
fi

echo $COUNT