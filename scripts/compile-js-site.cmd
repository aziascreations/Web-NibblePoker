@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:js-nibblepoker
echo.
echo Handling the website's libraries
echo --------------------------------

:js-nibblepoker-minify
echo Minifying nibblepoker.js
pushd %CD%
cd %~dp0\..\static\resources\NibblePoker\js\
echo ^> static\resources\NibblePoker\js\nibblepoker.js
call "%~dp0node_modules\.bin\rollup" nibblepoker-default.mjs --file nibblepoker-default.js
call "%~dp0node_modules\.bin\terser" nibblepoker-default.js -c -m -o nibblepoker-default.min.js

echo ^> static\resources\NibblePoker\js\nibblepoker-code.mjs
call "%~dp0node_modules\.bin\rollup" nibblepoker-code.mjs --file nibblepoker-code.js
call "%~dp0node_modules\.bin\terser" nibblepoker-code.js -c -m -o nibblepoker-code.min.js

echo ^> static\resources\NibblePoker\js\nibblepoker-contributors.mjs
call "%~dp0node_modules\.bin\rollup" nibblepoker-contributors.mjs --file nibblepoker-contributors.js
call "%~dp0node_modules\.bin\terser" nibblepoker-contributors.js -c -m -o nibblepoker-contributors.min.js

echo ^> static\resources\NibblePoker\js\nibblepoker-debug.js
call "%~dp0node_modules\.bin\rollup" nibblepoker-debug.mjs --file nibblepoker-debug.js
call "%~dp0node_modules\.bin\terser" nibblepoker-debug.js -c -m -o nibblepoker-debug.min.js

echo ^> static\resources\NibblePoker\js\nibblepoker-splide.js
call "%~dp0node_modules\.bin\rollup" nibblepoker-splide.mjs --file nibblepoker-splide.js
call "%~dp0node_modules\.bin\terser" nibblepoker-splide.js -c -m -o nibblepoker-splide.min.js
popd


:js-applet-excel-password-remover
echo Minifying Excel Password Remover
pushd %CD%
cd %~dp0\..\static\resources\NibblePoker\applets\excel-password-remover\
echo ^> static\resources\NibblePoker\applets\excel-password-remover\excel-password-remover.mjs
call "%~dp0node_modules\.bin\rollup" excel-password-remover.mjs --file excel-password-remover.js
call "%~dp0node_modules\.bin\terser" excel-password-remover.js -c -m -o excel-password-remover.min.js
popd


:js-uuidgenerator-minify
echo Minifying UUID Generator
pushd %CD%
cd %~dp0\..\static\resources\NibblePoker\applets\uuid-generator\
echo ^> static\resources\NibblePoker\applets\uuid-generator\uuid-generator.mjs
call "%~dp0node_modules\.bin\rollup" uuid-generator.mjs --file uuid-generator.js
call "%~dp0node_modules\.bin\terser" uuid-generator.js -c -m -o uuid-generator.min.js
popd

:js-nibblepoker-end

:end
