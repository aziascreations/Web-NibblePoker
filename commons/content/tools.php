<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

// Including required helpers.
include_once 'commons/config.php';
include_once 'commons/langs.php';
include_once 'commons/content.php';

// Required to make headings
include_once 'commons/DOM/utils.php';

// Defining the template types.
class ToolInfoFile {
	public string $domFile;
	public ?string $langFile;
	public array $codeFilesPaths;
	public array $styleFilesPaths;
	public string $icon;
	public string $titleKey;
	public ?string $subTitleKey;
	
	function __construct(string $domFile, ?string $langFile, ?array $codeFilesPaths, ?array $styleFilesPaths,
						 ?string $icon, ?string $titleKey, ?string $subTitleKey) {
		$this->domFile = $domFile;
		$this->langFile = $langFile;
		$this->codeFilesPaths = is_null($codeFilesPaths) ? array() : $codeFilesPaths;
		$this->styleFilesPaths = is_null($styleFilesPaths) ? array() : $styleFilesPaths;
		$this->icon = is_null($icon) ? "fad fa-question" : $icon;
		$this->titleKey = is_null($titleKey) ? "unset" : $titleKey;
		$this->subTitleKey = $subTitleKey;
	}
	
	static function from_json(array $json_data): ?ToolInfoFile {
		if(!key_exists("dom", $json_data)) {
			return null;
		}
		return new ToolInfoFile(
			$json_data["dom"],
			key_exists("lang", $json_data) ? $json_data["lang"] : null,
			key_exists("code", $json_data) ? $json_data["code"] : null,
			key_exists("styles", $json_data) ? $json_data["styles"] : null,
			key_exists("icon", $json_data) ? $json_data["icon"] : null,
			key_exists("title", $json_data) ? $json_data["title"] : null,
			key_exists("subtitle", $json_data) ? $json_data["subtitle"] : null
		);
	}
	
	function validateFiles(ContentManager $contentManager): void {
		if(!(file_exists($this->domFile) && is_file($this->domFile))) {
			$contentManager->hasError = true;
			$contentManager->errorMessageKey = "content.error.message.missing.file.dom";
			return;
		}
		
		if(!is_null($this->langFile)) {
			if(!(file_exists($this->langFile) && is_file($this->langFile))) {
				$contentManager->hasError = true;
				$contentManager->errorMessageKey = "content.error.message.missing.file.lang";
				return;
			}
		}
		
		foreach($this->codeFilesPaths as $codeFilePath) {
			if(!(file_exists($codeFilePath) && is_file($codeFilePath))) {
				$contentManager->hasError = true;
				$contentManager->errorMessageKey = "content.error.message.missing.file.code";
				return;
			}
		}
		
		foreach($this->styleFilesPaths as $styleFilePath) {
			if(!(file_exists($styleFilePath) && is_file($styleFilePath))) {
				$contentManager->hasError = true;
				$contentManager->errorMessageKey = "content.error.message.missing.file.style";
				return;
			}
		}
	}
}

abstract class ToolsContent {
	static function loadItemIndexFile(ContentManager $contentManager, string $contentRootPath): ?ToolInfoFile {
		// Preliminary check
		if(!$contentManager->displayType == ContentDisplayType::CONTENT) {
			$contentManager->hasError = true;
			$contentManager->errorMessageKey = "content.error.message.cannot.load.item.as.not.content";
			return null;
		}
		
		// Loading the index file
		$itemIndexJsonData = json_decode(file_get_contents($contentManager->contentFilepath), true);
		if(is_null($itemIndexJsonData)) {
			return null;
		}
		$toolInfo = ToolInfoFile::from_json($itemIndexJsonData);
		unset($itemIndexJsonData);
		
		// Making paths absolute
		if(!is_null($toolInfo)) {
			$toolInfo->domFile = realpath($contentRootPath . "/items/" . $toolInfo->domFile);
			if(!is_null($toolInfo->langFile)) {
				$toolInfo->langFile = realpath($contentRootPath . "/items/" . $toolInfo->langFile);
			}
			for($iCodeFilePath = 0; $iCodeFilePath < count($toolInfo->codeFilesPaths); $iCodeFilePath++) {
				$toolInfo->codeFilesPaths[$iCodeFilePath] = realpath(
					$contentRootPath . "/items/" . $toolInfo->codeFilesPaths[$iCodeFilePath]);
			}
			for($iStyleFilePath = 0; $iStyleFilePath < count($toolInfo->styleFilesPaths); $iStyleFilePath++) {
				$toolInfo->styleFilesPaths[$iStyleFilePath] = realpath(
					$contentRootPath . "/items/" . $toolInfo->styleFilesPaths[$iStyleFilePath]);
			}
		} else {
			$contentManager->hasError = true;
			$contentManager->errorMessageKey = "content.error.message.cannot.load";
		}
		
		return $toolInfo;
	}
}
?>