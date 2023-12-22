@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:clean
call "%~dp0clean.bat"
:clean-end


:php
echo.
echo Handling the PHP files
echo -----------------------

:php-minify
echo Minifying PHP files...
pushd %CD%
:: We minify the .php files to help with some weird spacing issues that cannot be fixed with CSS.
:: This issue is usually handled by the reverse-proxy or a middleware, but since I need to export SPA(s), I can't rely on it
for /r "%CD%" %%F in (*.php) do (
    set inputPath=%%F
    set outputPath=%%~dpnF.min.php

    echo ^> "!inputPath!" =^> "!outputPath!"
    call "%~dp0node_modules\.bin\html-minifier-terser" --conservative-collapse --collapse-inline-tag-whitespace ^
--collapse-whitespace --remove-comments --decode-entities --continue-on-parse-error -o "!outputPath!" "!inputPath!"
)
popd

:php-relink
echo Linking minified PHP files together...
pushd %CD%
:: We change every .php extension to .min.php in all the minified file.
:: I didn't use Python because it fails miserably with utf-8 symbols...
for /r "%CD%" %%F in (*.min.php) do (
    node "%~dp0php-relinker.js" "%%F"
)
popd

:php-end


:end
