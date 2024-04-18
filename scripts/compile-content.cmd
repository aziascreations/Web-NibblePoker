@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:content
echo.
echo Handling the raw content files
echo ------------------------------

:content-compile-index
echo Compiling index files...
python content_index_maker.py ../content/raw_index/ ../content/index.json

:content-compile-items
echo Compiling content item files...
python content_item_converter.py ../content/raw_items/ ../content/items/

:content-end


:end
