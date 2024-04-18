@echo off
setlocal enabledelayedexpansion

:: Going into the project's root directory
cd /D "%~dp0\..\"


:clean
echo.
echo Cleaning up the project
echo -----------------------

:clean-php-minified
echo Clearing old minified PHP files...
pushd %CD%
for /r "%CD%" %%F in (*.min.php) do (
    echo ^> Deleting "%%F"
    del "%%F"
)
echo ^> Done ^!
popd

:clean-end


:end
