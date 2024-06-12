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
	<title><?php print(localize('links.head.title')); ?></title>
	<meta name="description" content="<?php print(localize('links.head.description')); ?>">
	<meta property="og:title" content="<?php print(localize('links.og.title')); ?>"/>
	<meta property="og:type" content="website"/>
	<meta property="og:url" content="<?php echo($host_uri . l10n_url_abs('/')); ?>"/>
	<meta property="og:image" content="<?php echo($host_uri); ?>/resources/NibblePoker/images/logos/v2_opengraph.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="<?php print(localize('links.og.description')); ?>"/>
</head>
<body class="layout-generic">
<?php
include_once 'commons/DOM/utils.php';
$SIDEBAR_IDS = ['links'];
include 'commons/DOM/sidebar.php';
?>
<header class="w-full p-m pl-s">
	<h1 class="t-size-17 t-w-500">
		<i class="fad fa-link t-size-16 mr-s t-muted"></i><?php print(localize("links.header.title")); ?>
	</h1>
	<?php include 'commons/DOM/header-lang.php'; ?>
</header>
<main id="main" class="rl-m border border-r-0 p-l">
	<?php printMainHeader(localize("links.social.title")); ?>
	
	<p class="mt-s ml-s t-w-600 t-size-12">
		<i class="fab fa-twitter mr-xs"></i><a href="https://twitter.com/NibblePoker"><?php print(localize("links.twitter.title")); ?></a>
	</p>
	<p class="mt-xxs  ml-l">
		<?php print(localize("links.twitter.text.1")); ?>
	</p>
	
	<p class="mt-s ml-s t-w-600 t-size-12">
		<i class="fab fa-github mr-xs"></i><a href="https://github.com/aziascreations"><?php print(localize("links.github.title")); ?></a>
	</p>
	<p class="mt-xxs ml-l">
		<?php print(localize("links.github.text.1")); ?>
	</p>
	
	<p class="mt-s ml-s t-w-600 t-size-12">
		<i class="fab fa-github mr-xs"></i><a href="https://github.com/NibblePoker"><?php print(localize("links.github_pro.title")); ?></a>
	</p>
	<p class="mt-xxs ml-l">
		<?php print(localize("links.github_pro.text.1")); ?>
	</p>
	
	
	<?php printMainHeader(localize("links.work.title")); ?>
	
	<p class="mt-s ml-s t-w-600 t-size-12">
		<i class="fab fa-linkedin ml-xxs mr-xs"></i><a href="https://www.linkedin.com/in/herwin-bozet/"><?php print(localize("links.linkedin.title")); ?></a>
	</p>
	<p class="mt-xxs ml-l">
		<?php print(localize("links.linkedin.text.1")); ?>
	</p>
	
	<p class="mt-s ml-s t-w-600 t-size-12">
		<i class="fa-duotone fa-handshake mr-xxs"></i><a href="https://fr.malt.be/profile/herwinbozet"><?php print(localize("links.malt.title")); ?></a>
	</p>
	<p class="mt-xxs ml-l">
		<?php print(localize("links.malt.text.1")); ?>
	</p>
	
	
	<?php printMainHeader(localize("links.misc.title")); ?>
	
	<p class="mt-s ml-s t-w-600 t-size-12">
		<i class="fad fa-download mr-xs"></i><a href="https://files.nibblepoker.lu/"><?php print(localize("links.files.title")); ?></a>
	</p>
	<p class="mt-xxs ml-l">
		<?php print(localize("links.files.text.1")); ?>
	</p>
	
	<p class="mt-s ml-s t-w-600 t-size-12">
		<i class="fad fa-archive mr-xs"></i><a href="https://archives.nibblepoker.lu/"><?php print(localize("links.archives.title")); ?></a>
	</p>
	<p class="mt-xxs ml-l">
		<?php print(localize("links.archives.text.1")); ?>
	</p>
	
	<p class="mt-s ml-s t-w-600 t-size-12">
		<i class="fa-duotone fa-code-branch mr-xs"></i><a href="https://git.nibblepoker.lu/"><?php print(localize("links.gitea.title")); ?></a>
	</p>
	<p class="mt-xxs ml-l">
		<?php print(localize("links.gitea.text.1")); ?>
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