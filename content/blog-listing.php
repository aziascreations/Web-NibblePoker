<?php if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) { header('HTTP/1.1 403 Forbidden'); die(); } ?>
<div class="content"><?php

function handleError($errorMessage) {
	
}

function printBlogPreviewCard($id, $title, $previewPreface, $previewText, $previewImageUrl, $previewImageAlt, $tags, $faIcon) {
    echo('<div class="card p-0 mx-0"><div class="px-card py-10 border-bottom px-20"><h2 class="card-title font-size-18 m-0 d-inline-block">
<span class="text-left"><i class="'.$faIcon.'"></i>&nbsp;&nbsp;'.$title.'</span><span class="text-right"></span></h2></div>');
	
	echo('<div class="d-flex"><div class="w-100 h-100 m-10 align-self-center"><div class="w-100 h-100 rounded d-flex align-items-center justify-content-center" style="background-color: #5352ed;">
<img src="'.$previewImageUrl.'" class="d-block w-100 h-100 rounded" loading="lazy" alt="'.$previewImageAlt.'"></div></div><div class="flex-grow-1 overflow-y-hidden d-flex align-items-center position-relative h-120">
<div class="p-10 w-full m-auto">');
    
    if(!empty($previewPreface)) {
        echo('<p class="font-size-10 text-dark-lm text-light-dm m-0 mb-5 text-truncate font-weight-medium">'.$previewPreface.'</p>');
    }
    
    if(!empty($previewText)) {
        echo('<p class="font-size-12 mt-5 mb-0">'.$previewText.'<br><span class="text-primary text-smoothing-auto-dm d-inline-block">Click here <i class="fa fa-angle-right" aria-hidden="true"></i></span></p>');
    } else {
        echo('<p class="font-size-12 mt-5 mb-0"><span class="text-primary text-smoothing-auto-dm d-inline-block">Click here <i class="fa fa-angle-right" aria-hidden="true"></i></span></p>');
    }
    
	echo('</div><div class="sponsor-section-card-scroll-block"></div></div></div>');
	
    echo('<div class="px-card py-10 bg-light-lm bg-very-dark-dm rounded-bottom px-20"><p class="font-size-12 m-0"><i class="fad fa-tags"></i>');
    foreach($tags as &$tagValue) {
        echo('&nbsp;&nbsp;<a href="?c=t&t='.$tagValue.'">#'.$tagValue.'</a>');
    }
	echo('</p></div></div>');
}

/* Defining globals and constants */
const BLOG_ACTION_NONE = "n";
const BLOG_ACTION_SEARCH_TAGS = "t";
const BLOG_ACTION_SEARCH_AUTHOR = "a";
const BLOG_ACTION_SEARCH_DATE = "d";
//const BLOG_ACTION_ERROR_SEARCH_TYPE_INVALID = "e";

const BLOG_PARAM_ACTION = "c";
const BLOG_PARAM_ARTICLE_PER_PAGE = "c";
const BLOG_PARAM_PAGE = "p";
const BLOG_PARAM_SEARCH_PARAM = "s";

$blog_action = BLOG_ACTION_NONE;
$blog_search_parameter = "";
$current_page = 0;
$article_per_page = 10;

/* Parsing and verifying arguments */
if(count($_GET) > 0) {
	if(array_key_exists(BLOG_PARAM_ACTION, $_GET)) {
		$blog_action = $_GET[BLOG_PARAM_ACTION];
	}
	if(array_key_exists(BLOG_PARAM_ARTICLE_PER_PAGE, $_GET)) {
		$article_per_page = $_GET[BLOG_PARAM_ARTICLE_PER_PAGE];
	}
	if(array_key_exists(BLOG_PARAM_PAGE, $_GET)) {
		$current_page = $_GET[BLOG_PARAM_PAGE];
	}
	if(array_key_exists(BLOG_PARAM_SEARCH_PARAM, $_GET)) {
		$blog_search_parameter = $_GET[BLOG_PARAM_SEARCH_PARAM];
	}
}

if(!($blog_action == BLOG_ACTION_NONE || $blog_action == BLOG_ACTION_SEARCH_TAGS ||
     $blog_action == BLOG_ACTION_SEARCH_AUTHOR || $blog_action == BLOG_ACTION_SEARCH_DATE)) {
    $blog_action = BLOG_ACTION_NONE;
}
   
if(!is_numeric($article_per_page)) {
    $article_per_page = 10;
}

if(!is_numeric($current_page)) {
    $current_page = 0;
}

/* Loading blog entries */
$jsonArticles = null;

try {
    $jsonArticles = file_get_contents("articles.json");
    $jsonArticles = json_decode($jsonArticles, true);
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
    $jsonArticles = null;
}

if($jsonArticles == null) {
    exit("An error occured during the JSON parsing process...");
}

/* Printing the articles... */
$currentArticleId = 0;
$articlesLeft = $article_per_page;

//TODO: Max value is not right or checked yet !
for($currentArticleId = ($article_per_page * $current_page); $currentArticleId < count($jsonArticles); $currentArticleId++) {
    //echo($jsonArticles[$currentArticleId]["id"]."<br>");
    printBlogPreviewCard(
        $jsonArticles[$currentArticleId]["id"],
        $jsonArticles[$currentArticleId]["title"],
        $jsonArticles[$currentArticleId]["preview"]["preface"],
        $jsonArticles[$currentArticleId]["preview"]["text"],
        $jsonArticles[$currentArticleId]["preview"]["image"],
        $jsonArticles[$currentArticleId]["preview"]["imageAlt"],
        $jsonArticles[$currentArticleId]["tags"],
        $jsonArticles[$currentArticleId]["preview"]["icon"]);
}
?></div>
