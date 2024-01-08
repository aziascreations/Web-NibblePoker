<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}
?>
<meta charset="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport"/>
<meta name="viewport" content="width=device-width"/>
<meta name="author" content="Herwin Bozet">
<meta name="robots" content="index, follow">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate icon" href="/favicon.ico">
<link rel="stylesheet" href="/resources/FontAwesomePro/6.5.1/css/all.min.css">
<link rel="stylesheet" href="/resources/NibblePoker/css/nibblepoker.min.css?v=1">
<?php
if($enable_code_highlight) {
	echo('<link href="/resources/HighlightJS/src/styles/atom-one-dark.min.css" rel="stylesheet"/>');
}
if($enable_gallery) {
	echo('<link href="/resources/SplideJs/dist/css/splide.min.css" rel="stylesheet"/>');
}
?>
