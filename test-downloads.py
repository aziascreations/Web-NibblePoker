from nibblepoker.website.adam.l10n import load_strings
from nibblepoker.website.downloads.rendering import render_release_version
from nibblepoker.website.downloads.structures import ReleaseVersionRepository
from nibblepoker.website.downloads.utils import group_single_release

from rich import print

# Loading and processing brands
downloads_repo = ReleaseVersionRepository()
downloads_repo.load_folder("./data/downloads")

#print(downloads_repo.get_all_downloads())

release_data = downloads_repo.get_releases_for("pearch")[0]
release_groups = group_single_release(release_data)
print(release_groups)

localizer = load_strings("./data/strings")

print("")
print(render_release_version(
    release_data, release_groups, localizer, "en"
))
