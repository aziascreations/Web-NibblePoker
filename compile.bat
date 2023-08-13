@echo off

:: Going into the script's directory
cd /D "%~dp0"


:lang
echo.
echo Handling the languages
echo ----------------------

:lang-compile
echo Compiling lang files...
python commons/strings/compile.py

:lang-end


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
popd

:sass-end


:libs
echo.
echo Handling the external libraries
echo -------------------------------

:libs-decimaljs-minify
echo Minifying Decimal.JS
pushd %CD%
cd %~dp0\resources\DecimalJs\10.4.3\
echo ^> resources\DecimalJs\10.4.3\decimal.mjs
call "%~dp0node_modules\.bin\terser" decimal.mjs -c -m --toplevel -o decimal.min.mjs
cd %~dp0\resources\DecimalJsLight\2.5.1\
echo ^> resources\DecimalJsLight\2.5.1\decimal.mjs
call "%~dp0node_modules\.bin\terser" decimal.mjs -c -m --toplevel -o decimal.min.mjs
popd

:libs-end


:: THE FW min files don't poitn to the proper JS file !!!!


:formula-wizard
echo.
echo Handling the 'Formula Wizard'
echo -----------------------------

:formula-wizard-compile
echo Compiling TypeScript...
pushd %CD%
cd %~dp0\tools\items\formula-wizard\src\
call "%~dp0node_modules\.bin\tsc"
popd

:formula-wizard-fix-imports
echo Fixing imports...
pushd %CD%
cd %~dp0\tools\items\formula-wizard\src\
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js" "decimal" "decimal.min.mjs"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js" "lang" "lang.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js" "formulas" "formulas.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js" "units" "units.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js" "ui_catalog" "ui_catalog.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js" "mvc_context" "mvc_context.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js" "sets" "sets.js"
popd

:formula-wizard-bundle
echo Making the bundle...
pushd %CD%
cd %~dp0\tools\items\formula-wizard\src\
call "%~dp0node_modules\.bin\rollup" main.js --format cjs --sourcemap --file formula-wizard.js
popd

:formula-wizard-minify
echo Minifying the files...
pushd %CD%
cd %~dp0\tools\items\formula-wizard\src\
call "%~dp0node_modules\.bin\terser" main.js -c -m --toplevel -o main.min.js
call "%~dp0node_modules\.bin\terser" lang.js -c -m --toplevel -o lang.min.js
call "%~dp0node_modules\.bin\terser" formulas.js -c -m --toplevel -o formulas.min.js
call "%~dp0node_modules\.bin\terser" units.js -c -m --toplevel -o units.min.js
call "%~dp0node_modules\.bin\terser" formula-wizard.js -c -m --toplevel -o formula-wizard.min.js
:: We also minify the .php file to help with some weird spacing issues that cannot be fixed with CSS.
:: This issue is usually handled by the reverse-proxy or a middleware, but since I need to export a SPA, I can't rely
::  on it
cd ..
call "%~dp0node_modules\.bin\html-minifier-terser" --conservative-collapse --collapse-inline-tag-whitespace --collapse-whitespace --remove-comments --decode-entities -o page.min.php page.php
popd

:formula-wizard-end




goto end

:compile-typescript
echo Compiling TypeScript for ".js" files...
call .\node_modules\.bin\tsc

:fix-typescript-imports
echo Fixing import paths for ".js" files manually...
node .\fix-import-path.js "tools/items/formula-wizard/code.js" "decimal" "decimal.min.mjs"

:minify-js
echo Minifying JS manually...
pushd %CD%

:: rollup, maybe

cd %~dp0\resources\DecimalJs\10.4.3\
echo ^> resources\DecimalJs\10.4.3\decimal.mjs
call "%~dp0node_modules\.bin\terser" decimal.mjs -c -m --toplevel -o decimal.min.mjs

cd %~dp0\resources\DecimalJsLight\2.5.1\
echo ^> resources\DecimalJsLight\2.5.1\decimal.mjs
call "%~dp0node_modules\.bin\terser" decimal.mjs -c -m --toplevel -o decimal.min.mjs

cd %~dp0\tools\items\formula-wizard\
echo ^> tools\items\formula-wizard\code.js
call "%~dp0node_modules\.bin\terser" code.js -c passes=9 --module --ecma 2019 --mangle --toplevel -o code.min.js
:: Due to the fact I used interfaces and because terser has its limits, I need to manually minify some properties.
:: It is done this way to avoid having to make some arcane incantations that may break if terser feels like it some day.
:: TODO: Make a post minifier

cd %~dp0\tools\items\b64-tools\
echo ^> tools\items\b64-tools\code.js
call "%~dp0node_modules\.bin\terser" code.js -c --module --ecma 2017 --mangle -o code.min.js

popd

:end
