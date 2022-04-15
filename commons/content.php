<?php
// Making sure the file is included.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

// Importing required scripts
include_once 'langs.php';

// This helper requires PHP 8 or newer !

$SHOW_CONTENT_DEBUG_CARD = true;

// Defining constants and enums.
abstract class ContentDisplayType {
	const NONE = 0;
    const SEARCH = 1;
    const CONTENT = 2;
}

// Preparing default variables.
$requested_content_display_type = ContentDisplayType::NONE;
$content_has_error = false;
$content_error_message_key = "error.content.none";
$content_error_message = "";
$requested_tags = array();
$raw_additional_tags = "";
$filtered_content_index_data = NULL;

// Detecting content display type requested.
$content_requested_url_part = explode("?", explode("#", preg_replace("^\/(content)^", "", l10n_url_switch(NULL)))[0])[0];

if(strcmp($content_requested_url_part, "/") == 0) {
	$requested_content_display_type = ContentDisplayType::SEARCH;
} else {
	$requested_content_display_type = ContentDisplayType::CONTENT;
	$content_requested_url_part = ltrim($content_requested_url_part, "/");
}

if($requested_content_display_type == ContentDisplayType::SEARCH) {
	// Checking if more tags were given
	if(isset($_GET['tags'])) {
		$raw_additional_tags = htmlspecialchars($_GET['tags']);
		
		// Checking the length to prevent bad requests
		if(strlen($raw_additional_tags) > 256) {
			$content_has_error = true;
			$content_error_message_key = "error.content.tags.length";
			goto content_end;
		}
		
		// Extracting the additional tags safely
		$raw_additional_tags_exploded = explode(";", $raw_additional_tags);
		for($i = 0; $i < count($raw_additional_tags_exploded); $i++) {
			if(strlen($raw_additional_tags_exploded[$i]) > 0) {
				if(ctype_alnum($raw_additional_tags_exploded[$i])) {
					$requested_tags[] = $raw_additional_tags_exploded[$i];
				} else {
					$content_has_error = true;
					$content_error_message_key = "error.content.tags.alphanumeric";
					goto content_end;
				}
			}
		}
		unset($raw_additional_tags_exploded);
	}
	
	// Loading the content index.
	$content_json = file_get_contents(realpath($dir_content . "/index.json"));
	$content_index_data = json_decode($content_json, true);
	unset($content_json);
	
	// Filtering out unwanted entries.
	$filtered_content_index_data = array();
	for($i = 0; $i < count($content_index_data); $i++) {
		if(count(array_intersect($content_index_data[$i]["tags"], $requested_tags)) == count($requested_tags)) {
			$filtered_content_index_data[] = $content_index_data[$i];
		}
	}
	
	// Cleaning some variables.
	unset($content_index_data);
	unset($content_json);
	
	// Checking if we found content for the user.
	if(count($filtered_content_index_data) == 0) {
		// No relevant article/page were found for the given tags.
		$content_has_error = true;
		$content_error_message_key = "error.content.detect.empty";
		goto content_end;
	}
} elseif($requested_content_display_type == ContentDisplayType::CONTENT) {
	// Attempting to get the requested ID.
}

content_end:
$content_error_message = localize($content_error_message_key);

// These functions are placed here to prevent the main file from becoming impossible to read.
function startMainCard($iconClasses, $title, $subTitle) {
	echo('<div class="card p-0 mx-0"><div class="px-card py-10 border-bottom px-20"><div class="container-fluid">');
	echo('<div class="row"><div class="col-4"><h2 class="card-title font-size-18 m-0">');
	echo('<i class="'.$iconClasses.'"></i>&nbsp;&nbsp;'.localize($title).'</h2></div>');
	echo('<div class="col-8 text-right font-italic"><h2 class="card-title font-size-18 m-0 text-super-muted">'.$subTitle.'</h2>');
	echo('</div></div></div></div>');
}

function endMainCard() {
	echo('</div>');
}

?>
