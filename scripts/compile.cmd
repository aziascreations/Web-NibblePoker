@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"

:: Running sub-scripts
call "%~dp0compile-clean.cmd"
call "%~dp0compile-strings.cmd"
call "%~dp0compile-content.cmd"
call "%~dp0compile-sass.cmd"
call "%~dp0compile-js-site.cmd"
call "%~dp0compile-js-external.cmd"

:end
