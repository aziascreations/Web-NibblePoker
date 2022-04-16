# Website - NibblePoker.lu
Repository containing the source code for my website.

## Preamble
This repository is only a mirror and is never cloned and served as-is.

In the event you wished to mirror and serve it, or modify it, you should make sure
the `.git` folder and the other files referenced in the [.dockerignore](.dockerignore)
file are properly removed, even if measures are in place to prevent access to them.

The [.htaccess](.htaccess) file has been made public **on purpose** since it does not contains any
private information and because it could be used by other people to create their website more easily
since these files are a pain to work with.<br>
Especially with the lang redirections.

It is also a good idea to server this website through a jailed instance of apache, just in case.

## Content
### Blog
Unfinished, but all the files should be contained in the `content/` folder.

### Honeypot & Tarpits *(Disabled)*
There are a couple of files in the `honeypot/` and `tarpit/` folders that are used
to serve some basic fake files that are often requested by automated scanners in order
to mess with them, or potentially force them to report invalid data.

These pages can be removed by deleting the folders and removing the appropriate rules in
the [.htaccess](.htaccess) file.

## Requirements
These files are required and need to be installed manually for the website to work properly !<br>

* Apache 2.4 & PHP 8 or newer
* Font Awesome Pro v5.15.3
    * `/resources/FontAwesomePro/`
