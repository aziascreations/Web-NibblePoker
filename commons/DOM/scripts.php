<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

if($enable_gallery) {
	echo('<script src="/resources/SplideJs/dist/js/splide.min.js"></script>');
}

if($enable_code_highlight) {
	echo('<script src="/resources/HighlightJS/highlight.min.js"></script>');
}
?>
<script src="/resources/NibblePoker/js/nibblepoker.min.js"></script>
<?php
if($enable_gallery) {
	echo('<script src="/resources/NibblePoker/js/nibblepoker-splide.min.js"></script>');
}
if($enable_code_highlight) {
	echo('<script src="/resources/NibblePoker/js/nibblepoker-code.min.js"></script>');
}
if($enable_kitty_and_doggo_sounds) {
	echo('<script src="/resources/NibblePoker/js/nibblepoker-contributors.min.js"></script>');
}
?>