<?php
$start_time = microtime(true);
set_include_path('../');
include_once 'commons/config.php';
include_once 'commons/langs.php';
?>
	<!DOCTYPE html>
	<html lang="<?php echo($user_language); ?>">
	<head>
		<?php include 'commons/DOM/head.php'; ?>
		<title><?php print(localize('about.head.title')); ?></title>
		<meta name="description" content="<?php print(localize('about.head.description')); ?>">
		<meta property="og:title" content="<?php print(localize('about.og.title')); ?>"/>
		<meta property="og:type" content="website"/>
		<meta property="og:url" content="<?php echo($host_uri . l10n_url_abs('/')); ?>"/>
		<meta property="og:image" content="<?php echo($host_uri); ?>/resources/NibblePoker/images/logos/v2_opengraph.png"/>
		<meta property="og:image:type" content="image/png"/>
		<meta property="og:description" content="<?php print(localize('about.og.description')); ?>"/>
	</head>
	<body>
	<?php
	include_once 'commons/DOM/utils.php';
	$SIDEBAR_IDS = ['about'];
	include 'commons/DOM/sidebar.php';
	?>
	<header class="w-full p-m pl-s">
		<h1 class="t-size-17 t-w-500">
			<i class="fad fa-user t-size-16 mr-s t-muted"></i><?php print(localize("about.header.title")); ?>
		</h1>
		<?php include 'commons/DOM/header-lang.php'; ?>
	</header>
	<main id="main" class="rl-m border border-r-0 p-l">
		
		<?php printMainHeader(localize("about.intro.title")); ?>
		
		<?php printSubHeader(localize("about.history.title")); ?>
		<p class="mt-xs ml-s">
			<?php print(localize("about.history.text.90")); ?><br>
			<?php print(localize("about.history.text.91")); ?>
		</p>
		
		<?php printSubHeader(localize("about.future.title")); ?>
		<p class="mt-xs ml-s">
			<?php print(localize("about.future.text.01")); ?>
		</p>
		<p class="mt-xs ml-s">
			<?php print(localize("about.future.text.10")); ?>
		</p>
		<p class="mt-xs ml-s">
			<?php print(localize("about.future.text.20")); ?><br>
			<?php print(localize("about.future.text.21")); ?>
		</p>
		<p class="mt-xs ml-s">
			<?php print(localize("about.future.text.30")); ?>
		</p>
		
		<?php printSubHeader(localize("about.nibblepoker.title")); ?>
		<p class="mt-xxs ml-s">
			<?php print(localize("about.nibblepoker.text.01")); ?>
		</p>
		<p class="mt-xs ml-s">
			<?php print(localize("about.nibblepoker.text.10")); ?><br>
			<?php print(localize("about.nibblepoker.text.11")); ?>
		</p>
		<p class="mt-xs ml-s">
			<?php print(localize("about.nibblepoker.text.20")); ?>
		</p>
		
		<?php printSubHeader(localize("about.aziascreations.title")); ?>
		<p class="mt-xxs ml-s">
			<?php print(localize("about.aziascreations.text.01")); ?>
		</p>
		<p class="mt-xxs ml-s">
			<?php print(localize("about.aziascreations.text.10")); ?>
		</p>
		
		<!--<img src="/resources/NibblePoker/images/about/profile-pic.jpg" alt="" class="r-r">-->
		
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