<?php
$start_time = microtime(true);
set_include_path('../');
include_once 'commons/config.php';
include_once 'commons/langs.php';

// Enable debugging extras
$enable_debug_extras = true;
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
<body>
<?php
include_once 'commons/DOM/utils.php';
$SIDEBAR_IDS = ['test'];
include 'commons/DOM/sidebar.php';
?>
<header class="w-full p-m pl-s">
	<h1 class="t-size-17 t-w-500">
		<i class="fa-duotone fa-vial-virus t-size-16 mr-s t-muted"></i><?php print(localize("test.header.title")); ?>
	</h1>
	<?php include 'commons/DOM/header-lang.php'; ?>
</header>
<main id="main" class="rl-m border border-r-0 p-l">
	
	<?php printMainHeader(localize("test.controls"), "fa-duotone fa-vial-virus", ""); ?>
	<div class="mt-xs mx-s gap-s">
		<button id="test-toggle-borders" class="p-xs border r-s t-size-10">
			<?php echo(localize("test.controls.borders")); ?>
		</button>
	</div>
	
	<?php printMainHeader(localize("test.app.card.demo"), "fa-duotone fa-vial-virus", ".grid.col-2.col-medium-1"); ?>
	<div class="grid col-2 col-medium-1 mt-xs mx-s gap-s debug">
		<a class="casper-link" href="#disabled-link">
			<div class="bkgd-blank-dark border r-l h-full debug p-relative">
				<div class="p-xxs">
					<img class="content-card-image border mr-xs mb-xxs r-l debug" src="/resources/NibblePoker/images/content/lscom/lscom-v2-text-01-bkgd-cli.png">
				</div>
				<h3 class="mb-xs debug">
					DotNet-ListComPort
					
				</h3>
				<p class="debug">
					CLI tool that can list COM ports with their name, friendly name and device name easily and cleanly.
				</p>
				<!--
					<img src="/resources/ExtGraphics/Icons8/Color/Logos/windows_10.svg" alt="Windows" title="Windows 10+">
					<img src="/resources/ExtGraphics/DevIcons/csharp-original.svg" alt="C#" title="C#">
					<img src="/resources/ExtGraphics/Icons8/Color/Logos/git.svg" alt="Git" title="Git">
				-->
				<!--<div class="wedge wedge-br success js-code-copy border rtl-m rbr-m p-xxxs px-xs border-b-0 border-r-0 debug">
					<i class="fad fa-download"></i>
				</div>-->
				<div class="wedge no-hover wedge-tr js-code-copy border rbl-m rtr-m px-xs border-t-0 border-r-0 debug">
					<img src="/resources/ExtGraphics/Icons8/Color/Logos/windows_10.svg" alt="Windows" title="Windows 10+" class="app-card-detail-icon">
					<img src="/resources/ExtGraphics/DevIcons/csharp-original.svg" alt="C#" title="C#" class="app-card-detail-icon">
					<img src="/resources/ExtGraphics/Icons8/Color/Logos/git.svg" alt="Git" title="Git" class="app-card-detail-icon">
				</div>
			</div>
		</a>
		<div class="debug">b</div>
	</div>
	
	<?php printMainHeader(localize("test.content.card.demo"), "fa-duotone fa-vial-virus", ".grid.col-1"); ?>
	<div class="p-s debug">
		<a class="casper-link" href="#disabled-link">
			<div class="content-search-entry debug">
				<img class="content-search-image mr-s r-l debug" src="/resources/NibblePoker/images/content/lscom/lscom-v2-text-01-bkgd-cli.png">
				<h3 class="mb-xs debug">DotNet-ListComPort</h3>
				<p class="debug">
					A simple CLI tool that can list COM ports with their name, friendly name and device name easily and cleanly.<br>
					This tool is intended to replace the tedious task of having to use the <code>mode</code> command, and the <i>Device Manager</i> to find a newly plugged-in device that provides a COM port.
				</p>
			</div>
		</a>
		<p class="mt-xs debug">
			<i class="fad fa-tags t-size-8 debug"></i>
			<a href="#disabled-link" class="ml-xs debug">#application</a>
			<a href="#disabled-link" class="ml-xs debug">#tool</a>
			<a href="#disabled-link" class="ml-xs debug">#lscom</a>
			<a href="#disabled-link" class="ml-xs debug">#dotnet</a>
			<a href="#disabled-link" class="ml-xs debug">#windows</a>
		</p>
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