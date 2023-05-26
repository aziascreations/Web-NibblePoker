<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden'); die();
}

$host = "nibblepoker.lu";
$host_uri = "https://nibblepoker.lu";

$dir_commons = dirname(__FILE__);
$dir_root = realpath($dir_commons . "/../");
$config_dir_content = realpath($dir_commons . "/../" . "content/");
$config_dir_tools = realpath($dir_commons . "/../" . "tools/");

// Optional features
$enable_grids = false;
$enable_code_highlight = false;
$enable_glider = false;

// Easter-egg optional features
// > Belgium's independence day.
$enable_waffle_iron = date('m-d') === '07-21';

// Debugging stuff
$print_execution_timer = true;
?>