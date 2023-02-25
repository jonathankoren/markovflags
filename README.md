# About

Generates random national flags.

Being inspired from the flag generator on
http://www.learnedleague.com , and
http://politiscales.la-commune.net/en_US/quiz/ .
I decided to make my own.

Flags are generated from a markov model that chooses, the number and
orientation of stripes, canton presence (and shape), and colors. Model were
derived from examining world flags. If the flag will be charged, the choice
of charge is uniformally random.

# How To Use Swallowtails
* `swallowtail start ratio`: 0 to 1. Determines how far from the left a swallowtail will cut in.
* `swallowtail point vertical ratio csv`: CSV indicating stops from 0 to 1 cummulative. Determines how wide far from the top the bottom of a swallowtail will be. Number of elements is the number of swallowtails.
* `swallow tail stripe control`: CSV of letters. Controls whether a swallowtail should come to a point at the top, bottom, or middle of the band. Number of elments is the number of swallowtails.

# TODO
* Ordinary crossess, saltires, and scandinavian crosses.
* Change from using font glyphs to SVGs for charges. This will allow more accurate placement.
* Smarter color choice when color charges on stripes.
* Multiple charges.
* Better controls.

Available on github at https://github.com/jonathankoren/markovflags .
