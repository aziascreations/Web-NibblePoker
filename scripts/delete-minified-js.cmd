@echo off

pushd %CD%

cd /D "%~dp0"
cd ..\static\resources\NibblePoker

echo.
echo Removing minified JS files
echo --------------------------

echo Deleting "*.js" in "static\resources\NibblePoker" ...
del /S /Q *.js


:end
popd
