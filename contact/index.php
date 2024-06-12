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
	<title><?php print(localize('contact.head.title')); ?></title>
	<meta name="description" content="<?php print(localize('contact.head.description')); ?>">
	<meta property="og:title" content="<?php print(localize('contact.og.title')); ?>"/>
	<meta property="og:type" content="website"/>
	<meta property="og:url" content="<?php echo($host_uri . l10n_url_abs('/')); ?>"/>
	<meta property="og:image" content="<?php echo($host_uri); ?>/resources/NibblePoker/images/logos/v2_opengraph.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="<?php print(localize('contact.og.description')); ?>"/>
</head>
<body class="layout-generic">
<?php
include_once 'commons/DOM/utils.php';
$SIDEBAR_IDS = ['contact'];
include 'commons/DOM/sidebar.php';
?>
<header class="w-full p-m pl-s">
	<h1 class="t-size-17 t-w-500">
		<i class="fad fa-mailbox t-size-16 mr-s t-muted"></i><?php print(localize("contact.header.title")); ?>
	</h1>
	<?php include 'commons/DOM/header-lang.php'; ?>
</header>
<main id="main" class="rl-m border border-r-0 p-l">
	
	<?php printMainHeader(localize("contact.email.title"), "fad fa-mail-bulk", "herwin.bozet@gmail.com"); ?>
	<p class="m-s">
		<a href="mailto:Herwin Bozet<herwin.bozet@gmail.com>?subject=Contact%20via%20NibblePoker.lu" class="bland-link button-link">
			<button class="p-xs r-s border b-light success"><i class="fad fa-external-link-alt mr-xs"></i><?php print(localize("contact.email.compose")); ?></button>
		</a>
	</p>
	
	<?php printMainHeader(localize("contact.twitter.title"), "fab fa-twitter", "@NibblePoker"); ?>
	<p class="m-s">
		<a href="https://twitter.com/messages/compose?recipient_id=937370791334895616" class="bland-link button-link">
			<button class="p-xs r-s border b-light primary"><i class="fad fa-external-link-alt mr-xs"></i><?php print(localize("contact.twitter.compose")); ?></button>
		</a>
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