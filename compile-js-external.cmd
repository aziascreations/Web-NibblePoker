@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:js-external
echo.
echo Handling external libraries
echo ---------------------------

:js-external-decimaljs-minify
echo Minifying Decimal.JS
pushd %CD%
cd %~dp0\resources\DecimalJs\10.4.3\
echo ^> resources\DecimalJs\10.4.3\decimal.mjs
call "%~dp0node_modules\.bin\terser" decimal.mjs -c -m --toplevel -o decimal.min.mjs
cd %~dp0\resources\DecimalJsLight\2.5.1\
echo ^> resources\DecimalJsLight\2.5.1\decimal.mjs
call "%~dp0node_modules\.bin\terser" decimal.mjs -c -m --toplevel -o decimal.min.mjs
popd

:js-external-highlightjs
echo Handling HighlightJS
pushd %CD%
cd %~dp0\resources\HighlightJS\
echo ^> Clearing old files
del /Q /S /F highlight.js 2> nul 1> nul
del /Q /S /F highlight.min.js 2> nul 1> nul
echo ^> Installing dependencies
call npm install > nul
echo ^> Building for browsers
node tools/build.js -t browser sql php c cpp vbnet java yaml css scss bash ini python shell dockerfile cmake purebasic csharp 1> nul
echo ^> Moving final files
robocopy %CD%\build %CD% highlight.js highlight.min.js 1> nul
echo ^> Minifying used CSS files
call "%~dp0node_modules\.bin\sass" src/styles/atom-one-dark.css:src/styles/atom-one-dark.min.css -q --style compressed
popd

:js-external-end


:end
