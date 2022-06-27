<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

// Importing required scripts.
include_once 'langs.php';
include_once 'composer.php';

// Defining some options.
$PRINT_CONTENT_DEBUG_INFO_TEXT_ELEMENTS = true;
$PRINT_CONTENT_DEBUG_ERROR_TEXT_ELEMENTS = true;

// Defining constants and enums.
abstract class ContentDisplayType {
	const NONE = 0;
    const SEARCH = 1;
	const CONTENT = 2;
}

// Preparing default variables.
$requested_content_display_type = ContentDisplayType::NONE;
$content_has_error = false;
$content_error_message_key = "error.content.none";
$content_error_message = "";
$requested_tags = array();
$raw_additional_tags = "";
$filtered_content_index_data = NULL;
$requested_item_data = NULL;
$content = null;

// Detecting content display type requested.
$content_requested_url_part = explode("?", explode("#", preg_replace("^\/(content)^", "", l10n_url_switch(NULL)))[0])[0];

if(strcmp($content_requested_url_part, "/") == 0) {
	$requested_content_display_type = ContentDisplayType::SEARCH;
} else {
	$requested_content_display_type = ContentDisplayType::CONTENT;
	$content_requested_url_part = ltrim($content_requested_url_part, "/");
}

if($requested_content_display_type == ContentDisplayType::SEARCH) {
	// Checking if more tags were given
	if(isset($_GET['tags'])) {
		$raw_additional_tags = htmlspecialchars($_GET['tags']);
		
		// Checking the length to prevent bad requests
		if(strlen($raw_additional_tags) > 256) {
			$content_has_error = true;
			$content_error_message_key = "error.content.tags.length";
			goto content_end;
		}
		
		// Extracting the additional tags safely
		$raw_additional_tags_exploded = explode(";", $raw_additional_tags);
		for($i = 0; $i < count($raw_additional_tags_exploded); $i++) {
			if(strlen($raw_additional_tags_exploded[$i]) > 0) {
				if(ctype_alnum($raw_additional_tags_exploded[$i])) {
					$requested_tags[] = $raw_additional_tags_exploded[$i];
				} else {
					$content_has_error = true;
					$content_error_message_key = "error.content.tags.alphanumeric";
					goto content_end;
				}
			}
		}
		unset($raw_additional_tags_exploded);
	}
	
	// Loading the content index.
	$content_json = file_get_contents(realpath($dir_content . "/index.json"));
	$content_index_data = json_decode($content_json, true);
	unset($content_json);
	
	// Filtering out unwanted entries.
	$filtered_content_index_data = array();
	for($i = 0; $i < count($content_index_data); $i++) {
		if(count(array_intersect($content_index_data[$i]["tags"], $requested_tags)) == count($requested_tags)) {
			$filtered_content_index_data[] = $content_index_data[$i];
		}
	}
	
	// Cleaning some variables.
	unset($content_index_data);
	unset($content_json);
	
	// Checking if we found content for the user.
	if(count($filtered_content_index_data) == 0) {
		// No relevant article/page were found for the given tags.
		$content_has_error = true;
		$content_error_message_key = "error.content.detect.empty";
		goto content_end;
	}
} else if($requested_content_display_type == ContentDisplayType::CONTENT) {
	// Sanitizing the requested ID.
	if(!ctype_alnum(str_replace("-", "", $content_requested_url_part))) {
		$content_has_error = true;
		$content_error_message_key = "error.content.id.alphanumeric";
		goto content_end;
	}
	
	// Loading the content's data
	$content_file_path = get_content_file_path($content_requested_url_part);
	
	if(is_null($content_file_path)) {
		// File doesn't exist !
		$content_has_error = true;
		$content_error_message_key = "error.content.data.not.exist";
		unset($content_file_path);
		goto content_end;
	} else {
		$content = load_content_by_file_path($content_file_path);
		
		if(is_null($content)) {
			$content_has_error = true;
			$content_error_message_key = "error.content.cannot.load";
			unset($content_file_path);
			goto content_end;
		}
	}
	
	unset($content_file_path);
}

content_end:
// TODO: Create error thingy
$content_error_message = localize($content_error_message_key);

// These functions are placed here to prevent the main file from becoming impossible to read.
function start_content_card($iconClasses, $title, $subTitle) {
	echo('<div class="card p-0 mx-0"><div class="px-card py-10 border-bottom px-20"><div class="container-fluid">');
	echo('<h2 class="card-title font-size-18 m-0"><i class="'.$iconClasses.'"></i>&nbsp;&nbsp;'.localize($title));
	echo('<span class="card-title font-size-18 m-0 text-super-muted float-right hidden-xs-and-down">'.$subTitle.'</span></h2>');
	echo('</div></div>');
}

function end_content_card() {
	echo('</div>');
}

/*function getContentItemText(array $contentNode, bool $italicOnError = true, bool $returnMissingAsEmpty = false) : string {
	global $user_language, $default_language;
	if(array_key_exists("key", $contentNode)) {
		return localize($contentNode["key"]);
	} elseif(array_key_exists($user_language, $contentNode)) {
		return $contentNode[$user_language];
	} elseif(array_key_exists($default_language, $contentNode)) {
		return $contentNode[$default_language];
	} else {
		if($returnMissingAsEmpty) {
			return "";
		}
		if($italicOnError) {
			return '<i>'.localize("error.content.data.no.title").'</i>';
		} else {
			return localize("error.content.data.no.title");
		}
	}
}

function printInfoTextElement(string $text) : void {
	global $PRINT_CONTENT_DEBUG_INFO_TEXT_ELEMENTS;
	if($PRINT_CONTENT_DEBUG_INFO_TEXT_ELEMENTS) {
		echo('<h3 class="m-0 font-size-20 text-primary font-weight-semi-bold">'.$text.'</h3>');
	}
}

function printErrorTextElement(string $text) : void {
	global $PRINT_CONTENT_DEBUG_ERROR_TEXT_ELEMENTS;
	if($PRINT_CONTENT_DEBUG_ERROR_TEXT_ELEMENTS) {
		echo('<h3 class="m-0 font-size-20 text-center text-danger font-weight-semi-bold">'.$text.'</h3>');
	}
}

function processStandardContentSubNode(mixed $elementNode, string $prepend="", string $append="") : void {
	if(array_key_exists("content", $elementNode)) {
		if (array_key_exists("parts", $elementNode["content"])) {
			for ($iPart = 0; $iPart < count($elementNode["content"]["parts"]); $iPart++) {
				echo($prepend);
				createElementNode($elementNode["content"]["parts"][$iPart]);
				echo($append);
			}
		} else {
			echo($prepend.getContentItemText($elementNode["content"], false, true).$append);
		}
	}
}*/

/*function createElementNode(mixed $elementNode, string $prepend="", string $append="") : void {
	// Checking if we actually have a JSON object.
	if(!is_array($elementNode)) {
		echo('<p>Not array node !</p>');
		return;
	}
	if(!array_key_exists("type", $elementNode)) {
		echo('<p>No "type" member found in node !</p>');
		return;
	}
	
	switch($elementNode["type"]) {
		case "spacer":
			// Defining the font size.
			$_spacerSize = 1;
			if(array_key_exists("size", $elementNode)) {
				$_spacerSize = $elementNode["size"];
			}
			
			// Adding element.
			echo('<div class="m-0 pt-'.($_spacerSize*5).' pb-md-'.($_spacerSize*5).'"></div>');
			
			break;
		case "hr":
			// Reading and processing the modifiers.
			$_modIsSubtle = false;
			if(array_key_exists("modifiers", $elementNode)) {
				for ($i = 0; $i < count($elementNode["modifiers"]); $i++) {
					if ($elementNode["modifiers"][$i] == "subtle") {
						$_modIsSubtle = true;
					}
				}
			}
			
			if($_modIsSubtle) {
				echo('<hr class="subtle">');
			} else {
				echo('<div class="sidebar-divider"></div>');
			}
			break;
		case "image":
			// Parsing properties.
			$_imgAlt = "";
			$_imgSource = "/resources/Azias/imgs/placeholder.png";
			if(array_key_exists("alt", $elementNode)) {
				$_imgAlt = $elementNode["alt"];
			}
			if(array_key_exists("src", $elementNode)) {
				$_imgSource = $elementNode["src"];
			}
			
			// Reading and processing the modifiers.
			$_modFillHeight = false;
			if(array_key_exists("modifiers", $elementNode)) {
				for ($i = 0; $i < count($elementNode["modifiers"]); $i++) {
					if ($elementNode["modifiers"][$i] == "fill-height") {
						$_modFillHeight = true;
					}
				}
			}
			
			// Adding element.
			echo('<img class="'.($_modFillHeight?'fill-height':'').'" src="'.$_imgSource.'" alt="'.$_imgAlt.'">');
			
			break;
		case "h1":
		case "h2":
		case "h3":
			// Defining the font size.
			$_headingFontSize = ($elementNode["type"] == "h3" ? '18' : (($elementNode["type"] == "h2" ? '20' : '22')));
			
			// Opening heading.
			echo('<'.$elementNode["type"].' class="font-weight-semi-bold font-size-'.$_headingFontSize.' m-0">');
			
			// Adding content.
			processStandardContentSubNode($elementNode);
			
			// Closing heading.
			echo('</'.$elementNode["type"].'>');
			
			break;
		case "paragraph":
			// Parsing properties.
			$_indentLevel = 0;
			if(array_key_exists("indent", $elementNode)) {
				$_indentLevel = $elementNode["indent"];
			}
			
			// Reading and processing the modifiers.
			$_modNoTopMargin = false;
			if(array_key_exists("modifiers", $elementNode)) {
				for ($i = 0; $i < count($elementNode["modifiers"]); $i++) {
					switch($elementNode["modifiers"][$i]) {
						case "no-top-margin":
							$_modNoTopMargin = true;
							break;
					}
				}
			}
			
			// Opening paragraph.
			echo('<p class="'.($_modNoTopMargin?'mt-0 mb-10':'my-10').($_indentLevel?' ml-md-'.($_indentLevel*5):'').'">');
			
			// Adding content.
			processStandardContentSubNode($elementNode);
			
			// Closing paragraph.
			echo('</p>');
			
			break;
		case "code":
			// Parsing properties.
			$_indentLevel = 0;
			if(array_key_exists("indent", $elementNode)) {
				$_indentLevel = $elementNode["indent"];
			}
			
			// Reading and processing the modifiers.
			$_modNoTopMargin = false;
			$_modFullWidth = false;
			$_modHorizontalScroll = false;
			if(array_key_exists("modifiers", $elementNode)) {
				for ($i = 0; $i < count($elementNode["modifiers"]); $i++) {
					switch($elementNode["modifiers"][$i]) {
						case "no-top-margin":
							$_modNoTopMargin = true;
							break;
						case "full-width":
							$_modFullWidth = true;
							break;
						case "horizontal-scroll":
							$_modHorizontalScroll = true;
							break;
					}
				}
			}
			
			// Opening code element.
			echo('<code class="code'.($_modNoTopMargin?'':' mt-10').($_modFullWidth?' w-full d-inline-block':'').
				($_indentLevel?' ml-md-'.($_indentLevel*5):'').($_modHorizontalScroll?' overflow-x-scroll hide-scrollbar':'').'">');
			
			// Adding code lines.
			if (array_key_exists("code", $elementNode)) {
				for ($iCodeLine = 0; $iCodeLine < count($elementNode["code"]); $iCodeLine++) {
					echo(htmlspecialchars($elementNode["code"][$iCodeLine]).'<br>');
				}
			}
			
			// Closing code element.
			echo('</code>');
			
			break;
		case "container":
			// Grabbing the global padding.
			$_containerPadding = "10";
			if(array_key_exists("padding", $elementNode)) {
				$_containerPadding = $elementNode["padding"];
			}
			
			// Reading and processing the modifiers.
			$_modIsCard = false;
			$_modNoTopMargin = false;
			$_modNoTopPadding = false;
			$_modNoBottomPadding = false;
			$_modNoSizePadding = false;
			$_modHorizontalScroll = false;
			if(array_key_exists("modifiers", $elementNode)) {
				for ($i = 0; $i < count($elementNode["modifiers"]); $i++) {
					switch($elementNode["modifiers"][$i]) {
						case "card":
							$_modIsCard = true;
							$_modNoTopMargin = true;
							break;
						case "no-top-margin":
							$_modNoTopMargin = true;
							break;
						case "no-top-padding":
							$_modNoTopPadding = true;
							break;
						case "no-bottom-padding":
							$_modNoBottomPadding = true;
							break;
						case "no-side-padding":
							$_modNoSizePadding = true;
							break;
						case "horizontal-scroll":
							$_modHorizontalScroll = true;
							break;
					}
				}
			}
			
			// Opening container.
			echo('<div class="'.($_modIsCard?'card m-0 ':'').'p-'.$_containerPadding.($_modNoTopMargin?'':' mt-10').
				($_modNoSizePadding?' px-0':'').($_modNoBottomPadding?' pb-0':'').($_modNoTopPadding?' pt-0':'').
				($_modHorizontalScroll?' overflow-x-scroll hide-scrollbar':'').'">');
			
			// Adding content.
			processStandardContentSubNode($elementNode);
			
			// Closing container.
			echo('</div>');
			
			break;
		case "button":
			// Reading and processing the modifiers.
			$_modRawStyle = false;
			$_modThinStyle = false;
			$_modThickStyle = false;
			$_modRoundShape = false;
			$_modCircleShape = false;
			if(array_key_exists("modifiers", $elementNode)) {
				for ($i = 0; $i < count($elementNode["modifiers"]); $i++) {
					switch($elementNode["modifiers"][$i]) {
						case "raw":
							$_modRawStyle = true;
							break;
						case "thin":
							$_modThinStyle = true;
							break;
						case "thick":
							$_modThickStyle = true;
							break;
						case "rounded":
							$_modRoundShape = true;
							break;
						case "circle":
							$_modCircleShape = true;
							break;
					}
				}
			}
			
			// Adding link if needed.
			if(array_key_exists("link", $elementNode)) {
				echo('<a href="'.$elementNode["link"].'" class="button-link">');
			}
			
			// Opening button.
			echo('<button'.($_modRawStyle?'':' class="btn'.
					($_modThinStyle?' btn-sm':'').
					($_modThickStyle?' btn-lg':'').
					(array_key_exists("color", $elementNode)?' btn-'.$elementNode["color"]:'').
					($_modRoundShape?' btn-rounded':'').
					($_modCircleShape?' rounded-circle':'').
					'"').'>');
			
			// Adding content.
			processStandardContentSubNode($elementNode);
			
			// Closing button.
			echo('</button>');
			if(array_key_exists("link", $elementNode)) {
				echo('</a>');
			}
			
			break;
		case "table":
			// Reading and processing the modifiers.
			$_modNoOuterPadding = false;
			$_modStriped = false;
			$_modHover = false;
			$_modInnerBordered = false;
			$_modOuterBordered = false;
			if(array_key_exists("modifiers", $elementNode)) {
				for ($i = 0; $i < count($elementNode["modifiers"]); $i++) {
					switch($elementNode["modifiers"][$i]) {
						case "no-outer-padding":
							$_modNoOuterPadding = true;
							break;
						case "striped":
							$_modStriped = true;
							break;
						case "hover":
							$_modHover = true;
							break;
						case "inner-bordered":
							$_modInnerBordered = true;
							break;
						case "outer-bordered":
							$_modOuterBordered = true;
							break;
					}
				}
			}
			
			// Preparing table.
			echo('<table class="table'.($_modNoOuterPadding?" table-no-outer-padding":"").($_modStriped?" table-striped":"").
				($_modHover?" table-hover":"").($_modInnerBordered?" table-inner-bordered":"").
				($_modOuterBordered?' table-outer-bordered':'').'">');
			
			// Creating "thead".
			if(array_key_exists("head", $elementNode)) {
				echo('<thead><tr>');
				for ($iTableHead = 0; $iTableHead < count($elementNode["head"]); $iTableHead++) {
					echo('<th>');
					if(array_key_exists("parts", $elementNode["head"][$iTableHead])) {
						for ($iPart = 0; $iPart < count($elementNode["head"][$iTableHead]["parts"]); $iPart++) {
							createElementNode($elementNode["head"][$iTableHead]["parts"][$iPart]);
						}
					} else {
						echo(getContentItemText($elementNode["head"][$iTableHead], false, true));
					}
					echo('</th>');
				}
				echo('</tr></thead>');
			}
			
			// Creating "tbody".
			if(array_key_exists("body", $elementNode)) {
				echo('<tbody>');
				for ($iTableBodyRow = 0; $iTableBodyRow < count($elementNode["body"]); $iTableBodyRow++) {
					echo('<tr>');
					for ($iTableBodyCell = 0; $iTableBodyCell < count($elementNode["body"][$iTableBodyRow]); $iTableBodyCell++) {
						$_cellColSpan = 1;
						$_cellRowSpan = 1;
						if(array_key_exists("colspan", $elementNode["body"][$iTableBodyRow][$iTableBodyCell])) {
							$_cellColSpan = $elementNode["body"][$iTableBodyRow][$iTableBodyCell]["colspan"];
						}
						if(array_key_exists("rowspan", $elementNode["body"][$iTableBodyRow][$iTableBodyCell])) {
							$_cellRowSpan = $elementNode["body"][$iTableBodyRow][$iTableBodyCell]["rowspan"];
						}
						
						echo('<td'.($_cellColSpan>1?' colspan="'.$_cellColSpan.'"':'').($_cellRowSpan>1?' rowspan="'.$_cellRowSpan.'"':'').'>');
						if(array_key_exists("parts", $elementNode["body"][$iTableBodyRow][$iTableBodyCell])) {
							for ($iPart = 0; $iPart < count($elementNode["body"][$iTableBodyRow][$iTableBodyCell]["parts"]); $iPart++) {
								createElementNode($elementNode["body"][$iTableBodyRow][$iTableBodyCell]["parts"][$iPart]);
							}
						} else {
							echo(getContentItemText($elementNode["body"][$iTableBodyRow][$iTableBodyCell], false, true));
						}
						echo('</td>');
					}
					echo('</tr>');
				}
				echo('</tbody>');
			}
			
			// Ending table.
			echo('</table>');
		
			break;
		case "collapse":
			// Preparing some stuff.
			$_title = '<i>'.localize("error.content.data.no.title").'</i>';
			$_subtitle = '';
			if(array_key_exists("title", $elementNode)) {
				$_title = getContentItemText($elementNode["title"], true, true);
			}
			if(array_key_exists("subtitle", $elementNode)) {
				$_subtitle = getContentItemText($elementNode["subtitle"], true, true);
			}
			
			// Reading and processing the modifiers.
			$_modNoRounding = false;
			$_modNoContentPadding = false;
			$_modNoTopMargin = false;
			$_modIsClosed = false;
			$_modHorizontalScroll = false;
			if(array_key_exists("modifiers", $elementNode)) {
				for ($i = 0; $i < count($elementNode["modifiers"]); $i++) {
					switch($elementNode["modifiers"][$i]) {
						case "no-rounding":
							// Removes the rounding on the external edges.
							$_modNoRounding = true;
							break;
						case "no-padding-content":
							// Removes the internal padding and adds 0.01em to the top to prevent gaps from margins.
							$_modNoContentPadding = true;
							break;
						case "no-top-margin":
							// Removes the standard top margin.
							$_modNoTopMargin = true;
							break;
						case "closed":
							// Close the collapse by default.
							$_modIsClosed = true;
							break;
						case "horizontal-scroll":
							$_modHorizontalScroll = true;
							break;
					}
				}
			}
			
			// Starting the collapse.
			echo('<details class="collapse-panel w-full'.($_modNoTopMargin?"":" mt-10").'" '.($_modIsClosed?"closed":"open").'>');
			echo('<summary class="collapse-header p-10 px-15 text-truncate without-arrow'.($_modNoRounding?" rounded-0":"").' border-left-0 border-right-0">');
			echo('<h4 class="font-size-16 m-0 align-middle no-select"><i class="fad fa-angle-down hidden-collapse-closed font-size-24"></i>');
			echo('<i class="fad fa-angle-up hidden-collapse-open font-size-24"></i>');
			echo('<span class="font-weight-semi-bold align-top">&nbsp;&nbsp;'.$_title.'<span class="ml-20 text-muted">'.$_subtitle.'</span></span>');
			echo('</h4></summary><div class="collapse-content'.($_modHorizontalScroll?' overflow-x-scroll hide-scrollbar':'').
				($_modNoContentPadding?" p-0 py-01":"").($_modNoRounding?" rounded-0":"").' border-0 border-bottom">');
			
			// Rendering sub-elements.
			if(array_key_exists("parts", $elementNode)) {
				for ($i = 0; $i < count($elementNode["parts"]); $i++) {
					createElementNode($elementNode["parts"][$i]);
				}
			} else {
				printErrorTextElement(localize("error.content.data.no.subpart"));
			}
			
			// Ending the collapse.
			echo('</div></details>');
			
			break;
		case "slider":
		case "glider":
		case "gallery":
			// Starting the gallery
			echo('<div class="glider-container d-flex">');
			echo('<div class="align-self-stretch font-size-40 mr-5 my-auto glider-nav" aria-label="Previous">');
			echo('<i class="fad fa-angle-left"></i></div>');
			echo('<div class="glider align-self-stretch flex-fill">');
			
			// Adding content.
			processStandardContentSubNode($elementNode, "<div>", "</div>");
		
			// Ending the gallery
			echo('</div><div class="align-self-stretch font-size-40 ml-5 my-auto glider-nav" aria-label="Next">');
			echo('<i class="fad fa-angle-right"></i></div></div>');
			
			break;
		default:
			printErrorTextElement(sprintf(localize("error.content.data.part.unknown"), $elementNode["type"]));
			break;
}/**/

?>
