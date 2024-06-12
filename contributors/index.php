<?php
$start_time = microtime(true);
set_include_path('../');
include_once 'commons/config.php';
include_once 'commons/langs.php';
$enable_kitty_and_doggo_sounds = true;
?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'commons/DOM/head.php'; ?>
	<title><?php print(localize('contributors.head.title')); ?></title>
	<meta name="description" content="<?php print(localize('contributors.head.description')); ?>">
	<meta property="og:title" content="<?php print(localize('contributors.og.title')); ?>"/>
	<meta property="og:type" content="website"/>
	<meta property="og:url" content="<?php echo($host_uri . l10n_url_abs('/contributors/')); ?>"/>
	<meta property="og:image" content="<?php echo($host_uri); ?>/resources/NibblePoker/images/logos/v2_opengraph_v2.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="<?php print(localize('contributors.og.description')); ?>"/>
	<?php include 'commons/DOM/head-preloads.php'; ?>
</head>
<body class="layout-generic">
<?php
include_once 'commons/DOM/utils.php';
$SIDEBAR_IDS = ['contributors'];
include 'commons/DOM/sidebar.php';
?>
<header class="w-full p-m pl-s">
	<h1 class="t-size-17 t-w-500">
		<i class="fad fa-user t-size-16 mr-s t-muted"></i><?php print(localize("contributors.header.title")); ?>
	</h1>
	<?php include 'commons/DOM/header-lang.php'; ?>
</header>
<main id="main" class="rl-m border border-r-0 p-l">
	
	<?php printMainHeader(localize("contributors.intro.title")); ?>
	
	<?php //printSubHeader(localize("contributors.sponsors.title")); ?>
	
	<?php printSubHeader(localize("contributors.code.title")); ?>
	
	<?php printSubHeader(localize("contributors.spiritualis.title")); ?>
	<div class="mx-xs mt-s">
		<div id="kitty-kiki" class="img-contributor kitty">
			<img src="/resources/NibblePoker/images/contributors/kiki-02.jpg" draggable="false">
			<img src="/resources/NibblePoker/images/contributors/kiki-03.jpg" draggable="false">
		</div>
		<div id="kitty-maki" class="img-contributor kitty">
			<img src="/resources/NibblePoker/images/contributors/maki-02.jpg" draggable="false">
			<img src="/resources/NibblePoker/images/contributors/maki-03.jpg" draggable="false">
		</div>
	</div>
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