@echo off

pushd %CD%

:: Going into the project's directory
cd /D "%~dp0"
call delete-pycache.cmd
cd ..

echo.
echo Creating Release Package
echo ------------------------

echo %CD%

del release.tar 2> nul

7z a "release.tar" ^
    -xr!*.pdn ^
    -xr!*.ai ^
    data/ ^
    static/ ^
    templates/ ^
    website/ ^
    .dockerignore ^
    .env ^
    app.py ^
    Dockerfile ^
    requirements.txt

popd
