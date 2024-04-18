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
cd %~dp0\resources\NibblePoker\js\
echo ^> resources\NibblePoker\js\nibblepoker.js
call "%~dp0node_modules\.bin\terser" nibblepoker.js -c -m -o nibblepoker.min.js
echo ^> resources\NibblePoker\js\nibblepoker-code.js
call "%~dp0node_modules\.bin\terser" nibblepoker-code.js -c -m -o nibblepoker-code.min.js
echo ^> resources\NibblePoker\js\nibblepoker-contributors.js
call "%~dp0node_modules\.bin\terser" nibblepoker-contributors.js -c -m -o nibblepoker-contributors.min.js
echo ^> resources\NibblePoker\js\nibblepoker-debug.js
call "%~dp0node_modules\.bin\terser" nibblepoker-debug.js -c -m -o nibblepoker-debug.min.js
echo ^> resources\NibblePoker\js\nibblepoker-splide.js
call "%~dp0node_modules\.bin\terser" nibblepoker-splide.js -c -m -o nibblepoker-splide.min.js
popd

:js-nibblepoker-end


:end
