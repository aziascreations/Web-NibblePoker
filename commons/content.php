<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

// Importing required scripts.
include_once 'commons/langs.php';

abstract class ContentDisplayType {
	const NONE = 0;
	const SEARCH = 1;
	const CONTENT = 2;
}

class ContentIndexEntry {
	public string $id;
	public ?array $title;
	public ?array $preamble;
	public string $image;
	public array $tags;
	public int $priority;
	
	function __construct(string $id, ?array $title, ?array $preamble, ?string $image, ?array $tags, ?int $priority) {
		$this->id = $id;
		$this->title = $title;
		$this->preamble = $preamble;
		$this->image = is_null($image) ? "/resources/NibblePoker/images/placeholder.png" : $image;
		$this->tags = is_null($tags) ? [] : $tags;
		$this->priority = is_null($priority) ? 0 : $priority;
	}
	
	static function from_json(array $json_data): ?ContentIndexEntry {
		if(!key_exists("id", $json_data)) {
			return null;
		}
		return new ContentIndexEntry(
			$json_data["id"],
			key_exists("title", $json_data) ? $json_data["title"] : null,
			key_exists("preamble", $json_data) ? $json_data["preamble"] : null,
			key_exists("image", $json_data) ? $json_data["image"] : null,
			key_exists("tags", $json_data) ? $json_data["tags"] : null,
			key_exists("priority", $json_data) ? $json_data["priority"] : null
		);
	}
}

class ContentManager {
	public ContentDisplayType|int $displayType;
	public bool $hasError;
	public string $errorMessageKey;
	public ?string $requestedId;
	public ?array $requestedTags;
	public ?array $rootIndexEntries;
	public ?string $contentFilepath;
	
	function __construct(string $contentRootPath, string $requestedUrl, ?string $urlTags) {
		// Preparing default values
		$this->displayType = ContentDisplayType::NONE;
		$this->hasError = false;
		$this->errorMessageKey = "content.error.message.none";
		$this->requestedId = NULL;
		$this->requestedTags = NULL;
		$this->rootIndexEntries = NULL;
		$this->contentFilepath = NULL;
		
		// Doing some standard things
		$this->processUrl($requestedUrl, $urlTags);
		if(!$this->hasError) {
			if($this->displayType == ContentDisplayType::SEARCH) {
				$this->loadRootIndex(realpath($contentRootPath . "/index.json"));
			} elseif($this->displayType == ContentDisplayType::CONTENT) {
				$this->prepareContentFilePath($contentRootPath);
			}
		}
	}
	
	function processUrl(string $requestedUrl, ?string $urlTags): void {
		// Doing some dark magic whose inner workings are lost to times...
		$requestedUrlPart = explode(
			"?",
			explode("#", preg_replace("^\/(content|tools)^", "", $requestedUrl))[0]
		)[0];
		
		if(strcmp($requestedUrlPart, "/") == 0) {
			$this->displayType = ContentDisplayType::SEARCH;
			
			if(is_null($urlTags)) {
				return;
			}
			
			if(strlen($urlTags) > 256) {
				$this->hasError = true;
				$this->errorMessageKey = "content.error.message.tags.length";
				return;
			}
			
			$explodedTags = explode(";", $urlTags);
			$this->requestedTags = count($explodedTags) > 0 ? array() : $this->requestedTags;
			for($i = 0; $i < count($explodedTags); $i++) {
				if(strlen($explodedTags[$i]) > 0) {
					if(ctype_alnum($explodedTags[$i])) {
						$this->requestedTags[] = $explodedTags[$i];
					} else {
						$this->hasError = true;
						$this->errorMessageKey = "content.error.message.tags.alphanumeric";
						return;
					}
				}
			}
		} else {
			$this->displayType = ContentDisplayType::CONTENT;
			$this->requestedId = ltrim(rtrim($requestedUrlPart, "/"), "/");
		}
	}
	
	function loadRootIndex(string $rootIndexFilepath): void {
		// Loading the content index.
		$rawJsonContent = file_get_contents($rootIndexFilepath);
		$jsonContent = json_decode($rawJsonContent, true);
		unset($rawJsonContent);
		
		$this->rootIndexEntries = array();
		for($i = 0; $i < count($jsonContent); $i++) {
			// Filtering out unwanted entries and putting their data in a proper class.
			if(!is_null($this->requestedTags)) {
				if(count(array_intersect($jsonContent[$i]["tags"], $this->requestedTags)) == 0) {
					continue;
				}
			}
			//if(count(array_intersect($jsonContent[$i]["tags"], $this->requestedTags)) == count($this->requestedTags)) {}
			
			// Parsing the raw data into a structure.
			$newIndexEntry = ContentIndexEntry::from_json($jsonContent[$i]);
			
			// Checking if it was parsed properly
			if(is_null($newIndexEntry)) {
				$this->hasError = true;
				$this->errorMessageKey = "content.error.message.failed.structure";
				return;
			} else {
				$this->rootIndexEntries[] = $newIndexEntry;
			}
		}
		unset($jsonContent);
		
		// Checking if we found any content for the user.
		if(count($this->rootIndexEntries) == 0) {
			// No relevant article/page were found for the given tags.
			$this->hasError = true;
			$this->errorMessageKey = "content.error.message.detect.empty";
			return;
		}
		
		// Sorting entries based on their priority
		usort($this->rootIndexEntries, function(ContentIndexEntry $a, ContentIndexEntry $b) {
			if($a->priority == $b->priority) {
				return 0;
			}
			return ($a->priority > $b->priority) ? -1 : 1;
		});
	}
	
	function prepareContentFilePath(string $contentRootPath): void {
		// Sanitizing the requested ID.
		if(!ctype_alnum(str_replace("-", "", $this->requestedId))) {
			$this->hasError = true;
			$this->errorMessageKey = "content.error.message.id.alphanumeric";
			return;
		}
		
		// Preparing and checking the content's info index file.
		$this->contentFilepath = get_content_file_path($contentRootPath, $this->requestedId);
		
		if(empty($this->contentFilepath)) {
			// File doesn't exist !
			$this->hasError = true;
			$this->errorMessageKey = "content.error.message.data.not.exist";
		}
	}
}

// Common utilities
function get_content_file_path(string $contentRootPath, string $contentId): ?string {
	if(ctype_alnum(str_replace("-", "", $contentId))) {
		return realpath($contentRootPath . "/items/" . $contentId . ".json");
	}
	return null;
}

// Functions for use in pages
function getContentManager(string $contentRootPath): ContentManager {
	return new ContentManager(
		$contentRootPath,
		l10n_url_switch(NULL),
		isset($_GET['tags']) ? htmlspecialchars($_GET['tags']) : NULL
	);
}

?>
