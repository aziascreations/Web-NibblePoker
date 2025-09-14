# Website - NibblePoker.lu
Public repository containing the source code for [nibblepoker.lu](https://nibblepoker.lu/) &
[nibblepoker.com](https://nibblepoker.com/).


## Features
* Projects
  * [CircuitPython - Ebyte E32 Driver](https://nibblepoker.lu/content/circuitpython-ebyte-e32/)
  * [DotNet-ListComPort](https://nibblepoker.lu/content/lscom-cli-dotnet/)
  * [Mini Dockerized CCTV NVR](https://nibblepoker.lu/content/docker-mini-cctv-nvr/)
  * [PEArch](https://nibblepoker.lu/content/pearch/)
* Web-based Tools
  * [Excel Password Remover](https://nibblepoker.lu/tools/excel-password-remover/)
  * [IBAN Generator](https://nibblepoker.lu/tools/iban-generator/)
  * [UUID Generator](https://nibblepoker.lu/tools/uuid-generator/)
  * [VAT Calculator](https://nibblepoker.lu/tools/vat-calculator/)


## Related Projects
* [aziascreations/Excel-Worksheet-Password-Remover](https://github.com/aziascreations/Excel-Worksheet-Password-Remover)


## Local Setup
Follow these steps to setup a local version of this website:
1. Install Python 3.13
2. Install Node JS 20+
3. Install Python Modules \
   `pip install --upgrade -r requirements.txt`
4. Install NPM modules \
   `.\scripts\nodejs-setup.cmd`
5. Compile the `.mjs` files into `.js` and `.min.js` \
   `.\scripts\compile-js-site.cmd`
6. [TODO: Install static files]
7. Setup environment variables:
   ```batch
   :: Batch
   set NP_HTML_POST_PROCESS=MINIFY
   set NP_FLASK_WAITRESS=1
   set NP_FLASK_PORT=80
   ```
   ```bash
   # Bash
   NP_HTML_POST_PROCESS=MINIFY
   NP_FLASK_WAITRESS=1
   NP_FLASK_PORT=80
   ```
8. Run [app.py](app.py) \
   `python ./app.py`


## Licenses
TODO
