<?php
$start_time = microtime(true);
set_include_path('./');
include_once 'commons/config.php';
include_once 'commons/langs.php';
?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'commons/DOM/head.php'; ?>
	<title><?php print(localize('home.head.title')); ?></title>
	<meta name="description" content="<?php print(localize('home.head.description')); ?>">
	<meta property="og:title" content="<?php print(localize('home.og.title')); ?>"/>
	<meta property="og:type" content="website"/>
	<meta property="og:url" content="<?php echo($host_uri . l10n_url_abs('/')); ?>"/>
    <meta property="og:image" content="<?php echo($host_uri); ?>/resources/NibblePoker/images/logos/v2_opengraph.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="<?php print(localize('home.og.description')); ?>"/>
	<style>
		#showcase-grid article > img {
			height: 96px;
		}
	</style>
</head>
<body>
<?php
include_once 'commons/DOM/utils.php';
$SIDEBAR_IDS = ['home'];
include 'commons/DOM/sidebar.php';
?>
<header class="w-full p-m pl-s">
	<h1 class="t-size-17 t-w-500">
        <i class="fad fa-home t-size-16 mr-s t-muted"></i><?php print(localize("home.header.title")); ?>
	</h1>
	<?php include 'commons/DOM/header-lang.php'; ?>
</header>
<main id="main" class="rl-m border border-r-0 p-l">
	
	<?php printMainHeader(localize("home.intro.title", ["<i class='ml-xxs'>NibblePoker." . $host_tld . "</i>"])); ?>
    <p class="mt-xs mx-s"><?php print(localize("home.intro.text.1")); ?></p>
    <p class="mt-xs mx-s"><?php print(localize("home.intro.text.2")); ?></p>
	
	<?php
	// Loading the "index.json" file for later use in the showcase.
	include_once 'commons/config.php';
	include_once 'commons/content.php';
	$contentManager = getContentManager($config_dir_content);
	$content = NULL;
	if(!$contentManager->hasError && $contentManager->displayType == ContentDisplayType::CONTENT) {
		$content = load_content_by_file_path($contentManager->contentFilepath);
		if(is_null($content)) {
			$contentManager->hasError = true;
			$contentManager->errorMessageKey = "content.error.message.cannot.load";
		}
	}
	$content_error_message = localize($contentManager->errorMessageKey);
	
	// Preparing the array of IDs
	$shown_projects = ["lscom-cli-dotnet", "youtube-auto-archiver",
		"excel-worksheet-password-remover", "dotnet-arguments"];
	shuffle($shown_projects);
	$shown_projects = array_slice($shown_projects, 0, 4);
	sort($shown_projects);
	
	// Printing the generic header
	printMainHeader(localize("home.showcase.title"));
	
	// Handling the printing.
	if($contentManager->hasError) {
		echo('<p class="mt-xs ml-s t-bold">' . $content_error_message . '</p>');
	} else {
		//col-mobile-1
		echo('<div id="showcase-grid" class="grid col-2 col-medium-1 mt-xs mx-s gap-s">');
		
		foreach($shown_projects as $shown_project_id) {
			/** @var ?ContentIndexEntry $shown_project */
			$shown_project = null;
			foreach($contentManager->rootIndexEntries as $current_content) {
				/** @var ContentIndexEntry $current_content */
				if(strcmp($current_content->id, $shown_project_id) == 0) {
					$shown_project = $current_content;
					break;
				}
			}
			
			if(is_null($shown_project)) {
				continue;
			}
			
			echo('<a href="'.l10n_url_abs("/content/".$current_content->id).'" class="bland-link">');
			echo('<article class="">');
			echo('<img src="' . $shown_project->image . '" class="f-left r-l border mr-xs" alt="' .
				$shown_project->title[$user_language] . ' logo">');
			echo('<h3 class="mt-xxs">' . $shown_project->title[$user_language] . '</h3>');
			echo('<p>' . preg_replace('/<br>.*/', '', $current_content->preamble[$user_language]) . '</p>');
			echo('</article>');
			echo('</a>');
		}
		
		echo('</div>');
	}
	?>
	
	<?php printMainHeader(localize("home.updates.title")); ?>
	<p class="mt-xs ml-s t-w-600"><i class="fad fa-calendar-alt mr-xs"></i><?php print(localize("home.updates.4.date")); ?></p>
	<p class="mt-xxs ml-m">
		<?php print(localize("home.updates.4.text.1")); ?><br>
		<?php print(localize("home.updates.4.text.2")); ?><br>
		<?php print(localize("home.updates.4.text.3")); ?><br>
		<?php print(localize("home.updates.text.privacy")); ?>
	</p>
	<p class="mt-s ml-s t-w-600"><i class="fad fa-calendar-alt mr-xs"></i><?php print(localize("home.updates.3.date")); ?></p>
	<p class="mt-xxs ml-m">
		<?php print(localize("home.updates.3.text.1")); ?><br>
		<?php print(localize("home.updates.3.text.2")); ?><br>
		<?php print(localize("home.updates.3.text.3")); ?><br>
		<?php print(localize("home.updates.text.privacy")); ?>
	</p>
	<p class="mt-s ml-s t-w-600"><i class="fad fa-calendar-alt mr-xs"></i><?php print(localize("home.updates.2.date")); ?></p>
	<p class="mt-xxs ml-m">
		<?php print(localize("home.updates.2.text.1")); ?><br>
		<?php print(localize("home.updates.2.text.2")); ?><br>
		<?php print(localize("home.updates.2.text.3")); ?><br>
		<?php print(localize("home.updates.2.text.4")); ?><br>
		<?php print(localize("home.updates.text.privacy")); ?>
	</p>
	<p class="mt-s ml-s t-w-600"><i class="fad fa-calendar-alt mr-xs"></i><?php print(localize("home.updates.1.date")); ?></p>
	<p class="mt-xxs ml-m">
		<?php print(localize("home.updates.1.text.1")); ?><br>
		<?php print(localize("home.updates.text.privacy")); ?>
	</p>
</main>
<?php
include 'commons/DOM/footer.php';
include 'commons/DOM/scripts.php';
?>
</body>
</html>
<?php
$end_time = microtime(true);
if($print_execution_timer) {
	echo("<!-- PHP execution took " . round(($end_time - $start_time) * 1000, 2) . " ms -->");
}
?>