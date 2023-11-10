<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

// FIXME: Make a note of which variables are being used from that file !
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
} elseif(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
	// Attempting to detect the language through the browser's headers.
	$_client_languages = [];
	
	foreach(explode(",", $_SERVER["HTTP_ACCEPT_LANGUAGE"]) as $_client_lang_entry) {
		$_client_lang_entry_parts = explode(";", $_client_lang_entry);
		
		// Ignoring "en-US" and similar entries
		if(count($_client_lang_entry_parts) != 2) {
			continue;
		}
		
		// Only allowing supported languages
		if(!in_array($_client_lang_entry_parts[0], ["en", "fr"])) {
			continue;
		}
		
		// Parsing the language's weight
		$_client_lang_entry_parts[1] = str_replace("q=", "", $_client_lang_entry_parts[1]);
		$_client_lang_entry_weight = filter_var($_client_lang_entry_parts[1], FILTER_VALIDATE_FLOAT);
		if($_client_lang_entry_weight === false || !is_float($_client_lang_entry_weight)) {
			continue;
		}
		
		// Saving it for later
		$_client_languages[] = $_client_lang_entry_parts;
	}
	
	// Sorting based on weight and selecting the preferred one.
	if(count($_client_languages) > 0) {
		usort($_client_languages, function(array $a, array $b) {
			if($a[1] == $b[1]) {
				return 0;
			}
			return ($a[1] > $b[1]) ? -1 : 1;
		});
		
		$user_language = $_client_languages[0][0];
	}
}

// Preparing other related variables
$lang_number_decimal = $user_language == "en" ? "." : ",";
$lang_number_thousands = $user_language == "en" ? "," : ".";

// Setting headers
header("Content-Language: " . $user_language);

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
