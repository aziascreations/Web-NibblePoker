<?php
// Making sure the file is included and not accessed directly.
if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

$_npDomUtilsHeadingCount = 0;

/**
 * Prints a standard heading container and its text with an optional anchor.
 * @param $text string Text to be shown in the heading
 * @param $iconId string|null
 * @param $rightText string|null
 * @param $anchorId string|null Anchor's ID if desired, `null` otherwise.
 * @return void
 */
function makeMainHeader(string $text, ?string $iconId = null, ?string $rightText = null, ?string $anchorId = null): void {
	global $_npDomUtilsHeadingCount;
	
	if(!is_null($anchorId)) {
		echo('<a class="bland-link" href="#' . $anchorId . '">');
	}
	
	echo('<div class="heading-main p-xs border r-s ' . ($_npDomUtilsHeadingCount > 0 ? "mt-l " : "") . 'bkgd-grid"><h2 class="t-w-500 t-size-14">');

	// TODO: Add a simple and nicer divider.
	if(!is_null($iconId)) {
		echo('<i class="' . $iconId . ' t-size-12 t-muted"></i>');
	}
	
	echo($text);
	
	if(!is_null($rightText)) {
		echo('<span class="ml-auto t-muted t-size-10">' . $rightText . '</span>');
	}
	
	echo('</h2></div>');
	
	if(!is_null($anchorId)) {
		echo('</a>');
	}
	
	$_npDomUtilsHeadingCount++;
}

?>