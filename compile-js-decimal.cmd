@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:js-decimaljs
echo.
echo Handling DecimalJS library
echo --------------------------

:js-decimaljs-minify
echo Minifying Decimal.JS
pushd %CD%
cd %~dp0\resources\DecimalJs\10.4.3\
echo ^> resources\DecimalJs\10.4.3\decimal.mjs
call "%~dp0node_modules\.bin\terser" decimal.mjs -c -m --toplevel -o decimal.min.mjs
cd %~dp0\resources\DecimalJsLight\2.5.1\
echo ^> resources\DecimalJsLight\2.5.1\decimal.mjs
call "%~dp0node_modules\.bin\terser" decimal.mjs -c -m --toplevel -o decimal.min.mjs
popd

:js-decimaljs-end


:end
