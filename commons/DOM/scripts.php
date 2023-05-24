<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

if($enable_glider) {
	echo('<script src="/resources/GliderJs/1.7.6/glider.min.js"></script>');
}

if($enable_code_highlight) {
	echo('<script src="/resources/HighlightJS/11.6.0/highlight.min.js"></script>');
	echo('<script src="/resources/HighlightJS/11.6.0/languages/csharp.min.js"></script>');
	//echo('<script src="/resources/Azias/js/code-highlighter.js"></script>');
}
?>
<script src="/resources/NibblePoker/js/nibblepoker.min.js"></script>