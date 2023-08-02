<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

// Including required helpers.
include_once 'commons/langs.php';

class OpenGraphData {
	public string $title;
	public string $description;
	public string $type;
	public string $url;
	public string $image;
	public string $image_type;
	
	function __construct(array $title, array $description, string $type, string $url, string $image,
	                     string $image_type) {
		global $default_language;
		global $user_language;
		
		$this->title = array_key_exists($user_language, $title) ? $title[$user_language] :
			(array_key_exists($default_language, $title) ? $title[$default_language] : $title[0]);
		$this->description = array_key_exists($user_language, $description) ? $description[$user_language] :
			(array_key_exists($default_language, $description) ? $description[$default_language] : $description[0]);
		
		$this->type = $type;
		$this->url = $url;
		$this->image = $image;
		$this->image_type = $image_type;
	}
	
	static function from_json(array $json_data): ?OpenGraphData {
		foreach(["title", "description", "type", "url", "image", "image_type"] as $wantedKey) {
			if(!key_exists($wantedKey, $json_data)) {
				return null;
			}
		}
		
		return new OpenGraphData(
			$json_data["title"],
			$json_data["description"],
			$json_data["type"],
			$json_data["url"],
			$json_data["image"],
			$json_data["image_type"]
		);
	}
}
