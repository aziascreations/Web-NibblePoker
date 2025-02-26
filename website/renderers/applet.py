import os

from flask import url_for

from website.content import ContentApplet


def render_applet_head(applet_data: ContentApplet, is_standalone: bool = False) -> str:
    applet_style_html = ""

    for applet_style in applet_data.resources.stylesheets:
        rsc_path = None

        if is_standalone:
            if not applet_style.can_be_standalone():
                continue

            if applet_style.is_applet():
                rsc_path = os.path.join(
                    "./static/resources/NibblePoker/applets/",
                    applet_data.id,
                    applet_style.get_clean_path())
                print(applet_style)
            elif applet_style.is_standalone():
                rsc_path = os.path.join(
                    "./static/resources/Standalone/",
                    applet_style.get_clean_path())

            if rsc_path is not None:
                with open(rsc_path) as applet_style_file:
                    applet_style_html += "<style>" + applet_style_file.read() + "</style>"

        else:
            if applet_style.is_applet():
                rsc_path = url_for(
                    "static",
                    filename="/resources/NibblePoker/applets/" +
                             applet_data.id + "/" +
                             applet_style.get_clean_path())
            elif applet_style.is_remote():
                rsc_path = applet_style.raw_uri

            if rsc_path is not None:
                applet_style_html += f"<link rel='stylesheet' href='{rsc_path}'>"

    return applet_style_html


def render_applet_scripts(applet_data: ContentApplet, is_standalone: bool = False):
    applet_script_html = ""

    for applet_script in applet_data.resources.scripts:
        rsc_path = None

        if is_standalone:
            if not applet_script.can_be_standalone():
                continue

            if applet_script.is_applet():
                rsc_path = os.path.join(
                    "./static/resources/NibblePoker/applets/",
                    applet_data.id,
                    applet_script.get_clean_path())
            elif applet_script.is_standalone():
                rsc_path = os.path.join(
                    "./static/resources/Standalone/",
                    applet_script.get_clean_path())

            if rsc_path is not None:
                with open(rsc_path) as applet_script_file:
                    applet_script_html += "<script" +(" type='module'>" if applet_script.raw_uri.endswith(".mjs") else ">")
                    applet_script_html += applet_script_file.read()
                    applet_script_html += "</script>"

        else:
            if applet_script.is_applet():
                rsc_path = url_for(
                    "static",
                    filename="/resources/NibblePoker/applets/" +
                             applet_data.id + "/" +
                             applet_script.get_clean_path())
            elif applet_script.is_remote():
                rsc_path = applet_script.raw_uri

            if rsc_path is not None:
                applet_script_html += f"<script src='{rsc_path}'{
                    " type='module'" if applet_script.raw_uri.endswith(".mjs") else ""
                }></script>"

    return applet_script_html
