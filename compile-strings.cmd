@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:lang
echo.
echo Handling the languages
echo ----------------------

:lang-compile
echo Compiling lang files...
python compile_strings.py ./commons/strings/ ./commons/strings.json
python compile_strings.py ./wiki/strings/ ./wiki/strings.json

:lang-end


:end
