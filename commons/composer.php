<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

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
	const RAW       = "raw";
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
	const GALLERY   = "gallery";
	const VIDEO     = "video";
	
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
abstract class ComposerElementModifiers {
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
	const GENERIC_PADDING_NO_X      = ["no-x-padding",      "px-0"];
	const GENERIC_PADDING_NO_Y      = ["no-y-padding",      "py-0"];
	const GENERIC_PADDING_NONE      = ["no-padding",        "p-0" ];
	
	// Containers
	const CONTAINER_SCROLL_HORIZONTAL = ["horizontal-scroll", "overflow-x-scroll hide-scrollbar"];
	const CONTAINER_CARD = ["card", "card"];
	
	// Buttons
	const BUTTON_THIN  = ["thin", "btn-sm"];
	const BUTTON_THICK = ["thick", "btn-lg"];
	const BUTTON_ROUNDED = ["rounded", "btn-rounded"];
	const BUTTON_CIRCLE = ["circle", "rounded-circle"];
	
	// Horizontal ruler
	const HR_SUBTLE = ["subtle", "subtle"];
	
	// Collapse
	const DETAILS_NO_ROUNDING = ["no-rounding", ""];
	const DETAILS_CLOSED = ["closed", ""];
	
	// Tables
	const TABLE_NO_OUTER_PADDING = ["no-outer-padding", "table-no-outer-padding"];
	const TABLE_STRIPED = ["striped", "table-striped"];
	const TABLE_HOVER = ["hover", "table-hover"];
	const TABLE_INNER_BORDER = ["inner-bordered", "table-inner-bordered"];
	const TABLE_OUTER_BORDER = ["outer-bordered", "table-outer-bordered"];
	
	// Code
	const CODE_BLOCK = ["code-block", "w-full d-inline-block"];
	
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
	 * @param array $modifier_data A modifier constant defined in "ComposerElementModifiers".
	 * @return string The modifier's key or an empty string if an error was encountered.
	 */
	static function get_modifier_key(array $modifier_data) : string {
		return sizeof($modifier_data) >= 1 ? $modifier_data[ComposerElementModifiers::_INDEX_KEY] : '';
	}
	
	/**
	 * Returns the given modifier's constant's classes
	 * @param array $modifier_data A modifier constant defined in "ComposerElementModifiers".
	 * @return string The modifier's classes or an empty string if an error was encountered.
	 */
	static function get_modifier_classes(array $modifier_data) : string {
		return sizeof($modifier_data) >= 2 ? $modifier_data[ComposerElementModifiers::_INDEX_CLASSES] : '';
	}
	
	/**
	 * @param string $modifier_key
	 * @return string The resolved DOM classes, or an empty string if the given modifier is unknown.
	 */
	static function get_classes_from_key(string $modifier_key) : string {
		foreach(ComposerElementModifiers::getConstants() as $constant_values) {
			if(!is_array($constant_values)) {
				continue;
			}
			if($modifier_key == $constant_values[ComposerElementModifiers::_INDEX_KEY]) {
				return $constant_values[ComposerElementModifiers::_INDEX_CLASSES];
			}
		}
		return "";
	}
	
	static function is_modifier_in_modifiers(array $modifier_data, array $modifiers) : bool {
		foreach($modifiers as $modifier) {
			if($modifier_data[ComposerElementModifiers::_INDEX_KEY] == $modifier) {
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
		
		return $this->metadata->apply_template($this, $htmlCode);
	}
	
	public function get_head_title() : string {
		if(!is_null($this->metadata->head->title)) {
			return localize_private($this->metadata->head->title, $this->strings, false);
		}
		
		return localize("content.default.head.title");
	}
	
	public function get_head_description() : string {
		if(!is_null($this->metadata->head->title)) {
			return localize_private($this->metadata->head->description, $this->strings, false);
		}
		
		return localize("content.default.head.description");
	}
	
	public function get_opengraph_tags(?string $title_prefix, ?string $type_override, ?string $url_override,
									   ?string $image_url_override, ?string $image_url_fallback) : string {
		global $host_uri;
		
		$final_image_uri = (is_null($image_url_override) ? (is_null($this->metadata->opengraph->image) ?
			$image_url_fallback : $this->metadata->opengraph->image) : $image_url_override);
		
		return '<meta property="og:title" content="' . (is_null($title_prefix) ? '' : $title_prefix) .
			(is_null($this->metadata->opengraph->title) ?
				localize("content.default.opengraph.title") :
				localize_private($this->metadata->opengraph->title, $this->strings, false)) .
			'" /><meta property="og:description" content="' . (is_null($this->metadata->opengraph->description) ?
				localize("content.default.opengraph.description") :
				localize_private($this->metadata->opengraph->description, $this->strings, false)) .
			'" /><meta property="og:type" content="' . (is_null($type_override) ?
				(is_null($this->metadata->opengraph->type) ? "website" : $this->metadata->opengraph->type)
				: $type_override) . '" /><meta property="og:url" content="' .
			(is_null($url_override) ? (is_null($this->metadata->opengraph->url) ?
				$host_uri : $this->metadata->opengraph->url) : $url_override) .
			'" /><meta property="og:image" content="' . $final_image_uri . '"/>';
    	//<meta property="og:image:type" content="image/png"/>
	}
}

class ComposerContentMetadata {
	public string $title;
	public string $description;
	public string $template;
	public ComposerContentMetadataHead $head;
	public ComposerContentMetadataOpengraph $opengraph;
	public ?ComposerContentMetadataArticle $article;
	
	function __construct(string $title, string $description, string $template, ComposerContentMetadataHead $head,
						 ComposerContentMetadataOpengraph $opengraph, ?ComposerContentMetadataArticle $article) {
		$this->title = $title;
		$this->description = $description;
		$this->template = $template;
		$this->head = $head;
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
			ComposerContentMetadataHead::from_json(
				key_exists("head", $json_data) ? $json_data["head"] : array()
			),
			ComposerContentMetadataOpengraph::from_json(
				key_exists("opengraph", $json_data) ? $json_data["opengraph"] : array()
			),
			key_exists("article", $json_data) ?
				ComposerContentMetadataArticle::from_json($json_data["article"]) : null,
		);
	}
	
	function apply_template(ComposerContent $content_root, string $inner_html) : string {
		switch($this->template) {
			case ComposerTemplates::ARTICLE:
				$inner_html = '<div class="card p-0 mx-0"><div class="px-card py-10 border-bottom px-20">' .
					'<div class="container-fluid"><h2 class="card-title font-size-18 m-0">' .
					'<i class="' . $this->article->icon . '"></i>&nbsp;&nbsp;' .
					localize_private($this->article->title, $content_root->strings, false) .
					'<span class="card-title font-size-18 m-0 text-super-muted float-right hidden-xs-and-down">' .
					localize_private($this->article->subtitle, $content_root->strings, false) .
					'</span></h2></div></div>' .
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
}

class ComposerContentMetadataHead {
	public ?string $title;
	public ?string $description;
	
	function __construct(?string $title, ?string $description) {
		$this->title = $title;
		$this->description = $description;
	}
	
	static function from_json(array $json_data) : ComposerContentMetadataHead {
		return new ComposerContentMetadataHead(
			key_exists("title", $json_data) ? $json_data["title"] : null,
			key_exists("description", $json_data) ? $json_data["description"] : null
		);
	}
}

class ComposerContentMetadataOpengraph {
	public ?string $title;
	public ?string $description;
	public ?string $type;
	public ?string $url;
	public ?string $image;
	public ?string $image_type;
	
	function __construct(?string $title, ?string $description, ?string $type, ?string $url, ?string $image,
						 ?string $image_type) {
		$this->title = $title;
		$this->description = $description;
		$this->type = $type;
		$this->url = $url;
		$this->image = $image;
		$this->image_type = $image_type;
	}
	
	static function from_json(array $json_data) : ComposerContentMetadataOpengraph {
		return new ComposerContentMetadataOpengraph(
			key_exists("title", $json_data) ? $json_data["title"] : null,
			key_exists("description", $json_data) ? $json_data["description"] : null,
			key_exists("type", $json_data) ? $json_data["type"] : null,
			key_exists("url", $json_data) ? $json_data["url"] : null,
			key_exists("image", $json_data) ? $json_data["image"] : null,
			key_exists("image_type", $json_data) ? $json_data["image_type"] : null,
		);
	}
}

class ComposerContentMetadataArticle {
	public string $icon;
	public string $title;
	public string $subtitle;
	public array $tags;
	
	function __construct(string $icon, string $title, string $subtitle, array $tags) {
		$this->icon = $icon;
		$this->title = $title;
		$this->subtitle = $subtitle;
		$this->tags = $tags;
	}
	
	static function from_json(array $json_data) : ComposerContentMetadataArticle {
		return new ComposerContentMetadataArticle(
			key_exists("icon", $json_data) ? $json_data["icon"] : "fad fa-question",
			key_exists("title", $json_data) ?
				$json_data["title"] : '<i>'.localize("error.content.data.no.title").'</i>',
			key_exists("subtitle", $json_data) ? $json_data["subtitle"] : '',
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
	private ?string $link;
	
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
	private int $colspan;
	private int $rowspan;
	
	// Paragraph and code's parameters
	private ?int $indent;
	
	// Code's parameters
	private ?array $code;
	
	// Button's parameters
	private ?string $color;
	
	// Image and video's parameters
	private ?string $source;
	private ?string $thumbnail;
	
	function __construct(string $type, ?array $modifiers, ?string $link, ?array $parts, ?string $content,
						 bool $localize, ?int $padding, ?int $margin, ?int $size, ?array $head, ?array $body,
						 int $colspan, int $rowspan, ?int $indent, ?array $code, ?string $color, ?string $source,
						 ?string $thumbnail) {
		$this->type = $type;
		$this->modifiers = $modifiers;
		$this->link = $link;
		$this->parts = $parts;
		$this->content = $content;
		$this->localize = $localize;
		$this->padding = $padding;
		$this->margin = $margin;
		$this->size = $size;
		$this->head = ComposerElement::from_json_array($head);
		if(is_null($body)) {
			$this->body = array();
		} else {
			$this->body = array_fill(0, sizeof($body), []);
			for($body_row_index = 0; $body_row_index < sizeof($body); $body_row_index++) {
				$this->body[$body_row_index] = ComposerElement::from_json_array($body[$body_row_index]);
			}
		}
		$this->colspan = $colspan;
		$this->rowspan = $rowspan;
		$this->indent = $indent;
		$this->code = $code;
		$this->color = $color;
		$this->source = $source;
		$this->thumbnail = $thumbnail;
	}
	
	static function from_json_array(?array $json_dataArray) : array {
		$parts = array();
		if(!is_null($json_dataArray)) {
			foreach($json_dataArray as $part) {
				$parts[] = ComposerElement::from_json($part);
			}
		}
		return $parts;
	}
	
	static function from_json(array $json_data) : ComposerElement {
		return new ComposerElement(
			key_exists("type", $json_data) ? $json_data["type"] : ComposerElementTypes::UNSET,
			key_exists("modifiers", $json_data) ? $json_data["modifiers"] : [],
			key_exists("link", $json_data) ? $json_data["link"] : null,
			key_exists("parts", $json_data) ? ComposerElement::from_json_array($json_data["parts"]) : null,
			key_exists("content", $json_data) ? $json_data["content"] : null,
			key_exists("localize", $json_data) ? $json_data["localize"] : true,
			key_exists("padding", $json_data) ? $json_data["padding"] : null,
			key_exists("margin", $json_data) ? $json_data["margin"] : null,
			key_exists("size", $json_data) ? $json_data["size"] : null,
			key_exists("head", $json_data) ? $json_data["head"] : null,
			key_exists("body", $json_data) ? $json_data["body"] : null,
			key_exists("colspan", $json_data) ? $json_data["colspan"] : 1,
			key_exists("rowspan", $json_data) ? $json_data["rowspan"] : 1,
			key_exists("indent", $json_data) ? $json_data["indent"] : null,
			key_exists("code", $json_data) ? $json_data["code"] : null,
			key_exists("color", $json_data) ? $json_data["color"] : null,
			key_exists("source", $json_data) ? $json_data["source"] : null,
			key_exists("thumbnail", $json_data) ? $json_data["thumbnail"] : null,
		);
	}
	
	/**
	 * Processes the "content" and "parts" class' variables and returns their interpreted content as HTML.
	 * @param ComposerContent $content_root The content in which this element is contained.
	 * @param bool $doLocalization Whether the "content" variable should be processed to return localized text.
	 * @param bool $doSubElements Whether the "parts" variable should be processed to return localized text.
	 * @param bool $stopIfLocalized Whether the process should return if some text was in the "content" variable.
	 * @return string The interpreted content as HTML.
	 */
	private function get_inner_html(ComposerContent $content_root, bool $doLocalization = true,
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
					$htmlCode .= localize_private($this->content, $content_root->strings, true,
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
				$htmlCode .= $subElement->get_html($content_root);
			}
		}
		
		return $htmlCode;
	}
	
	private function get_inner_html_elements(ComposerContent $content_root) : string {
		return $this->get_inner_html($content_root, false, true, false);
	}
	
	private function get_inner_html_text(ComposerContent $content_root) : string {
		return $this->get_inner_html($content_root, true, false, false);
	}
	
	private function get_modifiers_classes() : string {
		if(!is_null($this->modifiers)) {
			$classes = "";
			
			// Combining classes.
			foreach($this->modifiers as $modifier) {
				/** @var string $modifier */
				$classes .= ComposerElementModifiers::get_classes_from_key($modifier) . ' ';
			}
			
			// Removing redundant and useless spaces.
			return preg_replace('/\s+/', ' ', trim($classes));
		}
		
		return "";
	}
	
	/**
	 * Processes the element and returns its interpreted form as HTML.
	 * @param ComposerContent $content_root The content in which this element is contained.
	 * @return string The interpreted element as HTML.
	 */
	public function get_html(ComposerContent $content_root) : string {
		$htmlCode = "";
		
		if(!is_null($this->link)) {
			$htmlCode .= '<a href="' . $this->link . '"' .
				($this->type == ComposerElementTypes::BUTTON ? 'class="button-link"' : '') . '>';
		}
		
		switch($this->type) {
			case ComposerElementTypes::UNSET:
				$htmlCode .= "<p>error.element.type.unset !</p>";
				break;
				
			case ComposerElementTypes::RAW:
				$htmlCode .= $this->get_inner_html($content_root);
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
					$_headingFontSize . ' m-0">' . $this->get_inner_html($content_root) . '</' . strtolower($this->type) .
					'>';
				
				break;
				
			case ComposerElementTypes::PARAGRAPH:
				// Defining the text's indent level.
				$_paragraph_ident_level = is_null($this->indent) ? 0 : $this->indent;
				
				// Calculating the vertical margin modifiers
				$_paragraph_no_margin_top = ComposerElementModifiers::is_modifier_in_modifiers(
					ComposerElementModifiers::GENERIC_MARGIN_NO_TOP, $this->modifiers);
				$_paragraph_no_margin_bottom = ComposerElementModifiers::is_modifier_in_modifiers(
					ComposerElementModifiers::GENERIC_MARGIN_NO_BOTTOM, $this->modifiers);
				
				if($_paragraph_no_margin_top && $_paragraph_no_margin_bottom) {
					$_paragraph_margin_modifier = 'my-0';
				} else if($_paragraph_no_margin_top) {
					$_paragraph_margin_modifier = 'mt-0 mb-10';
				} else if($_paragraph_no_margin_bottom) {
					$_paragraph_margin_modifier = 'mt-10 mb-0';
				} else {
					$_paragraph_margin_modifier = 'my-10';
				}
				
				// Composing the paragraph
				$htmlCode .= '<p class="' . $_paragraph_margin_modifier. ' ml-md-' . ($_paragraph_ident_level * 5) .
					'">' . $this->get_inner_html($content_root) . '</p>';
				
				break;
				
			case ComposerElementTypes::BUTTON:
				// Composing the button.
				$htmlCode .= '<button class="btn ' . (is_null($this->color) ? '' : 'btn-' . $this->color . ' ') .
					$this->get_modifiers_classes() . '">' . $this->get_inner_html($content_root) . '</button>';
				
				break;
				
			case ComposerElementTypes::CODE:
				// Defining the code's indent level.
				$_paragraph_ident_level = is_null($this->indent) ? 0 : $this->indent;
				
				// Opening the code element.
				// Note: The "mt-10" may have to be removed if it clashes with 'no-margin-top' !
				$htmlCode .= '<code class="code ' . $this->get_modifiers_classes() .
					' mt-10 ml-md-' . ($_paragraph_ident_level * 5) . '">';
				
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
				
				// Composing the container.
				// FIXME: Can be re-standardized if a check for the default mt-10 is added at the end after adding the mods.
				$htmlCode .= '<div class="' .
					(ComposerElementModifiers::is_modifier_in_modifiers(
						ComposerElementModifiers::CONTAINER_CARD, $this->modifiers
					) ? ComposerElementModifiers::get_modifier_classes(
							ComposerElementModifiers::CONTAINER_CARD ) . " m-0 " : "") .
					'p-' . $_container_padding .
					(ComposerElementModifiers::is_modifier_in_modifiers(
						ComposerElementModifiers::GENERIC_MARGIN_NO_TOP, $this->modifiers
					) ? "" : " mt-10") .
					(ComposerElementModifiers::is_modifier_in_modifiers(
						ComposerElementModifiers::GENERIC_PADDING_NO_X, $this->modifiers
					) ? " " . ComposerElementModifiers::get_modifier_classes(
							ComposerElementModifiers::GENERIC_PADDING_NO_X ) : "") .
					(ComposerElementModifiers::is_modifier_in_modifiers(
						ComposerElementModifiers::GENERIC_PADDING_NO_BOTTOM, $this->modifiers
					) ? " " . ComposerElementModifiers::get_modifier_classes(
							ComposerElementModifiers::GENERIC_PADDING_NO_BOTTOM ) : "") .
					(ComposerElementModifiers::is_modifier_in_modifiers(
						ComposerElementModifiers::GENERIC_PADDING_NO_TOP, $this->modifiers
					) ? " " . ComposerElementModifiers::get_modifier_classes(
							ComposerElementModifiers::GENERIC_PADDING_NO_TOP ) : "") .
					(ComposerElementModifiers::is_modifier_in_modifiers(
						ComposerElementModifiers::CONTAINER_SCROLL_HORIZONTAL, $this->modifiers
					) ? " " . ComposerElementModifiers::get_modifier_classes(
							ComposerElementModifiers::CONTAINER_SCROLL_HORIZONTAL ) : "") . '">' .
					$this->get_inner_html($content_root) . '</div>';
				break;
				
			case ComposerElementTypes::COLLAPSE:
				// Composing collapse.
				$htmlCode .= '<details class="collapse-panel w-full' .
					(ComposerElementModifiers::is_modifier_in_modifiers(
						ComposerElementModifiers::GENERIC_MARGIN_NO_TOP, $this->modifiers
					) ? ' ' . ComposerElementModifiers::get_modifier_classes(
							ComposerElementModifiers::GENERIC_MARGIN_NO_TOP) : '') . '" ' .
					(ComposerElementModifiers::is_modifier_in_modifiers(
						ComposerElementModifiers::DETAILS_CLOSED, $this->modifiers
					) ? "closed" : "open") . '>';
				
				$htmlCode .= '<summary class="collapse-header p-10 px-15 text-truncate without-arrow' .
					(ComposerElementModifiers::is_modifier_in_modifiers(
						ComposerElementModifiers::DETAILS_NO_ROUNDING, $this->modifiers
					) ? ' rounded-0' : '') . ' border-left-0 border-right-0">';
				
				$_title = "title";
				$_subtitle = "subtitle";
				
				$htmlCode .= '<h4 class="font-size-16 m-0 align-middle no-select">' .
					'<i class="fad fa-angle-down hidden-collapse-closed font-size-24"></i>' .
					'<i class="fad fa-angle-up hidden-collapse-open font-size-24"></i>' .
					'<span class="font-weight-semi-bold align-top">&nbsp;&nbsp;'.$_title.
					'<span class="ml-20 text-muted">'.$_subtitle.'</span></span></h4></summary>';
				
				$htmlCode .= '<div class="collapse-content' .
					(ComposerElementModifiers::is_modifier_in_modifiers(
						ComposerElementModifiers::CONTAINER_SCROLL_HORIZONTAL, $this->modifiers
					) ? " " . ComposerElementModifiers::get_modifier_classes(
							ComposerElementModifiers::CONTAINER_SCROLL_HORIZONTAL ) : "") .
					(ComposerElementModifiers::is_modifier_in_modifiers(
						ComposerElementModifiers::GENERIC_PADDING_NONE, $this->modifiers
					) ? " p-0 py-01" : "") .
					(ComposerElementModifiers::is_modifier_in_modifiers(
						ComposerElementModifiers::DETAILS_NO_ROUNDING, $this->modifiers
					) ? " rounded-0" : "") . ' border-0 border-bottom">' .
					$this->get_inner_html($content_root) . '</div></details>';
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
				// Composing table.
				$htmlCode .= '<table class="table ' . $this->get_modifiers_classes() . '">';
				
				if(!is_null($this->head)) {
					$htmlCode .= '<thead><tr>';
					foreach($this->head as $head_element) {
						/** @var ComposerElement $head_element */
						$htmlCode .= '<th>' . $head_element->get_html($content_root) . '</th>';
					}
					$htmlCode .= '</tr></thead>';
				}
				
				if(!is_null($this->body)) {
					$htmlCode .= '<tbody>';
					
					for($body_row_index = 0; $body_row_index < sizeof($this->body); $body_row_index++) {
						$htmlCode .= '<tr>';
						
						foreach($this->body[$body_row_index] as $body_cell) {
							/** @var ComposerElement $body_cell */
							$htmlCode .= '<td' . ($body_cell->colspan > 1 ? ' colspan="' . $body_cell->colspan . '"' : '') .
								($body_cell->rowspan > 1 ? ' rowspan="' . $body_cell->rowspan . '"' : '') . '>' .
								$body_cell->get_html($content_root) . '</td>';
						}
						
						$htmlCode .= '</tr>';
					}
					
					$htmlCode .= '</tbody>';
				}
				
				$htmlCode .= '</table>';
				break;
				
			case ComposerElementTypes::GRID:
				break;
				
			case ComposerElementTypes::GALLERY:
				break;
			
			case ComposerElementTypes::VIDEO:
				// Composing the video element
				$htmlCode .= '<video ' . (is_null($this->source) ? '' : 'src="' . $this->source . '" ') .
					'class="' . $this->get_modifiers_classes() . '" ' .
					(is_null($this->thumbnail) ? '' : 'poster="' . $this->thumbnail . '" ') .
					'controls muted></video>';
				break;
				
			default:
				$htmlCode .= "<p>error.unknown !</p>";
				break;
		}
		
		if(!is_null($this->link)) {
			$htmlCode .= '</a>';
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
	$content_json_data = json_decode(file_get_contents($file_path), true);
	if(is_null($content_json_data)) {
		return null;
	}
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