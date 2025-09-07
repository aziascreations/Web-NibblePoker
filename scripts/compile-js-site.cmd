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

echo ^> static\resources\NibblePoker\js\nibblepoker-core.mjs
call "%~dp0node_modules\.bin\rollup" nibblepoker-core.mjs --file nibblepoker-core.js
call "%~dp0node_modules\.bin\terser" nibblepoker-core.js -c -m -o nibblepoker-core.min.js

echo ^> static\resources\NibblePoker\js\nibblepoker-contributors.mjs
call "%~dp0node_modules\.bin\rollup" nibblepoker-contributors.mjs --file nibblepoker-contributors.js
call "%~dp0node_modules\.bin\terser" nibblepoker-contributors.js -c -m -o nibblepoker-contributors.min.js

echo ^> static\resources\NibblePoker\js\nibblepoker-debug.js
call "%~dp0node_modules\.bin\rollup" nibblepoker-debug.mjs --file nibblepoker-debug.js
call "%~dp0node_modules\.bin\terser" nibblepoker-debug.js -c -m -o nibblepoker-debug.min.js

echo ^> static\resources\NibblePoker\js\nibblepoker-splide.js
call "%~dp0node_modules\.bin\rollup" nibblepoker-splide.mjs --file nibblepoker-splide.js
call "%~dp0node_modules\.bin\terser" nibblepoker-splide.js -c -m -o nibblepoker-splide.min.js

echo ^> static\resources\NibblePoker\js\nibblepoker-template.mjs
call "%~dp0node_modules\.bin\rollup" nibblepoker-template.mjs --file nibblepoker-template.js
call "%~dp0node_modules\.bin\terser" nibblepoker-template.js -c -m -o nibblepoker-template.min.js
popd


:js-applet-excel-password-remover
echo Minifying Excel Password Remover
pushd %CD%
cd %~dp0\..\static\resources\NibblePoker\applets\excel-password-remover\
echo ^> static\resources\NibblePoker\applets\excel-password-remover\excel-password-remover.mjs
call "%~dp0node_modules\.bin\rollup" excel-password-remover.mjs --file excel-password-remover.js
call "%~dp0node_modules\.bin\terser" excel-password-remover.js -c -m -o excel-password-remover.min.js
popd


:js-applet-iban-generator
echo Minifying IBAN Generator
pushd %CD%
cd %~dp0\..\static\resources\NibblePoker\applets\iban-generator\
echo ^> static\resources\NibblePoker\applets\iban-generator\iban-generator.mjs
call "%~dp0node_modules\.bin\rollup" iban-generator.mjs --file iban-generator.js
call "%~dp0node_modules\.bin\terser" iban-generator.js -c -m -o iban-generator.min.js
popd


:js-applet-ico-maker
echo Minifying Ico Maker
pushd %CD%
cd %~dp0\..\static\resources\NibblePoker\applets\ico-maker\
echo ^> static\resources\NibblePoker\applets\ico-maker\ico-maker.mjs
call "%~dp0node_modules\.bin\rollup" ico-maker.mjs --file ico-maker.js
call "%~dp0node_modules\.bin\terser" ico-maker.js -c -m -o ico-maker.min.js
popd


:js-uuidgenerator-minify
echo Minifying UUID Generator
pushd %CD%
cd %~dp0\..\static\resources\NibblePoker\applets\uuid-generator\
echo ^> static\resources\NibblePoker\applets\uuid-generator\uuid-generator.mjs
call "%~dp0node_modules\.bin\rollup" uuid-generator.mjs --file uuid-generator.js
call "%~dp0node_modules\.bin\terser" uuid-generator.js -c -m -o uuid-generator.min.js
popd


:js-pnganalyser-minify
echo Minifying PNG Analyzer
pushd %CD%
cd %~dp0\..\static\resources\NibblePoker\applets\png-analyser\
echo ^> static\resources\NibblePoker\applets\png-analyser\png-analyser.mjs
call "%~dp0node_modules\.bin\rollup" png-analyser.mjs --file png-analyser.js
call "%~dp0node_modules\.bin\terser" png-analyser.js -c -m -o png-analyser.min.js
popd


:js-vatcalculator-minify
echo Minifying VAT Calculator
pushd %CD%
cd %~dp0\..\static\resources\NibblePoker\applets\vat-calculator\
echo ^> static\resources\NibblePoker\applets\vat-calculator\vat-calculator.mjs
call "%~dp0node_modules\.bin\rollup" vat-calculator.mjs --file vat-calculator.js
call "%~dp0node_modules\.bin\terser" vat-calculator.js -c -m -o vat-calculator.min.js
popd

:js-nibblepoker-end

:end
