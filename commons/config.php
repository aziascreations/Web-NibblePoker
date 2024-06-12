<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden'); die();
}

// Used for opengraph head tags & the debug page.
switch($_SERVER['SERVER_NAME']) {
	case "nibblepoker.com":
		$host = "nibblepoker.com";
		$host_uri = "https://nibblepoker.com";
		$host_tld = "com";
		$cdn_uri = "https://cdn.nibblepoker.com";
		break;
	default:
		$host = "nibblepoker.lu";
		$host_uri = "https://nibblepoker.lu";
		$host_tld = "lu";
		$cdn_uri = "https://cdn.nibblepoker.lu";
		break;
}

$dir_commons = dirname(__FILE__);
$dir_root = realpath($dir_commons . "/../");
$config_dir_content = realpath($dir_commons . "/../" . "content/");
$config_dir_tools = realpath($dir_commons . "/../" . "tools/");

// Optional features
$enable_grids = false;
$enable_code_highlight = false;
$enable_gallery = false;
$enable_kitty_and_doggo_sounds = false;
$enable_debug_extras = false;

// Easter-egg optional features
// > Belgium's independence day.
$enable_waffle_iron = date('m-d') === '07-21';

// > Luxembourg's national day.
$enable_bouneschlupp_mode = date('m-d') === '06-23';

// Debugging stuff
$print_execution_timer = false;
?>