@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:python
echo.
echo Setting up Python...
echo --------------------

:python-install
echo Installing packages...
pushd %CD%
call pip install -r requirements.txt
popd

:python-end


:end
