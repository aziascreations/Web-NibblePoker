@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"

:main
echo.
echo Cleaning up the project
echo -----------------------

:php-clean
echo Clearing old minified PHP files...
pushd %CD%
for /r "%CD%" %%F in (*.min.php) do (
    echo ^> Deleting "%%F"
    del "%%F"
)
echo ^> Done ^!
popd

:end
:: FIXME: Won't this close the terminal when not called ?
exit /b
