@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:sass
echo.
echo Handling the SASS files
echo -----------------------

:sass-compile
echo Compiling SASS files...
pushd %CD%
cd %~dp0\resources\NibblePoker\scss\
call "%~dp0node_modules\.bin\sass" nibblepoker.scss:../css/nibblepoker.css -q
call "%~dp0node_modules\.bin\sass" nibblepoker.scss:../css/nibblepoker.min.css -q --style compressed
call "%~dp0node_modules\.bin\sass" snowflakes.scss:../css/snowflakes.css -q
call "%~dp0node_modules\.bin\sass" snowflakes.scss:../css/snowflakes.min.css -q --style compressed
call "%~dp0node_modules\.bin\sass" debugger.scss:../css/debugger.css -q
call "%~dp0node_modules\.bin\sass" debugger.scss:../css/debugger.min.css -q --style compressed
popd
pushd %CD%
cd %~dp0\wiki\scss\
call "%~dp0node_modules\.bin\sass" nibblepoker-wiki.scss:../css/nibblepoker-wiki.css -q
call "%~dp0node_modules\.bin\sass" nibblepoker-wiki.scss:../css/nibblepoker-wiki.min.css -q --style compressed
popd

:sass-end


:end
