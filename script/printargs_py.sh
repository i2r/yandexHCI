#!/usr/bin/env python

import argparse

parser = argparse.ArgumentParser(description='Print the number of arguments.')
parser.add_argument('arguments', metavar='ARG', type=str, nargs='*', help='some arguments')
parser.add_argument('-m', dest='message', default='', help='custom message')
parser.add_argument('-v', action='store_true', default=False, help='Print list of argumentss', dest='verbose')
# TODO: add '-v' option for verbose mode

args = parser.parse_args()

count = 0

for a in args.arguments:
	# TODO: add '-v' option for verbose mode
	# and print each argument
	if (args.verbose == True):
		print("Arg:",a)
	count += 1

if args.message != '':
	print("Msg:",args.message)
	
print("Args count:",count)