# Website - NibblePoker.lu
???

## Preamble
This repository is only a mirror and should never be cloned and served as-is.

The [.htaccess](.htaccess) file has been made public **on purpose** since it does not contain any
private information and because it could be used by other people to create their website more easily
since these configuration files are a nightmare to work with.<br>
Especially with the lang redirections.

## Content
### Blog
Unfinished, but all the files should be contained in the `content/` folder.

### Honeypot & Tarpits
There are a couple of files in the `honeypot/` and `tarpit/` folders that are used
to serve some basic fake files and pages that are often requested by automated scanners in order
to mess with them.

These pages can be removed by deleting the folders and removing the appropriate rules in
the [.htaccess](.htaccess) file.

## Requirements
These files are required and need to be installed manually for the website to work properly !<br>

* Apache 2.4 & PHP 8.1 or newer
* Font Awesome Pro v5.15.3
    * `/resources/FontAwesomePro/`
* Highlight.js v11.6.0
    * `/resources/HighlightJS/`

## External Licenses
Here is a list of the licenses for any third-party thing included in this repository.

* [Quantum Font](https://sesohq.sellfy.store/p/3enu/) by [sesohq](https://www.sesohq.com/)
  * Free font with no apparent usage restrictions.
* [GliderJS](https://nickpiscitelli.github.io/Glider.js/)
  * Uses the [MIT license](https://github.com/NickPiscitelli/Glider.js/blob/master/LICENSE.txt)

All licenses are also included as-is in their project's respective folder.
