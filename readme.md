# Website - NibblePoker.lu
Public repository containing the source code for the *nibblepoker.lu* & *nibblepoker.com* websites.


## Features
TODO


## Related Projects
TODO


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
