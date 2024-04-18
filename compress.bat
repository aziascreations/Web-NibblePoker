@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:compile
call "%~dp0compile.bat"
:compile-end


:archive
echo.
echo Preparing a deployment archive
echo ------------------------------

:archive-env-name
echo Preparing name variable...
set NP_ZIP_NAME=build_%date:~-4%-%date:~3,2%-%date:~0,2%.7z
del /Q /S /F %NP_ZIP_NAME% 2> nul 1> nul
echo ^> %NP_ZIP_NAME%

:archive-env-content
echo Preparing environment variable...
set NP_ZIP_CONTENT=
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "about/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "commons/*.php" "commons/strings.json" "commons/DOM/" "commons/content/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "contact/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "content/*.*"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "content/items/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "contributors/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "debug/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "links/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "privacy/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/ExtGraphics/*.png"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/ExtGraphics/*.svg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/ExtGraphics/*/*.png"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/ExtGraphics/*/*.svg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/ExtGraphics/*/*/*.png"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/ExtGraphics/*/*/*.svg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/ExtGraphics/*/*/*/*.png"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/ExtGraphics/*/*/*/*.svg"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/FontAwesomePro/5.15.3/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/FontAwesomePro/6.5.1/"
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
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/js/*.js"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/NibblePoker/sounds/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/Quantum/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "resources/SplideJs/dist/"
set NP_ZIP_CONTENT=%NP_ZIP_CONTENT% "./.htaccess" "./*.php" "./favicon.*" "./.env"
::echo ^>%NP_ZIP_CONTENT%

:archive-7z
echo Making '.7z' archive...
7z a -mx9 "./%NP_ZIP_NAME%" %NP_ZIP_CONTENT% 1> nul
echo ^> Done !

:archive-end

echo You can use the following command on the server:
echo ^> 7z x %NP_ZIP_NAME% ^&^& chmod 755 -R ./ ^&^& rm %NP_ZIP_NAME%

:end
