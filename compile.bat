@echo off

cd /D "%~dp0"

:compile-lang
echo Compiling lang files...
python commons/strings/compile.py

:compile-sass
echo Compiling SASS files...
pushd %CD%
cd %~dp0\resources\NibblePoker\scss\
call "%~dp0node_modules\.bin\sass" nibblepoker.scss:../css/nibblepoker.css -q
call "%~dp0node_modules\.bin\sass" nibblepoker.scss:../css/nibblepoker.min.css -q --style compressed
popd

:compile-typescript
echo Compiling TypeScript for ".js" files...
call .\node_modules\.bin\tsc

:fix-typescript-imports
echo Fixing import paths for ".js" files manually...
node .\fix-import-path.js "tools/items/formula-wizard/code.js" "decimal" "decimal.min.mjs"

:minify-js
echo Minifying JS manually...
pushd %CD%

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
