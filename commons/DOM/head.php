<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}
?>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
<meta name="viewport" content="width=device-width" />
<!--<meta content="cache, store" http-equiv="Cache-Control">
<meta content="cache, store" http-equiv="Pragma">
<meta content="3600" http-equiv="Expires">-->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate icon" href="/favicon.ico">
<link rel="stylesheet" href="/resources/FontAwesomePro/5.15.3/css/all.min.css">
<link rel="stylesheet" href="/resources/NibblePoker/css/nibblepoker.min.css">
<?php
if($enable_waffle_iron) {
	// Turns out you can't change an SVG's path fill if it's inside an IMG tag...
	//echo("<link rel=\"stylesheet\" href=\"/resources/NibblePoker/css/waffle-day.min.css\">");
}
if($enable_code_highlight) {
	echo('<link href="/resources/HighlightJS/11.6.0/styles/atom-one-dark.min.css" rel="stylesheet" />');
}
if($enable_glider) {
	echo('<link href="/resources/GliderJs/1.7.6/glider.min.css" rel="stylesheet" />');
}
?>



