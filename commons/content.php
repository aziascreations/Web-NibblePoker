<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

// Importing required scripts.
include_once 'langs.php';
include_once 'composer.php';

// Defining some options.
$PRINT_CONTENT_DEBUG_INFO_TEXT_ELEMENTS = true;
$PRINT_CONTENT_DEBUG_ERROR_TEXT_ELEMENTS = true;

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
$requested_item_data = NULL;
$content = null;

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
} else if($requested_content_display_type == ContentDisplayType::CONTENT) {
	// Sanitizing the requested ID.
	if(!ctype_alnum(str_replace("-", "", $content_requested_url_part))) {
		$content_has_error = true;
		$content_error_message_key = "error.content.id.alphanumeric";
		goto content_end;
	}
	
	// Loading the content's data
	$content_file_path = get_content_file_path($content_requested_url_part);
	
	if(is_null($content_file_path)) {
		// File doesn't exist !
		$content_has_error = true;
		$content_error_message_key = "error.content.data.not.exist";
		unset($content_file_path);
		goto content_end;
	} else {
		$content = load_content_by_file_path($content_file_path);
		
		if(is_null($content)) {
			$content_has_error = true;
			$content_error_message_key = "error.content.cannot.load";
			unset($content_file_path);
			goto content_end;
		}
	}
	
	unset($content_file_path);
}

content_end:
// TODO: Create error thingy
$content_error_message = localize($content_error_message_key);

// These functions are placed here to prevent the main file from becoming impossible to read.
function start_content_card($iconClasses, $title, $subTitle) {
	echo('<div class="card p-0 mx-0"><div class="px-card py-10 border-bottom px-20"><div class="container-fluid">');
	echo('<h2 class="card-title font-size-18 m-0"><i class="'.$iconClasses.'"></i>&nbsp;&nbsp;'.localize($title));
	echo('<span class="card-title font-size-18 m-0 text-super-muted float-right hidden-xs-and-down">'.$subTitle.'</span></h2>');
	echo('</div></div>');
}

function end_content_card() {
	echo('</div>');
}

/*
	switch($elementNode["type"]) {
		case "image":
			// Parsing properties.
			$_imgAlt = "";
			$_imgSource = "/resources/Azias/imgs/placeholder.png";
			if(array_key_exists("alt", $elementNode)) {
				$_imgAlt = $elementNode["alt"];
			}
			if(array_key_exists("src", $elementNode)) {
				$_imgSource = $elementNode["src"];
			}
			
			// Reading and processing the modifiers.
			$_modFillHeight = false;
			if(array_key_exists("modifiers", $elementNode)) {
				for ($i = 0; $i < count($elementNode["modifiers"]); $i++) {
					if ($elementNode["modifiers"][$i] == "fill-height") {
						$_modFillHeight = true;
					}
				}
			}
			
			// Adding element.
			echo('<img class="'.($_modFillHeight?'fill-height':'').'" src="'.$_imgSource.'" alt="'.$_imgAlt.'">');
			
			break;
		case "slider":
		case "glider":
		case "gallery":
			// Starting the gallery
			echo('<div class="glider-container d-flex">');
			echo('<div class="align-self-stretch font-size-40 mr-5 my-auto glider-nav" aria-label="Previous">');
			echo('<i class="fad fa-angle-left"></i></div>');
			echo('<div class="glider align-self-stretch flex-fill">');
			
			// Adding content.
			processStandardContentSubNode($elementNode, "<div>", "</div>");
		
			// Ending the gallery
			echo('</div><div class="align-self-stretch font-size-40 ml-5 my-auto glider-nav" aria-label="Next">');
			echo('<i class="fad fa-angle-right"></i></div></div>');
			
			break;
}/**/
?>