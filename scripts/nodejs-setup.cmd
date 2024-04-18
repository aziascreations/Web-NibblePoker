@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:nodejs
echo.
echo Setting up NodeJS...
echo --------------------

:nodejs-install
echo Installing packages...
pushd %CD%
call npm install
popd


:nodejs-end


:end
