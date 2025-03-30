import mimetypes
import os
import re
from html import escape
from typing import Optional

from flask import Flask, request, send_from_directory, url_for, Response
from flask import render_template
from werkzeug.exceptions import HTTPException

from website.content import get_projects, get_tools, sanitize_input_tags, load_content_items, get_content, \
    get_applets, get_projects_languages, get_projects_by_languages
from website.contributors import reload_contributors_data
from website.domains import ALLOWED_DOMAINS
from website.l10n.utils import get_user_lang, localize, reload_strings, l10n_url_abs, l10n_url_switch, DEFAULT_LANG
from website.renderers.applet import render_applet_scripts, render_applet_head
from website.renderers.button import render_button
from website.renderers.code import render_code_block
from website.renderers.file_input import render_file_input
from website.renderers.headings import render_heading, render_h2, render_h1, render_h3, render_h4
from website.renderers.paragraph import render_paragraph
from website.renderers.lists import render_list_ul
from website.renderers.splide import render_splide
from website.renderers.standalone import get_standalone_common_headers
from website.sidebar import reload_sidebar_entries, get_sidebar_entries
from website.sitemap import reload_sitemap_entries, get_sitemap_entries

try:
    from rich import print
except ImportError:
    pass


app = Flask(
    import_name=__name__,
    static_folder='static',
    static_url_path='/',
    template_folder='templates',
)
app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True
app.jinja_env.strip_trailing_newlines = True

mimetypes.add_type('application/javascript', '.mjs')


if os.environ.get('NP_HTML_POST_PROCESS', "NONE") == "MINIFY":
    print("Using 'Flask-Minify' as HTML minifying post-processor")

    #from flask_minify import Minify
    #Minify(app=app, html=True, js=True, cssless=True)

    def post_process_html(html_content: str) -> str:
        return re.sub(r'\s+', ' ', html_content.replace('\n', ' '))

    # This fucking library breaks so much shit it's unbelievable.
    # And it takes FOREVER to compile because "MuH rUsT iS sUpErIoR"...
    # print("Using 'minify' as HTML post-processor")
    # from minify_html import minify
    # def post_process_html(html_content: str) -> str:
    #     return minify(html_content).replace("> <", "><")
elif os.environ.get('NP_HTML_POST_PROCESS', "NONE") == "BS4":
    print("Using 'BeautifulSoup4' as HTML non-minifying post-processor")

    from bs4 import BeautifulSoup

    def post_process_html(html_content: str) -> str:
        return BeautifulSoup(html_content, features="html.parser").prettify()
else:
    print("Using no HTML post-processor")

    def post_process_html(html_content: str) -> str:
        return html_content


@app.after_request
def add_common_headers(response):
    # print(response.headers)

    response.headers['X-Frame-Options'] = "deny"
    # #Header always set Content-Security-Policy "default-src 'self' files.nibblepoker.lu; img-src 'self'
    #   files.nibblepoker.lu data:; object-src 'none'; child-src 'self'; frame-ancestors 'none';
    #   upgrade-insecure-requests; block-all-mixed-content"
    response.headers['X-XSS-Protection'] = "1; mode=block"
    response.headers['Referrer-Policy'] = "no-referrer"
    response.headers['X-Content-Type-Options'] = "nosniff"
    response.headers['Strict-Transport-Security'] = "max-age=31536000; includeSubDomains; preload"
    response.headers['Access-Control-Allow-Origin'] = "*"
    response.headers['Permissions-Policy'] = "browsing-topics=(), interest-cohort=()"

    if app.debug:
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    else:
        response.headers['Cache-Control'] = "max-age=300, public"

    return response


# https://flask.palletsprojects.com/en/2.3.x/templating/#context-processors
@app.context_processor
def inject_processors():
    return dict(
        # Domain
        domain_host=request.headers['Host'],
        domain_tld=request.headers['Host'].split('.')[-1] if request.headers['Host'] in ALLOWED_DOMAINS else "lu",
        domain_url_root=request.url_root,

        # L10N
        l10n=localize,
        l10n_url_abs=l10n_url_abs,
        l10n_url_switch=l10n_url_switch,

        # Sidebar
        get_sidebar_entries=get_sidebar_entries,

        # Content
        get_content=get_content,
        get_applets=get_applets,
        # get_articles=get_articles,
        get_projects=get_projects,
        get_projects_by_languages=get_projects_by_languages,
        get_projects_languages=get_projects_languages,
        get_tools=get_tools,

        # Renderers
        render_button=render_button,
        render_heading=render_heading,
        render_h1=render_h1,
        render_h2=render_h2,
        render_h3=render_h3,
        render_h4=render_h4,
        render_paragraph=render_paragraph,
        render_list_ul=render_list_ul,
        render_splide=render_splide,
        render_applet_scripts=render_applet_scripts,
        render_applet_head=render_applet_head,
        render_code_block=render_code_block,
        render_file_input=render_file_input,

        # Commons
        url_for=url_for,
        escape=escape,

        # Standalone
        get_standalone_common_headers=get_standalone_common_headers
    )


@app.route('/favicon.svg')
@app.route('/favicon.ico')
def route_favicon():
    return send_from_directory(app.static_folder, 'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.route('/robots.txt')
def route_robots_txt():
    return Response(render_template("robots.jinja"), mimetype="")


@app.route('/sitemap.txt')
def route_sitemap():
    # FIXME: Add the domain !!!
    return Response("\n".join(get_sitemap_entries()), mimetype="")


@app.route('/', defaults={'lang': None})
@app.route('/en/', defaults={'lang': "en"})
@app.route('/fr/', defaults={'lang': "fr"})
def route_root(lang: Optional[str]):
    user_lang = get_user_lang(lang, request.headers.get("HTTP_ACCEPT_LANGUAGE"))

    return post_process_html(render_template(
        "pages/root.jinja",
        user_lang=user_lang,
        raw_lang=lang,
        request_path=request.path,
        is_standalone="standalone" in request.args,
        is_brandless="brandless" in request.args,
    )).replace("> <", "><")


@app.route('/contact/', defaults={'lang': None})
@app.route('/en/contact/', defaults={'lang': "en"})
@app.route('/fr/contact/', defaults={'lang': "fr"})
def route_contact(lang: Optional[str]):
    user_lang = get_user_lang(lang, request.headers.get("HTTP_ACCEPT_LANGUAGE"))

    return post_process_html(render_template(
        "pages/contact.jinja",
        user_lang=user_lang,
        raw_lang=lang,
        request_path=request.path,
        is_standalone="standalone" in request.args,
        is_brandless="brandless" in request.args,
    )).replace("> <", "><")


@app.route('/content/', defaults={'lang': None})
@app.route('/en/content/', defaults={'lang': "en"})
@app.route('/fr/content/', defaults={'lang': "fr"})
def route_content(lang: Optional[str]):
    user_lang = get_user_lang(lang, request.headers.get("HTTP_ACCEPT_LANGUAGE"))

    try:
        requested_tags = sanitize_input_tags(request.args.get("tags", ""))
    except ValueError:
        requested_tags = None

    return post_process_html(render_template(
        "pages/project_index.jinja",
        user_lang=user_lang,
        raw_lang=lang,
        request_path=request.path,
        is_standalone="standalone" in request.args,
        is_brandless="brandless" in request.args,
        requested_tags=requested_tags,
    )).replace("> <", "><")


@app.route('/content/<project_id>/', defaults={'lang': None})
@app.route('/en/content/<project_id>/', defaults={'lang': "en"})
@app.route('/fr/content/<project_id>/', defaults={'lang': "fr"})
def route_content_project(lang: Optional[str], project_id: str):
    user_lang = get_user_lang(lang, request.headers.get("HTTP_ACCEPT_LANGUAGE"))

    error_key: Optional[str] = None
    error_code: int = 200
    if not project_id.replace("-", "").isalnum():
        error_key = "content_id_alphanumeric"
        error_code = 400
    elif project_id not in get_projects().keys():
        error_key = "content_id_not_exist"
        error_code = 404

    if error_key is not None:
        return post_process_html(render_template(
            "pages/error.jinja",
            user_lang=user_lang,
            raw_lang=lang,
            request_path=request.path,
            is_standalone="standalone" in request.args,
            is_brandless="brandless" in request.args,
            error_key=error_key,
            error_code=error_code,
        )).replace("> <", "><"), error_code
    else:
        return post_process_html(render_template(
            "projects/" + project_id + ".jinja",
            user_lang=user_lang,
            raw_lang=lang,
            request_path=request.path,
            is_standalone="standalone" in request.args,
            is_brandless="brandless" in request.args,
            project_data=get_projects().get(project_id),
            project_id=project_id,
        )).replace("> <", "><")


@app.route('/tools/', defaults={'lang': None})
@app.route('/en/tools/', defaults={'lang': "en"})
@app.route('/fr/tools/', defaults={'lang': "fr"})
def route_tools_index(lang: Optional[str]):
    user_lang = get_user_lang(lang, request.headers.get("HTTP_ACCEPT_LANGUAGE"))

    try:
        requested_tags = sanitize_input_tags(request.args.get("tags", ""))
    except ValueError:
        requested_tags = None

    return post_process_html(render_template(
        "pages/tools_index.jinja",
        user_lang=user_lang,
        raw_lang=lang,
        request_path=request.path,
        is_standalone="standalone" in request.args,
        is_brandless="brandless" in request.args,
        requested_tags=requested_tags,
    )).replace("> <", "><")


@app.route('/tools/<tool_id>/', defaults={'lang': None})
@app.route('/en/tools/<tool_id>/', defaults={'lang': "en"})
@app.route('/fr/tools/<tool_id>/', defaults={'lang': "fr"})
def route_tools_page(lang: Optional[str], tool_id: str):
    user_lang = get_user_lang(lang, request.headers.get("HTTP_ACCEPT_LANGUAGE"))

    error_key: Optional[str] = None
    error_code: int = 200
    if not tool_id.replace("-", "").isalnum():
        error_key = "content_id_alphanumeric"
        error_code = 400
    elif tool_id not in get_tools().keys():
        error_key = "content_id_not_exist"
        error_code = 404

    if error_key is not None:
        return post_process_html(render_template(
            "pages/error.jinja",
            user_lang=user_lang,
            raw_lang=lang,
            request_path=request.path,
            is_standalone="standalone" in request.args,
            is_brandless="brandless" in request.args,
            error_key=error_key,
            error_code=error_code,
        )).replace("> <", "><"), error_code
    else:
        return post_process_html(render_template(
            "pages/tools_page.jinja",
            user_lang=user_lang,
            raw_lang=lang,
            request_path=request.path,
            is_standalone="standalone" in request.args,
            is_brandless="brandless" in request.args,
            tool_data=get_tools().get(tool_id),
            tool_id=tool_id,
            applet_data=get_applets().get(get_tools().get(tool_id).applet_id),
        )).replace("> <", "><")


@app.route('/about/', defaults={'lang': None})
@app.route('/en/about/', defaults={'lang': "en"})
@app.route('/fr/about/', defaults={'lang': "fr"})
def route_about(lang: Optional[str]):
    user_lang = get_user_lang(lang, request.headers.get("HTTP_ACCEPT_LANGUAGE"))
    return post_process_html(render_template(
        "pages/about.jinja",
        user_lang=user_lang,
        raw_lang=lang,
        request_path=request.path,
        is_standalone="standalone" in request.args,
        is_brandless="brandless" in request.args,
    )).replace("> <", "><")


@app.route('/privacy/', defaults={'lang': None})
@app.route('/en/privacy/', defaults={'lang': "en"})
@app.route('/fr/privacy/', defaults={'lang': "fr"})
def route_privacy(lang: Optional[str]):
    user_lang = get_user_lang(lang, request.headers.get("HTTP_ACCEPT_LANGUAGE"))
    return post_process_html(render_template(
        "pages/privacy.jinja",
        user_lang=user_lang,
        raw_lang=lang,
        request_path=request.path,
        is_standalone="standalone" in request.args,
        is_brandless="brandless" in request.args,
    )).replace("> <", "><")


@app.route('/links/', defaults={'lang': None})
@app.route('/en/links/', defaults={'lang': "en"})
@app.route('/fr/links/', defaults={'lang': "fr"})
def route_links(lang: Optional[str]):
    user_lang = get_user_lang(lang, request.headers.get("HTTP_ACCEPT_LANGUAGE"))
    return post_process_html(render_template(
        "pages/links.jinja",
        user_lang=user_lang,
        raw_lang=lang,
        request_path=request.path,
        is_standalone="standalone" in request.args,
        is_brandless="brandless" in request.args,
    )).replace("> <", "><")


@app.route('/debug/', defaults={'lang': None})
@app.route('/en/debug/', defaults={'lang': "en"})
@app.route('/fr/debug/', defaults={'lang': "fr"})
def route_debug(lang: Optional[str]):
    user_lang = get_user_lang(lang, request.headers.get("HTTP_ACCEPT_LANGUAGE"))
    return post_process_html(render_template(
        "pages/debug.jinja",
        user_lang=user_lang,
        raw_lang=lang,
        request_path=request.path,
        is_standalone="standalone" in request.args,
        is_brandless="brandless" in request.args,
    )).replace("> <", "><")


@app.errorhandler(Exception)
def handle_exception(e: Exception):
    # FIXME: Use the user's lang !
    # user_lang = get_user_lang(lang, request.headers.get("HTTP_ACCEPT_LANGUAGE"))

    error_code = 500

    if isinstance(e, HTTPException):
        error_code = e.code

    return post_process_html(render_template(
        "pages/error.jinja",
        user_lang=DEFAULT_LANG,
        raw_lang=DEFAULT_LANG,
        request_path=request.path,
        is_standalone="standalone" in request.args,
        is_brandless="brandless" in request.args,
        error_key=str(e.code),
        error_code=e.code,
    )).replace("> <", "><"), error_code


if __name__ == '__main__':
    load_content_items()
    reload_strings(os.path.join(os.getcwd(), "data/strings/"))
    reload_sidebar_entries(os.path.join(os.getcwd(), "data/sidebar.yml"))
    reload_contributors_data(os.path.join(os.getcwd(), "data/contributors.yml"))
    reload_sitemap_entries(os.path.join(os.getcwd(), "data/sitemap.yml"))

    if os.environ.get('NP_FLASK_WAITRESS', "0") == "1":
        print("Serving app using waitress.")
        from waitress import serve
        serve(app, host='0.0.0.0', port=int(os.environ.get('NP_FLASK_PORT', "5000")), threads=64)
    else:
        print("Serving app using default development server.")
        app.run(
            host="0.0.0.0",
            port=int(os.environ.get('NP_FLASK_PORT', "5000")),
            debug=True,
            # debug=False,
            load_dotenv=False
        )
