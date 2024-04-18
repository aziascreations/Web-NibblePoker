@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:content
echo.
echo Handling the raw tools files
echo -----------------------------

:content-compile-index
echo Compiling index files...
python content_index_maker.py ./tools/raw_index/ ./tools/index.json

:content-end


:end
