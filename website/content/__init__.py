import os
from pathlib import Path
from typing import Any

from locked_dict.locked_dict import LockedDict
import yaml

from .metadata import ContentMetadata
from .project import ContentProject
from .tool import ContentTool, ContentToolData

__CONTENT_ARTICLES: LockedDict = LockedDict()
__CONTENT_PROJECTS: LockedDict[str, ContentProject] = LockedDict()
__CONTENT_TOOLS: LockedDict[str, ContentTool] = LockedDict()


def get_articles() -> LockedDict:
    return __CONTENT_ARTICLES


def get_projects() -> LockedDict[str, ContentProject]:
    return __CONTENT_PROJECTS


def get_projects_by_tags(tags: list[str]) -> dict[Any, ContentProject]:
    project_obj: ContentProject
    return {
        project_key: project_value for project_key, project_value in __CONTENT_PROJECTS.items()
        if any(tag in project_value.metadata.general.tags for tag in tags)
    }


def sanitize_input_tags(input_tags: str) -> list[str]:
    tags: list[str] = input_tags.split(";")
    for tag in tags:
        if not tag.isalnum() or len(tag) == 0:
            raise ValueError(f"Non-alphanumeric or empty tag was given !")
    return tags


def get_tools() -> LockedDict:
    return __CONTENT_TOOLS


def get_tools_by_tags(tags: list[str]) -> dict[Any, ContentProject]:
    tool_obj: ContentProject
    return {
        tool_key: tool_value for tool_key, tool_value in __CONTENT_TOOLS.items()
        if any(tag in tool_value.metadata.general.tags for tag in tags)
    }


def reload_content_items() -> None:
    global __CONTENT_ARTICLES
    global __CONTENT_PROJECTS
    global __CONTENT_TOOLS

    __CONTENT_ARTICLES = LockedDict()
    __CONTENT_PROJECTS = LockedDict()
    __CONTENT_TOOLS = LockedDict()

    for article_folder in os.listdir(os.path.join(os.getcwd(), "data/articles")):
        article_folder_path = os.path.join(os.getcwd(), "data/articles", article_folder)
        if not os.path.isdir(article_folder_path):
            continue
        pass

    for project_item in os.listdir(os.path.join(os.getcwd(), "data/projects")):
        project_item_path = os.path.join(os.getcwd(), "data/projects/", project_item)
        if not os.path.isfile(project_item_path) or project_item.startswith("."):
            continue

        project_id = Path(project_item_path).stem
        project_page_path = os.path.join(os.getcwd(), f"templates/projects/{project_id}.jinja")

        if not all(os.path.isfile(project_file) for project_file in
                   [project_item_path, project_page_path]):
            print(f"Unable to load project '{project_item}' due to missing files !")
            continue

        try:
            __CONTENT_PROJECTS[project_id] = ContentProject(
                id=project_id,
                metadata=ContentMetadata(**yaml.safe_load(open(project_item_path))),
                # strings=json.load(open(project_strings_path))  # Deprecated
            )
            print(f"Loaded project '{project_id}'")
        except Exception as e:
            print(f"Unable to load project '{project_id}' due to an exception !")
            print(e)

    for tool_item in os.listdir(os.path.join(os.getcwd(), "data/tools")):
        tool_item_path = os.path.join(os.getcwd(), "data/tools", tool_item)
        if not os.path.isfile(tool_item_path) or tool_item_path.startswith("."):
            continue

        tool_id = Path(tool_item_path).stem
        tool_page_path = os.path.join(os.getcwd(), f"templates/tools/{tool_id}.jinja")

        if not all(os.path.isfile(project_file) for project_file in
                   [tool_item_path, tool_page_path]):
            print(f"Unable to load tool '{tool_id}' due to missing files !")
            continue

        tool_data: ContentTool
        try:
            raw_tool_data = yaml.safe_load(open(tool_item_path))
            __CONTENT_TOOLS[tool_id] = ContentTool(
                id=tool_id,
                metadata=ContentMetadata(**raw_tool_data["metadata"]),
                data=ContentToolData(**raw_tool_data["data"]),
            )
            print(f"Loaded tool '{tool_id}'")
        except Exception as e:
            print(f"Unable to load tool '{tool_id}' due to an exception !")
            print(e)
            continue

        # FIXME: Check if the required files exist too !
