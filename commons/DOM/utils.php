<?php
// Making sure the file is included and not accessed directly.
if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

// Used by 'printMainHeader()'.
$_npDomUtilsHeadingCount = 0;

function getMainHeader(string $text, ?string $iconId = null, ?string $rightText = null, ?string $anchorId = null,
					   bool $addTopMargin = true, ?string $backgroundClass = "bkgd-grid", int $hLevel = 2): string {
	if(is_null($backgroundClass)) {
		$backgroundClass = "bkgd-grid";
	}
	
	$htmlCode = "";
	
	if(!is_null($anchorId)) {
		$htmlCode .= '<a class="bland-link" href="#' . $anchorId . '">';
	}
	
	$htmlCode .= '<div class="heading-main p-xs border r-s ' . ($addTopMargin > 0 ? "mt-l " : "") . $backgroundClass .
		'"><h' . $hLevel . ' class="t-w-500 t-size-14">';
	
	// TODO: Add a simple and nicer divider.
	if(!is_null($iconId)) {
		$htmlCode .= '<i class="' . $iconId . ' t-size-12 t-muted"></i>';
	}
	
	$htmlCode .= $text;
	
	if(!is_null($rightText)) {
		$htmlCode .= '<span class="ml-auto t-muted t-size-10">' . $rightText . '</span>';
	}
	
	$htmlCode .= '</h' . $hLevel . '></div>';
	
	if(!is_null($anchorId)) {
		$htmlCode .= '</a>';
	}
	
	return $htmlCode;
}

function printMainHeader(string $text, ?string $iconId = null, ?string $rightText = null, ?string $anchorId = null,
						 ?string $backgroundClass = "bkgd-grid"): void {
	global $_npDomUtilsHeadingCount;
	$_npDomUtilsHeadingCount++;
	echo(getMainHeader(
		$text,
		$iconId,
		$rightText,
		$anchorId,
		($_npDomUtilsHeadingCount > 1),
		$backgroundClass
	));
}

?>