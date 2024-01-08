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
	<title><?php print(localize('debug.head.title')); ?></title>
	<meta name="description" content="<?php print(localize('debug.head.description')); ?>">
	<meta property="og:title" content="<?php print(localize('debug.og.title')); ?>"/>
	<meta property="og:type" content="website"/>
	<meta property="og:url" content="<?php echo($host_uri . l10n_url_abs('/debug/')); ?>"/>
	<meta property="og:image" content="<?php echo($host_uri); ?>/resources/NibblePoker/images/logos/v2_opengraph_v2.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="<?php print(localize('debug.og.description')); ?>"/>
	<?php include 'commons/DOM/head-preloads.php'; ?>
</head>
<body>
<?php
include_once 'commons/DOM/utils.php';
$SIDEBAR_IDS = ['debug'];
include 'commons/DOM/sidebar.php';
?>
<header class="w-full p-m pl-s">
	<h1 class="t-size-17 t-w-500">
		<i class="fad fa-user t-size-16 mr-s t-muted"></i><?php print(localize("debug.header.title")); ?>
	</h1>
	<?php include 'commons/DOM/header-lang.php'; ?>
</header>
<main id="main" class="rl-m border border-r-0 p-l">
	<?php printMainHeader(localize("debug.host.title")); ?>
	<div class="p-s pb-0">
		<table class="stylish r-s border o-hidden table-p-xs table-h-p-s table-v-center">
			<thead>
			<tr>
				<th><?php echo(localize("debug.tables.field")); ?></th>
				<th><?php echo(localize("debug.tables.value")); ?></th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td><?php echo(localize("debug.host.requested")); ?></td>
				<td><kbd><?php echo(htmlspecialchars($_SERVER['SERVER_NAME'])); ?></kbd></td>
			</tr>
			<tr>
				<td><?php echo(localize("debug.host.domain")); ?></td>
				<td><kbd><?php echo(htmlspecialchars($host)); ?></kbd></td>
			</tr>
			<tr>
				<td><?php echo(localize("debug.host.uri")); ?></td>
				<td><kbd><?php echo(htmlspecialchars($host_uri)); ?></kbd></td>
			</tr>
			<tr>
				<td><?php echo(localize("debug.host.tld")); ?></td>
				<td><kbd><?php echo(htmlspecialchars($host_tld)); ?></kbd></td>
			</tr>
			<tr>
				<td><?php echo(localize("debug.host.waffle")); ?></td>
				<td><i><?php echo(localize($enable_bouneschlupp_mode ? "common.yes": "common.no")); ?></i></td>
			</tr>
			<tr>
				<td><?php echo(localize("debug.host.bouneschlupp")); ?></td>
				<td><i><?php echo(localize($enable_waffle_iron ? "common.yes": "common.no")); ?></i></td>
			</tr>
			</tbody>
		</table>
	</div>
	
	<?php printMainHeader(localize("debug.lang.title")); ?>
	<div class="p-s pb-0">
		<table class="stylish r-s border o-hidden table-p-xs table-h-p-s table-v-center">
			<thead>
			<tr>
				<th><?php echo(localize("debug.tables.field")); ?></th>
				<th><?php echo(localize("debug.tables.value")); ?></th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td><?php echo(localize("debug.lang.compile-date")); ?></td>
				<td><kbd><?php echo(htmlspecialchars($lang_compilation_date)); ?></kbd></td>
			</tr>
			<tr>
				<td><?php echo(localize("debug.lang.default")); ?></td>
				<td><kbd><?php echo(htmlspecialchars($default_language)); ?></kbd></td>
			</tr>
			<tr>
				<td><?php echo(localize("debug.lang.user")); ?></td>
				<td><kbd><?php echo(htmlspecialchars($user_language)); ?></kbd></td>
			</tr>
			<tr>
				<td><?php echo(localize("debug.lang.header.raw")); ?></td>
				<td><?php
					if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
						 echo('<kbd>' . htmlspecialchars($_SERVER['HTTP_ACCEPT_LANGUAGE']) . '</kbd>');
					} else {
						 echo('<i>' . localize("common.undefined") . '</i>');
					}
					?></td>
			</tr>
			<tr>
				<td><?php echo(localize("debug.lang.header.processed")); ?></td>
				<td><?php
					if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
						$_client_languages = process_lang_header($_SERVER['HTTP_ACCEPT_LANGUAGE'], false, false);
						$_i_client_language = 0;
						foreach($_client_languages as $_client_language) {
							echo('<p' . ($_i_client_language > 0 ? ' class="mt-xs"' : '') . '>');
							echo('<kbd>' . htmlspecialchars($_client_language[0]) . '</kbd>');
							echo(' &#10140; ');
							echo('<kbd>' . htmlspecialchars($_client_language[1]) . '</kbd>');
							echo('</p>');
							$_i_client_language++;
						}
					} else {
						echo('<i>' . localize("common.na") . '</i>');
					}
					?></td>
			</tr>
			</tbody>
		</table>
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