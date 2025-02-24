import os

from flask import url_for

from website.content import ContentApplet


def render_applet_head(applet_data: ContentApplet, is_standalone: bool = False) -> str:
    applet_style_html = ""

    for applet_style in applet_data.resources.stylesheets:
        if is_standalone:
            with open(os.path.join("./static/resources/NibblePoker/applets/", applet_data.id, applet_style)) as applet_style_file:
                applet_style_html += "<style>" + applet_style_file.read() + "</style>"
        else:
            applet_style_html += ("<link rel='stylesheet' href='" +
                                  url_for(
                                      "static",
                                      filename="/resources/NibblePoker/applets/" + applet_data.id + "/" + applet_style) +
                                  "'>")

    return applet_style_html


def render_applet_scripts(applet_data: ContentApplet, is_standalone: bool = False):
    applet_script_html = ""

    for applet_script in applet_data.resources.scripts:
        if is_standalone:
            with open(os.path.join("./static/resources/NibblePoker/applets/", applet_data.id, applet_script)) as applet_script_file:
                applet_script_html += "<script" + (" type='module'>" if applet_script.endswith(".mjs") else ">")
                applet_script_html += applet_script_file.read()
                applet_script_html += "</script>"
        else:
            applet_script_html += ("<script src='" +
                                   url_for(
                                       "static",
                                       filename="/resources/NibblePoker/applets/" + applet_data.id + "/" + applet_script) +
                                   "'" + (" type='module'" if applet_script.endswith(".mjs") else "") + "></script>")

    return applet_script_html
