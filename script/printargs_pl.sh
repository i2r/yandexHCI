#!/usr/bin/env perl

use strict;
use Getopt::Long;
use Pod::Usage;

my $help;
my $message = '';
my $verbose;

@ARGV and GetOptions(
    "h" => \$help,
    "m:s" => \$message,
    # TODO: add '-v' option for verbose mode
	"v"=>\$verbose
) or pod2usage(1);
pod2usage(-verbose => 2, -exitval => 2) if $help;

my $count = 0;
my $argString = "Arguments:";

foreach my $arg (@ARGV) {
    # TODO: add '-v' option for verbose mode
    # and print each argument
	if ($verbose) {
		$argString .= " " . $arg;
	}
    $count++;
}

if ($verbose) {
	print ($argString . "\n");
}

if($message ne "") {
    print($message . "\n");
}

print("Count: " . $count . "\n");

__END__

=head1 NAME

    printargs.pl - Print the number of arguments.

=head1 SYNOPSIS

    printargs.pl [options] [arguments]

=head1 OPTIONS

    -h      Show help message.

    -m MSG  Specify a custom message.
	
	-m      Prints arguments list.


=head1 EXAMPLE

    printargs.sh a b c

    printargs.sh -m 'Arguments count: ' a b c

    printargs.sh -h
	
	printargs.sh -v a b c