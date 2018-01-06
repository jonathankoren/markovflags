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

Things To Do:
* Ordinary crossess, saltires, and scandinavian crosses.
* Change from using font glyphs to SVGs for charges. This will allow more accurate placement.
* Smarter color choice when color charges on stripes.
* Multiple charges.
* Aspect ratio and swallow tail changes, require a page reload.

Available on github at https://github.com/jonathankoren/markovflags .
