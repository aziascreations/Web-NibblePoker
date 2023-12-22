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
python compile_strings.py ./commons/strings/ ./commons/strings.json
python compile_strings.py ./wiki/strings/ ./wiki/strings.json

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
pushd %CD%
cd %~dp0\wiki\scss\
call "%~dp0node_modules\.bin\sass" nibblepoker-wiki.scss:../css/nibblepoker-wiki.css -q
call "%~dp0node_modules\.bin\sass" nibblepoker-wiki.scss:../css/nibblepoker-wiki.min.css -q --style compressed
popd

:sass-end


:libs
echo.
echo Handling the libraries
echo ----------------------

:libs-nibblepoker-minify
echo Minifying nibblepoker.js
pushd %CD%
cd %~dp0\resources\NibblePoker\js\
echo ^> resources\NibblePoker\js\nibblepoker.js
call "%~dp0node_modules\.bin\terser" nibblepoker.js -c -m -o nibblepoker.min.js
echo ^> resources\NibblePoker\js\nibblepoker-code.js
call "%~dp0node_modules\.bin\terser" nibblepoker-code.js -c -m -o nibblepoker-code.min.js
echo ^> resources\NibblePoker\js\nibblepoker-contributors.js
call "%~dp0node_modules\.bin\terser" nibblepoker-contributors.js -c -m -o nibblepoker-contributors.min.js
echo ^> resources\NibblePoker\js\nibblepoker-splide.js
call "%~dp0node_modules\.bin\terser" nibblepoker-splide.js -c -m -o nibblepoker-splide.min.js
popd

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

:libs-highlightjs
echo Handling HighlightJS
pushd %CD%
cd %~dp0\resources\HighlightJS\
echo ^> Clearing old files
del /Q /S /F highlight.js 2> nul 1> nul
del /Q /S /F highlight.min.js 2> nul 1> nul
echo ^> Installing dependencies
call npm install > nul
echo ^> Building for browsers
node tools/build.js -t browser sql php c cpp vbnet java yaml css scss bash ini python shell dockerfile cmake purebasic csharp 1> nul
echo ^> Moving final files
robocopy %CD%\build %CD% highlight.js highlight.min.js 1> nul
echo ^> Minifying used CSS files
call "%~dp0node_modules\.bin\sass" src/styles/atom-one-dark.css:src/styles/atom-one-dark.min.css -q --style compressed
popd

:libs-end

goto end

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
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js;formula_weaver.js" "decimal" "decimal.min.mjs"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js;formula_weaver.js" "lang" "lang.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js;formula_weaver.js" "formulas" "formulas.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js;formula_weaver.js" "units" "units.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js;formula_weaver.js" "ui_catalog" "ui_catalog.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js;formula_weaver.js" "mvc_context" "mvc_context.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js;formula_weaver.js" "sets" "sets.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js;formula_weaver.js" "mvc_formula" "mvc_formula.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js;formula_weaver.js" "formula_weaver" "formula_weaver.js"
call node "%~dp0fix-import-path.js" "formulas.js;lang.js;main.js;units.js;ui_catalog.js;mvc_context.js;sets.js;mvc_formula.js;utils_templates.js;formula_weaver.js" "utils_templates" "utils_templates.js"
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
call "%~dp0node_modules\.bin\terser" formula_weaver.js -c -m --toplevel -o formula_weaver.min.js
call "%~dp0node_modules\.bin\terser" formula-wizard.js -c -m --toplevel -o formula-wizard.min.js
popd

:formula-wizard-end


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
