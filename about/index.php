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
	<meta property="og:url" content="<?php echo($host_uri . l10n_url_abs('/about/')); ?>"/>
	<meta property="og:image" content="<?php echo($host_uri); ?>/resources/NibblePoker/images/logos/v2_opengraph_v2.png"/>
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
	<img src="/resources/NibblePoker/images/about/profile-pic.jpg" alt="" class="r-r img-profile f-right m-xs ml-xxs" draggable="false">
	<p class="mt-xs ml-s">
		<?php print(localize("about.intro.text.01")); ?><br>
		<?php print(localize("about.intro.text.02")); ?>
	</p>
	<p class="mt-xs ml-s">
		<?php print(localize("about.intro.text.10")); ?><br>
		<?php print(localize("about.intro.text.11")); ?>
	</p>
	<p class="mt-xs ml-s">
		<?php print(localize("about.intro.text.20")); ?><br>
		<?php print(localize("about.intro.text.21")); ?>
	</p>
	
	<?php printSubHeader(localize("about.tenets.title")); ?>
	<p class="mt-xs ml-s t-bold">
		<!-- TODO: This section -->
		TODO
	</p>
	
	<?php printSubHeader(localize("about.future.title")); ?>
	<p class="mt-xs ml-s">
		<?php print(localize("about.future.text.01")); ?><br>
		<?php print(localize("about.future.text.02")); ?>
	</p>
	<p class="mt-xs ml-s">
		<?php print(localize("about.future.text.10")); ?>
	</p>
	<p class="mt-xs ml-s">
		<?php print(localize("about.future.text.20")); ?>
	</p>
	
	<?php printSubHeader(localize("about.financing.title")); ?>
	<p class="mt-xxs ml-s">
		<?php print(localize("about.financing.text.01")); ?><br>
		<?php print(localize("about.financing.text.02")); ?>
	</p>
	<p class="mt-xs ml-s">
		<?php print(localize("about.financing.text.10")); ?>
	</p>
	<p class="mt-xs ml-s">
		<?php print(localize("about.financing.text.20")); ?><br>
		<?php print(localize("about.financing.text.21")); ?>
	</p>
	
	<div class="grid col-2 col-medium-1">
		<table class="stylish r-s border o-hidden table-p-xs table-h-p-s table-v-center mt-s mx-s">
			<thead>
				<tr>
					<th><?php print(localize("about.financing.part.service")); ?></th>
					<th><?php print(localize("about.financing.part.cost.yearly")); ?></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><?php print(localize("about.financing.part.domain.lu")); ?></td>
					<td><?php print(number_format(17,2, $lang_number_decimal, $lang_number_thousands)); ?> €</td>
				</tr>
				<tr>
					<td><?php print(localize("about.financing.part.domain.com")); ?></td>
					<td><?php print(number_format(14.5,2, $lang_number_decimal, $lang_number_thousands)); ?> €</td>
				</tr>
				<tr>
					<td><?php print(localize("about.financing.part.proxy.europe")); ?></td>
					<td><?php print(number_format(14.5,2, $lang_number_decimal, $lang_number_thousands)); ?> €</td>
				</tr>
				<tr>
					<td><?php print(localize("about.financing.part.proxy.america")); ?></td>
					<td><?php print(number_format(13,2, $lang_number_decimal, $lang_number_thousands)); ?> €</td>
				</tr>
				<tr>
					<td><?php print(localize("about.financing.part.electricity")); ?></td>
					<td>&pm;<?php print(number_format(30,2, $lang_number_decimal, $lang_number_thousands)); ?> €</td>
				</tr>
				<tr>
					<td><b class="f-right"><?php print(localize("about.financing.part.cost.yearly.total")); ?>:</b></td>
					<td>&pm;<?php print(number_format(
						17 + 14.5 + 14.5 + 13 + 30,
						2, $lang_number_decimal, $lang_number_thousands)
						); ?> €
					</td>
				</tr>
			</tbody>
		</table>
		<table class="stylish r-s border o-hidden table-p-xs table-h-p-s table-v-center mt-s mx-s">
			<thead>
			<tr>
				<th><?php print(localize("about.financing.part.equipment")); ?></th>
				<th><?php print(localize("about.financing.part.cost")); ?></th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td>
					<?php print(localize("about.financing.part.nanopir4s")); ?>
				</td>
				<td>&pm;<?php print(number_format(80,2, $lang_number_decimal, $lang_number_thousands)); ?> €</td>
			</tr>
			<tr>
				<td><?php print(localize("about.financing.part.storage")); ?></td>
				<td>&pm;<?php print(number_format(10,2, $lang_number_decimal, $lang_number_thousands)); ?> €</td>
			</tr>
			<tr>
				<td><b class="f-right"><?php print(localize("about.financing.part.cost.total")); ?>:</b></td>
				<td>&pm;<?php print(number_format(90, 2, $lang_number_decimal, $lang_number_thousands)); ?> €
				</td>
			</tr>
			</tbody>
		</table>
	</div>
	<p class="mt-xs ml-s t-super-muted t-center">
		<?php print(localize("about.financing.text.isp")); ?>
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