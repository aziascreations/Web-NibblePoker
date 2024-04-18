<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

// Including required helpers.
include_once 'commons/langs.php';

/**
 * This class assumes that the Python-based preprocessor has
 *  created and pre-validated all required fields for this object.
 */
class ContentMetadata {
	public string $metaTitleKey;
	public string $metaDescriptionKey;
	public string $metaAuthor;
	
	public string $openGraphTitleKey;
	public string $openGraphDescriptionKey;
	public string $openGraphType;
	public string $openGraphUrl;
	public string $openGraphImage;
	public string $openGraphImageMime;
	
	public string $twitterCardType;
	public string $twitterCardSite;
	public string $twitterCardTitleKey;
	public string $twitterCardDescriptionKey;
	public string $twitterCardImageUrl;
	public ?string $twitterCardImageAltKey;
	public string $twitterCardCreatorHandle;
	
	/**
	 * Prints all the HTML tags associated with that metadata.
	 * @return void - Returns nothing
	 */
	public function renderHtml(): void {
		// Standard meta tags
		echo('<title>' . localize($this->metaTitleKey) . '</title>');
		echo('<meta name="description" content="' . localize($this->metaDescriptionKey) . '" />');
		echo('<meta name="author" content="' . $this->metaAuthor . '" />');
		
		// OpenGraph tags
		echo('<meta property="og:title" content="' . localize($this->openGraphTitleKey) . '" />');
		echo('<meta property="og:description" content="' . localize($this->openGraphDescriptionKey) . '" />');
		echo('<meta property="og:type" content="' . $this->openGraphType . '" />');
		echo('<meta property="og:url" content="' . $this->openGraphUrl . '" />');
		echo('<meta property="og:image" content="' . $this->openGraphImage . '" />');
		echo('<meta property="og:image:type" content="' . $this->openGraphImageMime . '" />');
		
		// Twitter tags
		echo('<meta name="twitter:card" content="' . $this->twitterCardType . '" />');
		echo('<meta name="twitter:site" content="' . $this->twitterCardSite . '" />');
		echo('<meta name="twitter:title" content="' . localize($this->twitterCardTitleKey) . '" />');
		echo('<meta name="twitter:description" content="' . localize($this->twitterCardDescriptionKey) . '" />');
		echo('<meta name="twitter:image" content="' . $this->twitterCardImageUrl . '" />');
		if(!is_null($this->twitterCardImageAltKey)) {
			echo('<meta name="twitter:image:alt" content="' . localize($this->twitterCardImageAltKey) . '" />');
		}
		echo('<meta name="twitter:creator" content="' . $this->twitterCardCreatorHandle . '" />');
	}
	
	static function from_json(array $json_data): ?ContentMetadata {
		// Checking required fields
		foreach(["metaTitleKey", "metaDescriptionKey", "metaAuthor", "openGraphTitleKey", "openGraphDescriptionKey",
			        "openGraphType", "openGraphUrl", "openGraphImage", "openGraphImageMime", "twitterCardType",
			        "twitterCardSite", "twitterCardTitleKey", "twitterCardDescriptionKey", "twitterCardImageUrl",
			        "twitterCardCreatorHandle"] as $wantedKey) {
			if(!key_exists($wantedKey, $json_data)) {
				return null;
			}
		}
		
		// Preparing optional fields
		foreach(["twitterCardImageAltKey"] as $optionalKey) {
			if(!key_exists($optionalKey, $json_data)) {
				$json_data[$optionalKey] = null;
			}
		}
		
		$metadata = new ContentMetadata();
		
		$metadata->metaTitleKey = $json_data["metaTitleKey"];
		$metadata->metaDescriptionKey = $json_data["metaDescriptionKey"];
		$metadata->metaAuthor = $json_data["metaAuthor"];
		
		$metadata->openGraphTitleKey = $json_data["openGraphTitleKey"];
		$metadata->openGraphDescriptionKey = $json_data["openGraphDescriptionKey"];
		$metadata->openGraphType = $json_data["openGraphType"];
		$metadata->openGraphUrl = $json_data["openGraphUrl"];
		$metadata->openGraphImage = $json_data["openGraphImage"];
		$metadata->openGraphImageMime = $json_data["openGraphImageMime"];
		
		$metadata->twitterCardType = $json_data["twitterCardType"];
		$metadata->twitterCardSite = $json_data["twitterCardSite"];
		$metadata->twitterCardTitleKey = $json_data["twitterCardTitleKey"];
		$metadata->twitterCardDescriptionKey = $json_data["twitterCardDescriptionKey"];
		$metadata->twitterCardImageUrl = $json_data["twitterCardImageUrl"];
		$metadata->twitterCardImageAltKey = $json_data["twitterCardImageAltKey"];
		$metadata->twitterCardCreatorHandle = $json_data["twitterCardCreatorHandle"];
		
		return $metadata;
	}
}
?>