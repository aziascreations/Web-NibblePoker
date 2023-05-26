<?php
$start_time = microtime(true);

// Importing required scripts.
set_include_path('../');
include_once 'commons/config.php';
include_once 'commons/langs.php';

// Preparing the content
include_once 'commons/content.php';
include_once 'commons/content/tools.php';
$contentManager = getContentManager($config_dir_tools);
$toolInfo = NULL;
if(!$contentManager->hasError && $contentManager->displayType == ContentDisplayType::CONTENT) {
    $toolInfo = ToolsContent::loadItemIndexFile($contentManager, $config_dir_tools);
	if(!is_null($toolInfo)) {
		$toolInfo->validateFiles($contentManager);
	}
    // If we still don't have errors, we load the lang file.
	if(!$contentManager->hasError && !is_null($toolInfo->langFile)) {
        // FIXME: Refactor the 'langs.php' to include this bit.
		$toolLangJson = file_get_contents($toolInfo->langFile);
		$toolLangData = json_decode($toolLangJson, true);
		unset($toolLangJson);
		if(array_key_exists($default_language, $toolLangData)) {
			$lang_data[$default_language] = array_merge($lang_data[$default_language], $toolLangData[$default_language]);
		}
		if($default_language != $user_language && array_key_exists($user_language, $toolLangData)) {
			$lang_data[$user_language] = array_merge($lang_data[$user_language], $toolLangData[$user_language]);
		}
		unset($toolLangData);
    }
}
$content_error_message = localize($contentManager->errorMessageKey);

// Checking if an error occurred while loading data and parsing the URL.
// And if not, enabling special features.
$content_error_code = 200;
if($contentManager->hasError) {
	// TODO: Add condition for the lack of data for an item.
	if(is_null($contentManager->rootIndexEntries)) {
		// Failed to get a display type or to extract types.
		header("HTTP/1.1 400 Bad Request");
		$content_error_code = 400;
	} else {
		//Other error. (No article, ...)
		header("HTTP/1.1 500 Internal Server Error");
		$content_error_code = 500;
	}
} else {
	$enable_code_highlight = true;
	$enable_glider = true;
}
?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'commons/DOM/head.php'; ?>
	<title><?php print(localize('tools.head.title')); ?></title>
	<meta name="description" content="<?php print(localize('tools.head.description')); ?>">
	<meta property="og:title" content="<?php print(localize('tools.og.title')); ?>"/>
	<meta property="og:type" content="website"/>
	<meta property="og:url" content="<?php echo($host_uri . l10n_url_abs('/')); ?>"/>
	<meta property="og:image" content="<?php echo($host_uri); ?>/resources/NibblePoker/images/logos/v2_opengraph.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="<?php print(localize('tools.og.description')); ?>"/>
</head>
<body>
<?php
include_once 'commons/DOM/utils.php';
include 'commons/DOM/body-1.php';
$SIDEBAR_ID = 'tools';
include 'commons/DOM/sidebar.php';
include 'commons/DOM/body-2.php';
?>
<header class="w-full p-m pl-s">
	<h1 class="t-size-17 t-w-500">
		<i class="fad fa-tools t-size-16 mr-s t-muted"></i><?php print(localize("tools.header.title")); ?>
	</h1>
	<?php //include 'header-lang.php'; ?>
</header>
<?php include 'commons/DOM/body-3.php'; ?>
<main id="main" class="rl-m border border-r-0 p-l">
	<?php
	// Checking if an error occurred.
	if($content_error_code != 200) {
		if($contentManager->displayType == ContentDisplayType::SEARCH) {
			printMainHeader(localize("content.error.heading.main.search"), "fad fa-exclamation-triangle");
		} elseif($contentManager->displayType == ContentDisplayType::CONTENT) {
			printMainHeader(localize("content.error.heading.main.content"), "fad fa-exclamation-triangle");
		} else {
			printMainHeader(localize("content.error.heading.main.fallback"), "fad fa-exclamation-triangle");
		}
		
		echo('<h3 class="mt-m t-size-18 t-center content-error-text mx-auto">' . $content_error_message . '</h3>');
        
		goto content_printing_end;
	}
	
	if($contentManager->displayType == ContentDisplayType::SEARCH) {
		// We are handling a content search with at least one result.
		
		// Making the header with the amount of results.
		printMainHeader(
			count($contentManager->rootIndexEntries) > 1 ?
				localize("content.search.heading.main.multiple") :
				localize("content.search.heading.main.single"),
			"fad fa-file-search",
			count($contentManager->rootIndexEntries) . " " . (
			count($contentManager->rootIndexEntries) > 1 ?
				localize("content.search.count.multiple") :
				localize("content.search.count.single")));
		
		// Printing the entry for each piece of relevant content.
		$doPrintRuler = false;
		foreach($contentManager->rootIndexEntries as $current_content) {
			/** @var ContentIndexEntry $current_content */
			if($doPrintRuler) {
				echo('<hr class="subtle">');
			} else {
				$doPrintRuler = true;
			}
			echo('<div class="p-s">');
			echo('<a class="casper-link" href="'.l10n_url_abs("/tools/".$current_content->id).'">');
			echo('<div class="content-search-entry">');
			echo('<img class="content-search-image mr-s r-l" src="' . $current_content->image . '">');
			echo('<h3 class="mb-xs">' . $current_content->title[$user_language] . '</h3>');
			echo('<p>' . $current_content->preamble[$user_language] . '</p>');
			echo('</div>');
			echo('</a>');
			echo('<p class="mt-xs"><i class="fad fa-tags t-size-8"></i>');
			foreach($current_content->tags as $current_content_tag) {
				echo('<a href="' . l10n_url_abs("/tools/?tags=".$current_content_tag) .
					'" class="ml-xs">#' . $current_content_tag . '</a>');
			}
			echo('</p>');
			echo('</div>');
		}
		
		// TODO: Print the tags used in the search and others that may be available.
	} elseif($contentManager->displayType == ContentDisplayType::CONTENT) {
        // Printing the main heading  (Lifted from composer.php in the templates section)
		echo(getMainHeader(
			localize($toolInfo->titleKey),
			$toolInfo->icon,
			is_null($toolInfo->subTitleKey) ? null : localize($toolInfo->subTitleKey),
			null,
			false,
			null,
			3,
			false,
			true
		));
  
		// Printing the content
		echo('<div class="px-xxs">');  // mt-l
        include($toolInfo->domFile);
        echo('</div>');
	}
	
	// Label used when there is an error to skip the content printing parts.
	content_printing_end:
	?>
</main>
<?php
include 'commons/DOM/body-4.php';
include 'commons/DOM/footer.php';
include 'commons/DOM/body-5.php';
include 'commons/DOM/scripts.php';

// Including the tool's scripts if required.
if(!$contentManager->hasError && $contentManager->displayType == ContentDisplayType::CONTENT) {
    foreach($toolInfo->codeFilesPaths as $codeFilePath) {
		echo('<script src="'.substr($codeFilePath, strlen($dir_root)).'"></script>');
    }
}
?>
</body>
</html>
<?php
$end_time = microtime(true);
if($print_execution_timer) {
	echo("<!-- PHP execution took " . round(($end_time - $start_time) * 1000, 2) . " ms -->");
}
?>
