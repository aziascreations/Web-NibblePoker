# Website - NibblePoker.lu
Public repository containing my *nibblepoker.lu* website's code.


## Preamble
This repository is only a mirror and should never be cloned and served as-is since it's missing some
key components.

The [.htaccess](.htaccess) files have been made public **on purpose** since they don't contain any
private information and because they could also be used by other people to create their website more easily.<br>


## Features

### L10N System
This website includes a simple and effective L10N system in ~150 lines of readable code without any
external dependencies.

This system simply takes advantage of the `HTTP_ACCEPT_LANGUAGE` request header to determine the
user's preferred language and can be overridden by specific URL prefixes.

See [.htaccess](.htaccess) and [commons/langs.php](commons/langs.php).

### Content System
TODO



## Tools
This website uses a few in-house tools to improve and fix issues encountered during development such as L10N
bundling and fixing TypeScript's horrendous imports.

### Localization Strings Compiler
The l10n strings compiler is a Python script that takes in a bunch of `.json` files and bundles them all
in a single file that can be used by the [L10N PHP utility](commons/langs.php).

It works by listing all subfolders in a location as language keys and assigning the content of each `.json`
file to that language key.

See [compile_strings.py](compile_strings.py) and [compile.bat](compile.bat).

### TypeScript Perineal Care
This utility simply fixes the munted import paths that Typescript produces by replacing a given import name by
another one with the proper extensions.

While not perfect, it works.<br>
That's still better than Typescript could ever do with a maintainable *tsconfig* file...

See [fix-import-path.js](fix-import-path.js) and [compile.bat](compile.bat).

### Minified PHP Import Fixer
Unfinished utility that will be used to change import paths in minified PHP files.

The main goal here is to fix some weird and unfixable text-spacing issues with line returns in the
generated HTML document.

See [php-relinker.js](php-relinker.js).


## Requirements
These files are required and need to be installed manually for the website to work properly !

* Apache 2.4 & PHP 8.1 or newer
* Font Awesome Pro v5.15.3
    * `/resources/FontAwesomePro/`
* Highlight.js v11.6.0
  * `/resources/HighlightJS/`


## Licenses

### External
Here is a list of the licenses for any third-party thing included in this repository.

* [Quantum Font](https://sesohq.sellfy.store/p/3enu/) by [sesohq](https://www.sesohq.com/)
  * Free font with no apparent usage restrictions.

All licenses are also included as-is in their project's respective folder.

### Website's code
All the code, stylesheets, and configs that are not covered by the [External licenses](#external) are all 
licensed under the [Unlicense](LICENSE) license.

### Images & Sounds
The images and sounds present in this repository aren't currently licensed.
