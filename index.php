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
</head>
<body>
<?php
include_once 'commons/DOM/utils.php';
include 'commons/DOM/body-1.php';
$SIDEBAR_ID = 'home';
include 'commons/DOM/sidebar.php';
include 'commons/DOM/body-2.php';
?>
<header class="w-full p-m pl-s">
	<h1 class="t-size-18 t-w-500">
		<img src="/resources/Icons8/Fluent/console.svg" alt="todo" class="img-text">&nbsp;<?php print(localize("home.header.title")); ?>
	</h1>
	<?php //include 'header-lang.php'; ?>
</header>
<?php include 'commons/DOM/body-3.php'; ?>
<main id="main" class="rl-m border border-r-0 p-l">
	
	<?php printMainHeader(localize("home.intro.title")); ?>
	<p class="mt-xs ml-s"><?php print(localize("home.intro.text.1")); ?></p>
	<p class="mt-xs ml-s"><?php print(localize("home.intro.text.2")); ?></p>
	
	<?php printMainHeader("Applications"); ?>
	<!-- If 'r-*' is used, 'o-hidden' needs to be too => https://stackoverflow.com/a/8582304 -->
	<table class="stylish w-full mt-xs table-p-xs r-s o-hidden border">
		<thead>
		<tr>
			<th>Version</th>
			<th>Downloads</th>
			<th>Downloads</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>C11</td>
			<td>C12</td>
			<td>C13</td>
		</tr>
		<tr>
			<td>C21</td>
			<td>C22</td>
			<td>C23</td>
		</tr>
		</tbody>
	</table>
	
	<?php printMainHeader("Testing"); ?>
	<p class="mt-xs ml-s"><?php print(localize("home.intro.text.1")); ?></p>
	<br>
	<button class="p-xs border r-s">aaa</button>
	<br>
	<input class="p-xs border r-s" type="text">
	<br>
	
	<?php printMainHeader(localize("home.intro.title")); ?>
	<p class="mt-xs ml-s">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed <span class="code">do eiusmod tempor</span> incididunt ut labore et dolore magna aliqua.<br>
		Mauris ultrices eros in cursus turpis massa tincidunt dui.<br>
		Pulvinar elementum integer enim neque. Nunc mi ipsum faucibus vitae aliquet nec.
	</p>
    
</main>
<?php
include 'commons/DOM/body-4.php';
include 'commons/DOM/footer.php';
include 'commons/DOM/body-5.php';
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