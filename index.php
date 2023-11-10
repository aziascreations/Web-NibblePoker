<?php
$start_time = microtime(true);
set_include_path('./');
include_once 'commons/config.php';
include_once 'commons/langs.php';

// Page-specific config
$enable_glider = true;
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
	
	<?php printMainHeader(localize("home.intro.title")); ?>
    <p class="mt-xs ml-s"><?php print(localize("home.intro.text.1")); ?></p>
    <p class="mt-xs ml-s"><?php print(localize("home.intro.text.2")); ?></p>
	
	<?php printMainHeader(localize("home.showcase.title")); ?>
	<div class="mt-xs mx-s border r-s">
		<div class="glider">
			<img src="/resources/NibblePoker/images/content/lscom/lscom-legacy-simple.png" alt="test123">
			<img src="/resources/NibblePoker/images/content/lscom/lscom-legacy-simple.png" alt="test123">
			<img src="/resources/NibblePoker/images/content/lscom/lscom-legacy-simple.png" alt="test123">
			<img src="/resources/NibblePoker/images/content/lscom/lscom-legacy-simple.png" alt="test123">
		</div>
	</div>
	
	<?php printMainHeader(localize("home.updates.title")); ?>
	<p class="mt-xs ml-s t-w-600"><i class="fad fa-calendar-alt mr-xs"></i><?php print(localize("home.updates.2.date")); ?></p>
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