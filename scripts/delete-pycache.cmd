@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:pycache
echo.
echo Removing '__pycache__' folders
echo ------------------------------

:pycache-delete
echo Deleting folders...
pushd %CD%
cd ..
for /r %%d in (.) do (
    rmdir /Q /S "%%d\__pycache__" 2> nul
)
popd

:pycache-end


:end
