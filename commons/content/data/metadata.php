<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

// Including required helpers.
include_once 'commons/langs.php';

// Including subclasses.
include_once 'commons/content/data/opengraph.php';
include_once 'commons/content/data/twitter_card.php';

class ContentMetadata {

}

?>