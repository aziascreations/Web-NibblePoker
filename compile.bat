@echo off
setlocal enabledelayedexpansion

:: Going into the script's directory
cd /D "%~dp0"


:clean
call "%~dp0clean.bat"
:clean-end


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


:: THE Formula-wizard minified files don't point to the proper minified JS file !!!!


:formula-wizard
echo.
echo Handling the 'Formula Wizard'
echo -----------------------------

:formula-wizard-clean
echo Cleaning...
pushd %CD%
cd %~dp0\tools\items\formula-wizard\src\
del *.js 2>nul
del *.map 2>nul
popd

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
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js" "decimal" "decimal.min.mjs"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js" "lang" "lang.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js" "formulas" "formulas.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js" "units" "units.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js" "ui_catalog" "ui_catalog.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js" "mvc_context" "mvc_context.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js" "sets" "sets.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js" "mvc_formula" "mvc_formula.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js" "utils_templates" "utils_templates.js"
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
call "%~dp0node_modules\.bin\terser" ui_catalog.js -c -m --toplevel -o ui_catalog.min.js
call "%~dp0node_modules\.bin\terser" mvc_context.js -c -m --toplevel -o mvc_context.min.js
call "%~dp0node_modules\.bin\terser" sets.js -c -m --toplevel -o sets.min.js
call "%~dp0node_modules\.bin\terser" mvc_formula.js -c -m --toplevel -o mvc_formula.min.js
call "%~dp0node_modules\.bin\terser" utils_templates.js -c -m --toplevel -o utils_templates.min.js
call "%~dp0node_modules\.bin\terser" formula-wizard.js -c -m --toplevel -o formula-wizard.min.js
popd

:formula-wizard-end


:php
echo.
echo Handling the PHP files
echo -----------------------

:php-minify
echo Minifying PHP files...
pushd %CD%
:: We minify the .php files to help with some weird spacing issues that cannot be fixed with CSS.
:: This issue is usually handled by the reverse-proxy or a middleware, but since I need to export SPA(s), I can't rely on it
for /r "%CD%" %%F in (*.php) do (
    set inputPath=%%F
    set outputPath=%%~dpnF.min.php

    echo ^> "!inputPath!" =^> "!outputPath!"
    call "%~dp0node_modules\.bin\html-minifier-terser" --conservative-collapse --collapse-inline-tag-whitespace ^
--collapse-whitespace --remove-comments --decode-entities --continue-on-parse-error -o "!outputPath!" "!inputPath!"
)
popd

:php-relink
echo Linking minified PHP files together...
pushd %CD%
:: We change every .php extension to .min.php in all the minified file.
:: I didn't use Python because it fails miserably with utf-8 symbols...
for /r "%CD%" %%F in (*.min.php) do (
    node "%~dp0php-relinker.js" "%%F"
)
popd

:php-end


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
