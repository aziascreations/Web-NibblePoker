@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:compile
::call "%~dp0compile.bat"
:compile-end

:: Source: https://stackoverflow.com/q/1192476
set NP_ZIP_NAME=build_%date:~-4%-%date:~3,2%-%date:~0,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%
::echo %NP_ZIP_NAME%
::goto end

:: TMP
del /Q /S /F tmp01.7z 2> nul 1> nul

:archive
echo.
echo Handling the 'Formula Wizard'
echo -----------------------------

:archive-env
echo Preparing environment variable...
set NP_ZIP_CONTENT=
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "about/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "commons/*.php" "commons/strings.json" "commons/DOM/" "commons/content/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "content/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "contributors/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "links/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "privacy/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/HighlightJS/highlight.min.js" "resources/HighlightJS/src/styles/atom-one-dark.min.css"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/css/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*.png"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*.jpg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*.jpeg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*.svg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*.webp"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*/*.png"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*/*.jpg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*/*.jpeg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*/*.svg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*/*.webp"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*/*/*.png"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*/*/*.jpg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*/*/*.jpeg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*/*/*.svg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/images/*/*/*.webp"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/js/*.min.js"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/sounds/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/Quantum/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/SplideJs/dist/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "./.htaccess" "./*.php" "./favicon.*"
echo ^>%NP_ZIP_CONTENT%

:archive-7z
echo Making '.7z' archive...
7z a -mx9 "./%NP_ZIP_NAME%.7z" %NP_ZIP_CONTENT%

:archive-end


:end
