<?php if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) { header('HTTP/1.1 403 Forbidden'); die(); } ?>
<?php
// TODO: Include lang once

// This helper requires PHP 8 or newer !

// Defining constants and enums.
const CONTENT_NONE = 0;
abstract class ContentType {
	const NONE = CONTENT_NONE;
    const BLOG = 1;
    const PROGRAMMING = 2;
    const ELECTRONICS = 3;
}
abstract class ContentDisplayType {
	const NONE = CONTENT_NONE;
    const SEARCH = 1;
    const ARTICLE = 2;
    const APPLICATION = 3;
}

// Preparing default variables.
$requested_content_type = ContentType::NONE;
$requested_content_display_type = ContentDisplayType::NONE;
$requested_tags = array();
$content_has_error = false;
$_content_error_message_key = "error.content.none";
$content_error_message = "";
$was_item_requested = false;

// Detecting content type requested.
$content_requested_url_part = l10n_url_switch(NULL);

if(str_starts_with($content_requested_url_part, "/blog/")) {
	$requested_content_type = ContentType::BLOG;
} elseif(str_starts_with($content_requested_url_part, "/programming/")) {
	$requested_content_type = ContentType::PROGRAMMING;
} elseif(str_starts_with($content_requested_url_part, "/electronics/")) {
	$requested_content_type = ContentType::ELECTRONICS;
} else {
	// Failed to detect which category of content was requested.
	$content_has_error = true;
	$_content_error_message_key = "error.content.detect.category";
	goto content_end;
}

// Detecting what kind of item was requested, parsing additional parameters and loading required data.
$content_requested_url_part = preg_replace("^\/(blog|programming|electronics)^", "", $content_requested_url_part);
if($requested_content_type == ContentType::BLOG) {
	if(str_starts_with($content_requested_url_part, "/article/")) {
		$requested_content_display_type = ContentDisplayType::ARTICLE;
	} else {
		$requested_content_display_type = ContentDisplayType::SEARCH;
	}
} elseif($requested_content_type == ContentType::PROGRAMMING) {
	// May be changed later if a specific resource is requested and found.
	$requested_content_display_type = ContentDisplayType::SEARCH;
	$requested_tags[] = "programming";
	
	if(str_starts_with($content_requested_url_part, "/applications/")) {
		$requested_tags[] = "application";
	} elseif(str_starts_with($content_requested_url_part, "/tutorials/")) {
		$requested_tags[] = "tutorial";
	} elseif(str_starts_with($content_requested_url_part, "/tools/")) {
		$requested_tags[] = "tool";
	} elseif(str_starts_with($content_requested_url_part, "/purebasic/")) {
		$requested_tags[] = "purebasic";
	} elseif(str_starts_with($content_requested_url_part, "/python/")) {
		$requested_tags[] = "python";
	} elseif(str_starts_with($content_requested_url_part, "/java/")) {
		$requested_tags[] = "java";
	} elseif(str_starts_with($content_requested_url_part, "/others/")) {
		$requested_tags[] = "miscellaneous";
	} elseif(str_starts_with($content_requested_url_part, "/docker/")) {
		$requested_tags[] = "docker";
	} else {
		$content_has_error = true;
		$_content_error_message_key = "error.content.detect.subtype";
		goto content_end;
	}
} elseif($requested_content_type == ContentType::ELECTRONICS) {
	// May be changed later if a specific resource is requested and found.
	$requested_content_display_type = ContentDisplayType::SEARCH;
	$requested_tags[] = "electronic";
	
	if(str_starts_with($content_requested_url_part, "/iot/")) {
		$requested_tags[] = "iot";
	} elseif(str_starts_with($content_requested_url_part, "/experiments/")) {
		$requested_tags[] = "experiment";
	} elseif(str_starts_with($content_requested_url_part, "/ham/")) {
		$requested_tags[] = "ham";
	} else {
		$content_has_error = true;
		$_content_error_message_key = "error.content.detect.subtype";
		goto content_end;
	}
}

if($requested_content_display_type == ContentDisplayType::NONE) {
	// Failed to detect what kind of content was requested.
	$content_has_error = true;
	$_content_error_message_key = "error.content.detect.display";
	goto content_end;
}

if(count($requested_tags) == 0) {
	// Failed to detect the subtype of content requested when not a blog post.
	$content_has_error = true;
	$_content_error_message_key = "error.content.detect.tags";
	goto content_end;
}
$content_requested_url_part = preg_replace("^\/(java|python|purebasic|others|ham|iot|experiments|applications|tutorials|tools)^", "", $content_requested_url_part);

// TODO: detect specific resource and parameters, and load data.

content_end:
$content_error_message = localize($_content_error_message_key);
?>
