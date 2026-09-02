from dataclasses import dataclass
from typing import Optional

from nibblepoker.website.downloads.structures import ReleaseVersion
from nibblepoker.website.downloads.tags import TAG_GROUPS, Tag


@dataclass
class ReleaseVersionGroup:
    tag: Tag
    subs: Optional[list[ReleaseVersionGroup]]
    values: Optional[list[str]]

    def count_subgroups(self) -> int:
        if self.subs is not None:
            return len(self.subs)
        if self.values is not None:
            return 0
        raise Exception("Both subgroups and values are None !")


def _make_download_tags_tree(remaining_tags: list[str]) -> list[ReleaseVersionGroup]:
    returned_groups = list()

    if remaining_tags[0] not in TAG_GROUPS:
        raise Exception(f"The {remaining_tags[0]} isn't known !")

    # Creating the groups for this tag
    for tag in TAG_GROUPS[remaining_tags[0]]:
        returned_groups.append(ReleaseVersionGroup(tag, None, None))

    # Populating the subs and values
    for returned_group in returned_groups:
        if len(remaining_tags) > 1:
            returned_group.subs = _make_download_tags_tree(remaining_tags[1:])
        else:
            returned_group.values = list()

    return returned_groups


def _add_download_tags_entries(artifacts: list[str], download_groups: list[ReleaseVersionGroup],
                               parent_tags: Optional[list[Tag]] = None) -> None:
    if parent_tags is None:
        parent_tags = list()

    for download_group in download_groups:
        current_tags = parent_tags + [download_group.tag]

        if download_group.subs is not None:
            _add_download_tags_entries(artifacts, download_group.subs, current_tags)
        elif download_group.values is not None:

            for artifact in artifacts:
                had_all_tags = True

                for tag in current_tags:
                    if not tag.matches(artifact):
                        had_all_tags = False
                        break

                if had_all_tags:
                    download_group.values.append(artifact)
        else:
            raise Exception("Both subgroups and values are None !")


def group_single_release(release_data: ReleaseVersion) -> list[ReleaseVersionGroup]:
    # Preparing the structure
    groups: list[ReleaseVersionGroup] = _make_download_tags_tree(release_data.columns)

    # Adding the entries
    _add_download_tags_entries(release_data.artifacts, groups)

    return groups
