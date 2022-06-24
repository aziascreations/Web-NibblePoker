<?php
// Making sure the file is included and not accessed directly.
/*if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}*/

// Including required helpers.
include_once 'config.php';
include_once 'langs.php';

// Defining some options.
$USE_CONFIG_URI_FOR_OPENGRAPH = true;
$AUTO_DETECT_OPENGRAPH_MIME = true;
$LANG_FALLBACK_KEY_PREFIX = "content.fallback";

// Defining the template types.
abstract class ComposerTemplates {
	const RAW = "raw";
	const ARTICLE = "article";
	
	/**
	 * Returns all the constants present in the class.
	 * @return array All the constants in as "[[k, v], [k, v], ...]".
	 * @see https://www.php.net/manual/en/reflectionclass.getconstants.php
	 */
	static function getConstants(): array {
		$oClass = new ReflectionClass(__CLASS__);
		return $oClass->getConstants();
	}
}

// Defining the different types of elements available.
abstract class ComposerElementTypes {
	const UNSET     = "unset";
	const H1        = "h1";
	const H2        = "h2";
	const H3        = "h3";
	const PARAGRAPH = "paragraph";
	const BUTTON    = "button";
	const CODE      = "code";
	const HR        = "hr";
	const CONTAINER = "container";
	const COLLAPSE  = "collapse";
	const SPACER    = "spacer";
	const IMAGE     = "image";
	const TABLE     = "table";
	const GRID      = "grid";
	const GLIDER    = "glider";
	
	/**
	 * Returns all the constants present in the class.
	 * @return array All the constants in as "[[k, v], [k, v], ...]".
	 * @see https://www.php.net/manual/en/reflectionclass.getconstants.php
	 */
	static function getConstants(): array {
		$oClass = new ReflectionClass(__CLASS__);
		return $oClass->getConstants();
	}
}

// Defining modifiers.
abstract class ComposerElementModifiersTest {
	// Generic > Margin
	const GENERIC_MARGIN_NO_TOP    = ["no-top-margin",    "mt-0"];
	const GENERIC_MARGIN_NO_BOTTOM = ["no-bottom-margin", "mb-0"];
	const GENERIC_MARGIN_NO_LEFT   = ["no-left-margin",   "ml-0"];
	const GENERIC_MARGIN_NO_RIGHT  = ["no-right-margin",  "mr-0"];
	const GENERIC_MARGIN_NO_X      = ["no-y-margin",      "mx-0"];
	const GENERIC_MARGIN_NO_Y      = ["no-x-margin",      "my-0"];
	const GENERIC_MARGIN_NONE      = ["no-margin",        "m-0" ];
	
	// Generic > Padding
	const GENERIC_PADDING_NO_TOP    = ["no-top-padding",    "pt-0"];
	const GENERIC_PADDING_NO_BOTTOM = ["no-bottom-padding", "pb-0"];
	const GENERIC_PADDING_NO_LEFT   = ["no-left-padding",   "pl-0"];
	const GENERIC_PADDING_NO_RIGHT  = ["no-right-padding",  "pr-0"];
	const GENERIC_PADDING_NO_X      = ["no-y-padding",      "px-0"];
	const GENERIC_PADDING_NO_Y      = ["no-x-padding",      "py-0"];
	const GENERIC_PADDING_NONE      = ["no-padding",        "p-0" ];
	
	// Containers
	const CONTAINER_SCROLL_HORIZONTAL = ["h-scroll", "overflow-x-scroll hide-scrollbar"];
	const CONTAINER_CARD = ["card", "card"];
	
	// Buttons
	const BUTTON_THIN  = ["thin", "?thin"];
	const BUTTON_THICK = ["thick", "?thick"];
	
	// Horizontal ruler
	const HR_SUBTLE = ["subtle", "subtle"];
	
	// Other internal constants
	const _INDEX_KEY = 0;
	const _INDEX_CLASSES = 1;
	
	/**
	 * Returns all the constants present in the class.
	 * @return array All the constants in as "[[k, v], [k, v], ...]".
	 * @see https://www.php.net/manual/en/reflectionclass.getconstants.php
	 */
	static function getConstants(): array {
		$oClass = new ReflectionClass(__CLASS__);
		return $oClass->getConstants();
	}
	
	/**
	 * Returns the given modifier's constant's key
	 * @param array $modifier_data A modifier constant defined in "ComposerElementModifiersTest".
	 * @return string The modifier's key or an empty string if an error was encountered.
	 */
	static function get_modifier_key(array $modifier_data) : string {
		return sizeof($modifier_data) >= 1 ? $modifier_data[ComposerElementModifiersTest::_INDEX_KEY] : '';
	}
	
	/**
	 * Returns the given modifier's constant's classes
	 * @param array $modifier_data A modifier constant defined in "ComposerElementModifiersTest".
	 * @return string The modifier's classes or an empty string if an error was encountered.
	 */
	static function get_modifier_classes(array $modifier_data) : string {
		return sizeof($modifier_data) >= 2 ? $modifier_data[ComposerElementModifiersTest::_INDEX_CLASSES] : '';
	}
	
	/**
	 * @param string $modifier_key
	 * @return string The resolved DOM classes, or an empty string if the given modifier is unknown.
	 */
	static function getClassesFromKey(string $modifier_key) : string {
		foreach(ComposerElementModifiersTest::getConstants() as $constant_values) {
			if(!is_array($constant_values)) {
				continue;
			}
			if($modifier_key == $constant_values[ComposerElementModifiersTest::_INDEX_KEY]) {
				return $constant_values[ComposerElementModifiersTest::_INDEX_CLASSES];
			}
		}
		return "";
	}
	
	static function is_modifier_in_modifiers(array $modifier_data, array $modifiers) : bool {
		foreach($modifiers as $modifier) {
			if($modifier_data[ComposerElementModifiersTest::_INDEX_KEY] == $modifier) {
				return true;
			}
		}
		return false;
	}
}

// Data classes
class ComposerContent {
	public array $strings;
	public ComposerContentMetadata $metadata;
	public array $elements;
	
	function __construct(array $strings, ComposerContentMetadata $metadata, array $elements) {
		$this->strings = $strings;
		$this->metadata = $metadata;
		$this->elements = $elements;
	}
	
	static function from_json(array $json_data) : ComposerContent {
		global $default_language;
		return new ComposerContent(
			key_exists("strings", $json_data) ? $json_data["strings"] : array($default_language=>[]),
			ComposerContentMetadata::from_json(
				key_exists("metadata", $json_data) ? $json_data["metadata"] : array()
			),
			key_exists("elements", $json_data) ?
				ComposerElement::from_json_array($json_data["elements"]) : array()
		);
	}
	
	public function get_html() : string {
		$htmlCode = "";
		
		// FIXME: Check for the template after the loop
		
		foreach($this->elements as $element) {
			/** @var ComposerElement $element */
			$htmlCode .= $element->get_html($this);
		}
		
		return $this->metadata->apply_template($htmlCode);
	}
}

class ComposerContentMetadata {
	public string $title;
	public string $description;
	public string $template;
	public ComposerContentMetadataOpengraph $opengraph;
	public ?ComposerContentMetadataArticle $article;
	
	function __construct(string $title, string $description, string $template, ComposerContentMetadataOpengraph $opengraph,
						 ?ComposerContentMetadataArticle $article) {
		$this->title = $title;
		$this->description = $description;
		$this->template = $template;
		$this->opengraph = $opengraph;
		$this->article = $article;
		
		// Safety checks.
		if($this->template == ComposerTemplates::ARTICLE && is_null($this->article)) {
			$this->article = ComposerContentMetadataArticle::from_json([]);
		}
	}
	
	static function from_json(array $json_data) : ComposerContentMetadata {
		return new ComposerContentMetadata(
			key_exists("title", $json_data) ? $json_data["title"] : "",
			key_exists("description", $json_data) ? $json_data["description"] : "",
			key_exists("template", $json_data) ? $json_data["template"] : "",
			ComposerContentMetadataOpengraph::from_json(
				key_exists("opengraph", $json_data) ? $json_data["opengraph"] : array()
			),
			key_exists("article", $json_data) ?
				ComposerContentMetadataArticle::from_json($json_data["article"]) : null,
		);
	}
	
	function apply_template(string $inner_html) : string {
		switch($this->template) {
			case ComposerTemplates::ARTICLE:
				$inner_html = '<div class="card p-0 mx-0"><div class="px-card py-10 border-bottom px-20">' .
					'<div class="container-fluid"><h2 class="card-title font-size-18 m-0">' .
					'<i class="' . $this->article->icon . '"></i>&nbsp;&nbsp;' . localize($this->article->title) .
					'<span class="card-title font-size-18 m-0 text-super-muted float-right hidden-xs-and-down">' .
					'\$subTitle' . '</span></h2></div></div>' .
					'<article id="content-item-container" class="py-01 pb-0 bg-light-lm rounded-bottom px-0 bg-very-dark title-bkgd">' .
					$inner_html . '</article>' .
					'<div class="px-20 py-10 bg-light-lm bg-dark-dm rounded-bottom border-top">' .
					'<div class="content-tag-container"><i class="fad fa-tags"></i>';
				
				if(sizeof($this->article->tags) > 0) {
					foreach($this->article->tags as $tag) {
						$inner_html .= '<a href="'.l10n_url_abs("/content/?tags=" . $tag .
								'" class="content-tag">#' . $tag . '</a>');
					}
				} else {
					$inner_html .= '<i>' . localize("error.content.data.no.tags") . '</i>';
				}
				
				$inner_html .= '</div></div></div>';
				break;
			case ComposerTemplates::RAW:
			default:
				break;
		}
		return $inner_html;
	}
	
	/*function start_content_card($iconClasses, $title, $subTitle) {
	echo('<div class="card p-0 mx-0"><div class="px-card py-10 border-bottom px-20"><div class="container-fluid">');
	echo('<h2 class="card-title font-size-18 m-0"><i class="'.$iconClasses.'"></i>&nbsp;&nbsp;'.localize($title));
	echo('<span class="card-title font-size-18 m-0 text-super-muted float-right hidden-xs-and-down">'.$subTitle.'</span></h2>');
	echo('</div></div>');
}
	
	function end_content_card() {
		echo('</div>');
	}*/
}

class ComposerContentMetadataOpengraph {
	private ?string $title;
	private ?string $description;
	private ?string $type;
	private ?string $url;
	private ?string $image;
	private ?string $imageType;
	
	function __construct(?string $title, ?string $description, ?string $type, ?string $url, ?string $image,
						 ?string $imageType) {
		$this->title = $title;
		$this->description = $description;
		$this->type = $type;
		$this->url = $url;
		$this->image = $image;
		$this->imageType = $imageType;
	}
	
	static function from_json(array $json_data) : ComposerContentMetadataOpengraph {
		return new ComposerContentMetadataOpengraph(
			key_exists("title", $json_data) ? $json_data["title"] : null,
			key_exists("description", $json_data) ? $json_data["description"] : null,
			key_exists("type", $json_data) ? $json_data["type"] : null,
			key_exists("url", $json_data) ? $json_data["url"] : null,
			key_exists("image", $json_data) ? $json_data["image"] : null,
			key_exists("imageType", $json_data) ? $json_data["imageType"] : null,
		);
	}
	
	public function __get($property) {
		return is_null($this->$property) ? "" : $this->$property;
	}
}

class ComposerContentMetadataArticle {
	public string $icon;
	public string $title;
	public array $tags;
	
	function __construct(string $icon, string $title, array $tags) {
		$this->icon = $icon;
		$this->title = $title;
		$this->tags = $tags;
	}
	
	static function from_json(array $json_data) : ComposerContentMetadataArticle {
		return new ComposerContentMetadataArticle(
			key_exists("icon", $json_data) ? $json_data["icon"] : "fad fa-question",
			key_exists("title", $json_data) ?
				$json_data["title"] : '<i>'.localize("error.content.data.no.title").'</i>',
			key_exists("tags", $json_data) ? $json_data["tags"] : [],
		);
	}
	
	public function __get($property) {
		return is_null($this->$property) ? "" : $this->$property;
	}
}

class ComposerElement {
	// Global parameters
	private string $type;
	private ?array $modifiers;
	
	// Any direct element-container
	private ?array $parts;
	
	// Any direct text-container
	private ?string $content;
	private bool $localize;
	
	// Generic modifier values
	private ?int $padding;
	private ?int $margin;
	
	// Spacer's size
	private ?int $size;
	
	// Table's parameters
	private ?array $head;
	private ?array $body;
	private ?int $colspan;
	private ?int $rowspan;
	
	// Paragraph and code's parameters
	private ?int $indent;
	
	// Code's parameters
	private ?array $code;
	
	function __construct(string $type, ?array $modifiers, ?array $parts, ?string $content, bool $localize,
						 ?int $padding, ?int $margin, ?int $size, ?array $head, ?array $body, ?int $colspan,
						 ?int $rowspan, ?int $indent, ?array $code) {
		$this->type = $type;
		$this->modifiers = $modifiers;
		$this->parts = $parts;
		$this->content = $content;
		$this->localize = $localize;
		$this->padding = $padding;
		$this->margin = $margin;
		$this->size = $size;
		$this->head = $head;
		$this->body = $body;
		$this->colspan = $colspan;
		$this->rowspan = $rowspan;
		$this->indent = $indent;
		$this->code = $code;
	}
	
	static function from_json_array(array $json_dataArray) : array {
		$parts = array();
		foreach($json_dataArray as $part) {
			$parts[] = ComposerElement::from_json($part);
		}
		return $parts;
	}
	
	static function from_json(array $json_data) : ComposerElement {
		return new ComposerElement(
			key_exists("type", $json_data) ? $json_data["type"] : ComposerElementTypes::UNSET,
			key_exists("modifiers", $json_data) ? $json_data["modifiers"] : null,
			key_exists("parts", $json_data) ? ComposerElement::from_json_array($json_data["parts"]) : null,
			key_exists("content", $json_data) ? $json_data["content"] : null,
			key_exists("localize", $json_data) ? $json_data["localize"] : true,
			key_exists("padding", $json_data) ? $json_data["padding"] : null,
			key_exists("margin", $json_data) ? $json_data["margin"] : null,
			key_exists("size", $json_data) ? $json_data["size"] : null,
			key_exists("head", $json_data) ? $json_data["head"] : null,
			key_exists("body", $json_data) ? $json_data["body"] : null,
			key_exists("colspan", $json_data) ? $json_data["colspan"] : null,
			key_exists("rowspan", $json_data) ? $json_data["rowspan"] : null,
			key_exists("indent", $json_data) ? $json_data["indent"] : null,
			key_exists("code", $json_data) ? $json_data["code"] : null,
		);
	}
	
	/**
	 * Processes the "content" and "parts" class' variables and returns their interpreted content as HTML.
	 * @param ComposerContent $contentRoot The content in which this element is contained.
	 * @param bool $doLocalization Whether the "content" variable should be processed to return localized text.
	 * @param bool $doSubElements Whether the "parts" variable should be processed to return localized text.
	 * @param bool $stopIfLocalized Whether the process should return if some text was in the "content" variable.
	 * @return string The interpreted content as HTML.
	 */
	private function get_inner_html(ComposerContent $contentRoot, bool $doLocalization = true,
									bool $doSubElements = true, bool $stopIfLocalized = true) : string {
		global $LANG_FALLBACK_KEY_PREFIX;
		
		$htmlCode = "";
		$wasTextLocalized = false;
		
		if($doLocalization) {
			// Checking if "content" was declared.
			if(is_null($this->content) && !$doSubElements) {
				return "<p>error.no.inner.content</p>";
			}
			
			// Checking if there is something to process.
			if(!empty($this->content)) {
				$wasTextLocalized = true;
				
				if(!$this->localize) {
					$htmlCode .= $this->content;
				} else {
					// We can now localize the content key.
					$htmlCode .= localize_private($this->content, $contentRoot->strings, true,
						$LANG_FALLBACK_KEY_PREFIX);
				}
			}
			
			// Checking for early stop.
			if($wasTextLocalized && $stopIfLocalized) {
				return $htmlCode;
			}
		}
		
		if($doSubElements) {
			// Checking if "parts" was declared.
			if(is_null($this->parts)) {
				if(!$wasTextLocalized) {
					$htmlCode = "<p>error.no.inner.parts</p>";
				}
				return $htmlCode;
			}
			
			// Appending each sub-element.
			foreach($this->parts as $subElement) {
				/** @var ComposerElement $subElement */
				$htmlCode .= $subElement->get_html($contentRoot);
			}
		}
		
		return $htmlCode;
	}
	
	private function get_inner_html_elements(ComposerContent $contentRoot) : string {
		return $this->get_inner_html($contentRoot, false, true, false);
	}
	
	private function get_inner_html_text(ComposerContent $contentRoot) : string {
		return $this->get_inner_html($contentRoot, true, false, false);
	}
	
	private function get_modifiers_classes() : string {
		if(!is_null($this->modifiers)) {
			$classes = "";
			
			// Combining classes.
			foreach($this->modifiers as $modifier) {
				/** @var string $modifier */
				$classes .= ComposerElementModifiersTest::getClassesFromKey($modifier) . ' ';
			}
			
			// Removing redundant and useless spaces.
			return preg_replace('/\s+/', ' ', trim($classes));
		}
		
		return "";
	}
	
	/**
	 * Processes the element and returns its interpreted form as HTML.
	 * @param ComposerContent $contentRoot The content in which this element is contained.
	 * @return string The interpreted element as HTML.
	 */
	public function get_html(ComposerContent $contentRoot) : string {
		$htmlCode = "";
		
		switch($this->type) {
			case ComposerElementTypes::UNSET:
				$htmlCode .= "<p>error.unset !</p>";
				break;
			
			case ComposerElementTypes::H1:
			case ComposerElementTypes::H2:
			case ComposerElementTypes::H3:
				// Defining the text's size.
				$_headingFontSize = ($this->type == ComposerElementTypes::H3 ? '18' : (
					$this->type == ComposerElementTypes::H2 ? '20' : '22'
				));
				
				// Composing heading.
				$htmlCode .= '<' . strtolower($this->type) . ' class="font-weight-semi-bold font-size-' .
					$_headingFontSize . ' m-0">' . $this->get_inner_html($contentRoot) . '</' . strtolower($this->type) .
					'>';
				
				break;
				
			case ComposerElementTypes::PARAGRAPH:
				// Defining the text's indent level.
				$_paragraph_ident_level = is_null($this->indent) ? 0 : $this->indent;
				
				// Composing the paragraph
				$htmlCode .= '<p class="' .
					(ComposerElementModifiersTest::is_modifier_in_modifiers(
						ComposerElementModifiersTest::GENERIC_MARGIN_NO_TOP, $this->modifiers)
					? 'mt-0 mb-10' : 'my-10') . ' ml-md-' . ($_paragraph_ident_level * 5) . '">' .
					$this->get_inner_html($contentRoot) . '</p>';
				
				break;
				
			case ComposerElementTypes::BUTTON:
				break;
				
			case ComposerElementTypes::CODE:
				// Defining the code's indent level.
				$_paragraph_ident_level = is_null($this->indent) ? 0 : $this->indent;
				
				// Opening the code element.
				$htmlCode .= '<code class="code ' . $this->get_modifiers_classes() .
					' ml-md-' . ($_paragraph_ident_level * 5) . '">';
				
				// Adding code lines.
				if(!is_null($this->code)) {
					foreach($this->code as $code_line) {
						$htmlCode .= htmlspecialchars($code_line) . '<br>';
					}
				}
				
				// Closing code element.
				$htmlCode .= '</code>';
				
				break;
				
			case ComposerElementTypes::HR:
				// Getting the modifiers' classes
				$_hr_classes = $this->get_modifiers_classes();
				
				// Composing the element.
				if(empty($_hr_classes)) {
					$htmlCode .= '<div class="sidebar-divider"></div>';
				} else {
					$htmlCode .= '<hr class="' . $_hr_classes . '">';
				}
				
				break;
				
			case ComposerElementTypes::CONTAINER:
				// Defining the padding's size.
				$_container_padding = is_null($this->padding) ? 10 : $this->padding;
				
				// Getting the modifiers' classes
				$_container_classes = $this->get_modifiers_classes();
				
				// Composing the container.
				$htmlCode .= '<div class="mt-10 p-' . $_container_padding .
					(empty($_container_classes) ? '' : ' ' . $_container_classes) . '">' .
					$this->get_inner_html($contentRoot) . '</div>';
				
				break;
				
			case ComposerElementTypes::COLLAPSE:
				break;
				
			case ComposerElementTypes::SPACER:
				// Defining the spacer's size.
				$_spacer_size = is_null($this->size) ? 1 : $this->size;
				
				// Composing spacer.
				$htmlCode .= '<div class="m-0 pt-'.($_spacer_size*5).' pb-md-'.($_spacer_size*5).'"></div>';
				
				break;
				
			case ComposerElementTypes::IMAGE:
				break;
			case ComposerElementTypes::TABLE:
				break;
			case ComposerElementTypes::GRID:
				break;
			case ComposerElementTypes::GLIDER:
				break;
				
			default:
				$htmlCode .= "<p>error.unknown !</p>";
				break;
		}
		
		return $htmlCode;
	}
}


// Generic functions
function get_content_error(string $error_title_key, string $error_description_key) : ?ComposerContent {
	// FIXME: Make this non-nullable !!!
	return null;
}

function get_content_file_path(string $content_id) : ?string {
	global $dir_content;
	
	if(ctype_alnum(str_replace("-", "", $content_id))) {
		return realpath($dir_content . "/items/" . $content_id . ".json");
	}
	
	return null;
}

function load_content_by_file_path(string $file_path) : ?ComposerContent {
	// FIXME: Add handling for JSON errors !
	$content_json_data = json_decode(file_get_contents($file_path), true);
	return ComposerContent::from_json($content_json_data);
}

function load_content_by_id(string $content_id) : ?ComposerContent {
	$content_file_path = get_content_file_path($content_id);
	
	if(is_null($content_file_path)) {
		return null;
	} else {
		return load_content_by_file_path($content_file_path);
	}
}

// Test
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	$content = load_content_by_id("test2");
	
	if(!is_null($content)) {
		echo "<pre>";
		print_r(htmlspecialchars($content->get_html()));
		echo "</pre>";
		
		echo "<pre>";
		print_r($content);
		echo "</pre>";
	}
	
	echo("<br>");
}
?>