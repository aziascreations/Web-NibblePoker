<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}
include_once 'commons/config.php';

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

// Localization functions
function localize_private(string $string_key, array $private_lang_data, bool $fallback_to_common = false,
						  string $fallback_prefix = "fallback.unknown") : string {
	global $user_language, $default_language, $lang_data;
	
	if(array_key_exists($user_language, $private_lang_data)) {
		if(array_key_exists($string_key, $private_lang_data[$user_language])) {
			// If found in direct array in user's language.
			return $private_lang_data[$user_language][$string_key];
		}
	}
	if(array_key_exists($default_language, $private_lang_data)) {
		if(array_key_exists($string_key, $private_lang_data[$default_language])) {
			// If found in direct array in default language.
			return $private_lang_data[$default_language][$string_key];
		}
	}
	if($fallback_to_common) {
		// If we can attempt to fallback on the common lang file.
		return localize_private($fallback_prefix . $string_key, $lang_data, false);
	}
	
	// If nothing could be done, we simply return the key.
	return $string_key;
}

function localize($string_key) : string {
	global $lang_data;
	return localize_private($string_key, $lang_data, false);
}

function l10n_url_abs($url) : string {
	global $user_uri_language;
	return $user_uri_language . $url;
}

function l10n_url_switch($lang) : string {
	if(is_null($lang)) {
		return preg_replace("^\/(lb|lu|fr|en)^", "", $_SERVER['REQUEST_URI']);
	} else {
		return "/".$lang.preg_replace("^\/(lb|lu|fr|en)^", "", $_SERVER['REQUEST_URI']);
	}
}

?>
