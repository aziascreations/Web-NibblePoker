from flask import url_for

from website.content import ContentApplet


def render_applet_head(applet_data: ContentApplet) -> str:
    applet_style_html = ""

    for applet_style in applet_data.resources.stylesheets:
        applet_style_html += ("<link rel='stylesheet' href='" +
                              url_for(
                                  "static",
                                  filename="/resources/NibblePoker/applets/" + applet_data.id + "/" + applet_style) +
                              "'>")

    return applet_style_html


def render_applet_scripts(applet_data: ContentApplet):
    applet_script_html = ""

    for applet_script in applet_data.resources.scripts:
        applet_script_html += ("<script src='" +
                               url_for(
                                   "static",
                                   filename="/resources/NibblePoker/applets/" + applet_data.id + "/" + applet_script) +
                               "'" + (" type='module'" if applet_script.endswith(".mjs") else "") + "></script>")

    return applet_script_html
