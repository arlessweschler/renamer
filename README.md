[![view on npm](http://img.shields.io/npm/v/renamer/next.svg)](https://www.npmjs.org/package/renamer)
[![npm module downloads](http://img.shields.io/npm/dt/renamer.svg)](https://www.npmjs.org/package/renamer)
[![Build Status](https://travis-ci.org/75lb/renamer.svg?branch=next)](https://travis-ci.org/75lb/renamer?branch=next)
[![Coverage Status](https://coveralls.io/repos/github/75lb/renamer/badge.svg?branch=next)](https://coveralls.io/github/75lb/renamer?branch=next)
[![Dependency Status](https://david-dm.org/75lb/renamer.svg)](https://david-dm.org/75lb/renamer)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

***Upgraders, please read the [release notes](https://github.com/75lb/renamer/releases)***

# renamer
Renamer is a command-line utility to help rename files and folders. It is flexible and extensible via plugins.

## Disclaimer

Always run this tool with the `--dry-run` option until you are confident the results look correct.

## Synopsis

_The examples below use double quotes to suit Windows users, macOS & Linux users should use single quotes._


As input, renamer takes a list of filenames or glob patterns plus some options describing how you would like the files to be renamed.

```
$ renamer [options] [file...]
```

Trivial example. It will replace the text `jpeg` with `jpg` in all file and directory names in the current directory.

```
$ renamer --find jpeg --replace jpg *
```

As above but operates on all files and folders recursively.

```
$ renamer --find jpeg --replace jpg "**"
```

If no filesnames/patterns are specified, renamer will look for a newline-separated list of filenames on standard input. This approach is useful for crafting a more specific input list using tools like `find`. This example operates on files modified less than 20 minutes ago.

```
$ find . -mtime -20m | renamer --find jpeg --replace jpg
```

Same again but with a hand-rolled input of filenames and glob patterns. Create an input text file, e.g. `files.txt`:

```
house.jpeg
garden.jpeg
img/*
```

Then pipe it into renamer.

```
$ cat files.txt | renamer --find jpeg --replace jpg
```

Simple example using a [regular expression literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions). The case-insensitive pattern `/one/i` matches the input file `ONE.jpg`, renaming it to `two.jpg`.

```
$ renamer --find "/one/i" --replace "two" ONE.jpg
```

If the built-in behaviour doesn't fit your needs, take a look through the [list of available plugins](https://www.npmjs.com/search?q=keywords%3Arenamer-plugin). [More on using plugins](https://github.com/75lb/renamer/wiki/How-to-use-renamer-plugins).

If you can't find an appropriate plugin you can write your own. For example, this trivial plugin appends the extension `.jpg` to every input file. Save it as `my-plugin.js`.

```
module.exports = PluginBase => class Jpg extends PluginBase {
  replace (filePath) {
    return filePath + '.jpg'
  }
}

```

Use your custom replace plugin by supplying its filename to the `--plugin` option. [More on writing plugins](https://github.com/75lb/renamer/wiki/How-to-write-a-renamer-plugin).

```
$ renamer --plugin my-plugin.js images/*
```

## Further reading

Please see [the wiki](https://github.com/75lb/renamer/wiki) for more documentation and [examples](https://github.com/75lb/renamer/wiki/examples). For the full list of command-line options, see [here](https://github.com/75lb/renamer/wiki/Renamer-CLI-docs). For more information on Regular Expressions, see [this useful guide](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions).

## Install

```
$ npm install -g renamer@next
```

* * *

&copy; 2012-18 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown).
