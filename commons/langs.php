<?php if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) { header('HTTP/1.1 403 Forbidden'); die(); } ?>
<?php
// This helper requires PHP 8 or newer !

// Setting the default values.
$default_language = "en";
$user_language = "en";
$user_uri_language = "";

// Attempting to detect the language through the URI
if(str_starts_with($_SERVER['REQUEST_URI'], "/en/")) {
	$user_language = "en";
	$user_uri_language = "/".$user_language;
} elseif(str_starts_with($_SERVER['REQUEST_URI'], "/fr/")) {
	$user_language = "fr";
	$user_uri_language = "/".$user_language;
} elseif(str_starts_with($_SERVER['REQUEST_URI'], "/lb/")) {
	$user_language = "lb";
	$user_uri_language = "/".$user_language;
} else {
	// Attempting to detect the language through the browser's headers.
	// TODO: This !
	$user_uri_language = "";
}

// Reading and parsing the strings.json file
$lang_json = file_get_contents(realpath($dir_commons . "/strings.json"));
$lang_data = json_decode($lang_json, true);

// Localizer function
function localize($stringKey) {
	global $user_language, $default_language, $lang_data;
	if(array_key_exists($stringKey, $lang_data[$user_language])) {
		return $lang_data[$user_language][$stringKey];
	} else {
		if(array_key_exists($stringKey, $lang_data[$default_language])) {
			return $lang_data[$default_language][$stringKey];
		} else {
			return $stringKey;
		}
	}
}

function l10n_url_abs($url) {
	global $user_uri_language;
	return $user_uri_language . $url;
}

function l10n_url_switch($lang) {
	if(is_null($lang)) {
		return preg_replace("^\/(lb|lu|fr|en)^", "", $_SERVER['REQUEST_URI']);
	} else {
		return "/".$lang.preg_replace("^\/(lb|lu|fr|en)^", "", $_SERVER['REQUEST_URI']);
	}
}

?>
