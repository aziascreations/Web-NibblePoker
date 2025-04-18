import os
from typing import Any

from locked_dict.locked_dict import LockedDict
import yaml

from .dataclasses import *

__CONTENT: ContentRoot = ContentRoot()


def get_content() -> ContentRoot:
    return __CONTENT


def get_applets() -> LockedDict[str, ContentApplet]:
    return __CONTENT.applets


#def get_articles() -> LockedDict:
#    return __CONTENT.a


def get_projects() -> LockedDict[str, ContentProject]:
    return __CONTENT.projects


def get_sorted_projects_by_tags(tags: Optional[list[str]]) -> list[ContentProject]:
    if tags is None:
        return sorted(__CONTENT.projects.values(), key=lambda x: x.metadata.index.priority, reverse=True)
    elif len(tags) == 0:
        return sorted(__CONTENT.projects.values(), key=lambda x: x.metadata.index.priority, reverse=True)
    else:
        returned_list = [
            x for x in __CONTENT.projects.values()
            if any(tag in x.metadata.general.tags for tag in tags)
        ]
        return sorted(returned_list, key=lambda x: x.metadata.index.priority, reverse=True)


def get_projects_by_languages(languages: list[str]) -> dict[Any, ContentProject]:
    project_obj: ContentProject
    return {
        project_key: project_value for project_key, project_value in __CONTENT.projects.items()
        if any(language in project_value.metadata.general.languages for language in languages)
    }


def get_projects_languages() -> list[str]:
    return __CONTENT.projects_languages


def get_tools() -> LockedDict[str, ContentTool]:
    return __CONTENT.tools


def get_sorted_tools_by_tags(tags: Optional[list[str]]) -> list[ContentProject]:
    if tags is None:
        return sorted(__CONTENT.tools.values(), key=lambda x: x.metadata.index.priority, reverse=True)
    elif len(tags) == 0:
        return sorted(__CONTENT.tools.values(), key=lambda x: x.metadata.index.priority, reverse=True)
    else:
        returned_list = [
            x for x in __CONTENT.tools.values()
            if any(tag in x.metadata.general.tags for tag in tags)
        ]
        return sorted(returned_list, key=lambda x: x.metadata.index.priority, reverse=True)


def sanitize_input_tags(input_tags: str) -> list[str]:
    tags: list[str] = input_tags.split(";")
    for tag in tags:
        if not tag.isalnum() or len(tag) == 0:
            raise ValueError(f"Non-alphanumeric or empty tag was given !")
    return tags


def load_content_items() -> None:
    global __CONTENT

    __CONTENT = ContentRoot()

    # Loading applets definition files
    for applets_file in os.listdir(os.path.join(os.getcwd(), "data/applets")):
        applets_file_path = os.path.join(os.getcwd(), "data/applets", applets_file)
        if not os.path.isfile(applets_file_path) or applets_file.startswith("."):
            continue

        applets_data = yaml.safe_load(open(applets_file_path))
        if "applets" not in applets_data:
            print(f"Unable to load '{applets_file_path}' due to missing 'applets' field !")
            continue

        for applet_data in applets_data["applets"]:
            _applet = ContentApplet(**applet_data)
            __CONTENT.applets[_applet.id] = _applet

    # Loading articles definition files
    """for article_folder in os.listdir(os.path.join(os.getcwd(), "data/articles")):
        article_folder_path = os.path.join(os.getcwd(), "data/articles", article_folder)
        if not os.path.isdir(article_folder_path):
            continue
        pass"""

    # Loading projects definition files
    for project_file in os.listdir(os.path.join(os.getcwd(), "data/projects")):
        project_file_path = os.path.join(os.getcwd(), "data/projects", project_file)
        if not os.path.isfile(project_file_path) or project_file.startswith("."):
            continue

        projects_data = yaml.safe_load(open(project_file_path))
        if "projects" not in projects_data:
            print(f"Unable to load '{project_file_path}' due to missing 'projects' field !")
            continue

        for project_data in projects_data["projects"]:
            _project = ContentProject(**project_data)
            __CONTENT.projects[_project.id] = _project
            #print(_project)

    # Loading tools definition files
    for tools_file in os.listdir(os.path.join(os.getcwd(), "data/tools")):
        tools_file_path = os.path.join(os.getcwd(), "data/tools", tools_file)
        if not os.path.isfile(tools_file_path) or tools_file.startswith("."):
            continue

        tools_data = yaml.safe_load(open(tools_file_path))
        if "tools" not in tools_data:
            print(f"Unable to load '{tools_file_path}' due to missing 'tools' field !")
            continue

        for tool_data in tools_data["tools"]:
            _tool = ContentTool(**tool_data)
            __CONTENT.tools[_tool.id] = _tool
            #print(_tool)

        # FIXME: Check if the required files exist too !"""

    # Preparing some more stuff
    for project in __CONTENT.projects.values():
        __CONTENT.projects_languages.extend(project.metadata.general.languages)
    __CONTENT.projects_languages = list(set(__CONTENT.projects_languages))
    __CONTENT.projects_languages.sort()
    #print(__CONTENT.projects_languages)


def validate_content_items() -> bool:
    pass
