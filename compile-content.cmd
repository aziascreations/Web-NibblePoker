@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:content
echo.
echo Handling the raw content files
echo ------------------------------

:content-compile
echo Compiling index files...
python content_index_maker.py ./content/raw_index/ ./content/index.json

:content-end


:end
