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
call "%~dp0node_modules\.bin\rollup" nibblepoker.mjs --file nibblepoker.js
call "%~dp0node_modules\.bin\terser" nibblepoker.js -c -m -o nibblepoker.min.js
echo ^> static\resources\NibblePoker\js\nibblepoker-code.js
call "%~dp0node_modules\.bin\terser" nibblepoker-code.js -c -m -o nibblepoker-code.min.js
echo ^> static\resources\NibblePoker\js\nibblepoker-contributors.js
call "%~dp0node_modules\.bin\terser" nibblepoker-contributors.js -c -m -o nibblepoker-contributors.min.js
echo ^> static\resources\NibblePoker\js\nibblepoker-debug.js
call "%~dp0node_modules\.bin\terser" nibblepoker-debug.js -c -m -o nibblepoker-debug.min.js
echo ^> static\resources\NibblePoker\js\nibblepoker-splide.js
call "%~dp0node_modules\.bin\terser" nibblepoker-splide.js -c -m -o nibblepoker-splide.min.js
popd

:js-svgtopng-minify
echo Minifying SVG-to-PNG
pushd %CD%
cd %~dp0\..\static\resources\NibblePoker\tools\svg-to-png\
echo ^> static\resources\NibblePoker\tools\svg-to-png\svg-to-png.mjs
call "%~dp0node_modules\.bin\rollup" svg-to-png.mjs --file svg-to-png.js
call "%~dp0node_modules\.bin\terser" svg-to-png.js -c -m -o svg-to-png.min.js
popd

:js-uuidgenerator-minify
echo Minifying UUID Generator
pushd %CD%
cd %~dp0\..\static\resources\NibblePoker\tools\uuid-generator\
echo ^> static\resources\NibblePoker\tools\svg-to-png\svg-to-png.mjs
call "%~dp0node_modules\.bin\rollup" uuid-generator.mjs --file uuid-generator.js
call "%~dp0node_modules\.bin\terser" uuid-generator.js -c -m -o uuid-generator.min.js
popd

:js-nibblepoker-end

:end
