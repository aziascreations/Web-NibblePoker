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

### Requirements
* Windows (x64) or Linux (x64/ARM64)
* PureBasic 6.21 LTS
  * *5.xx will not work !*
* Python 3.13
  * *Previous versions untested*
* Node JS 20+
* Docker *(Optional)*

### Pre-rendering
1. Install Python Modules \
   `pip install --upgrade -r requirements.txt`
2. Install NPM modules \
   `.\scripts\nodejs-setup.cmd`
3. Download external libs \
   `.\scripts\download-externals.ps1`
4. Compile the `.mjs` files \
   `.\scripts\compile-js-site.cmd`
5. Pre-render the pages \
   `python prerender.py`

### Docker on Windows
1. Compile FCGI apps via [Web-NibblePoker.pbp](Web-NibblePoker.pbp)
2. Setup Apache/Nginx/HAProxy/... to interact with FCGI apps \
   `./docker/RunDockerStuff.cmd`
3. Start static page server \
   `./cgi/RunLocalFcgi.cmd`
4. Start index page server \
   `???`
5. Open "http://localhost:5002/"

### Docker on Linux
1. Copy over the project on your Linux machine


## Licenses
TODO
