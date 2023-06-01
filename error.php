<?php
$start_time = microtime(true);
set_include_path('./');
include_once 'commons/config.php';
include_once 'commons/langs.php';

// Determining the relevant error code to prepare the page for.
$np_err_code = 500;
if(isset($_SERVER['REDIRECT_STATUS'])) {
	$np_err_code = $_SERVER['REDIRECT_STATUS'];
}
?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'commons/DOM/head.php'; ?>
    <title><?php print(localize('error.'.$np_err_code.'.head.title')); ?></title>
    <meta name="description" content="<?php print(localize('error.'.$np_err_code.'.head.description')); ?>">
    <meta property="og:title" content="<?php print(localize('error.'.$np_err_code.'.og.title')); ?>"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="<?php echo($host_uri . l10n_url_abs('/')); ?>"/>
    <meta property="og:image" content="<?php echo($host_uri); ?>/resources/NibblePoker/images/logos/v2_opengraph.png"/>
    <meta property="og:image:type" content="image/png"/>
    <meta property="og:description" content="<?php print(localize('error.'.$np_err_code.'.og.description')); ?>"/>
</head>
<body>
<?php
include_once 'commons/DOM/utils.php';
$SIDEBAR_IDS = [];
include 'commons/DOM/sidebar.php';
?>
<header class="w-full p-m pl-s">
    <h1 class="t-size-17 t-w-500">
        <i class="fad fa-exclamation-triangle t-size-16 mr-s t-muted"></i><?php print(localize("error.".$np_err_code.".header.title")); ?>
    </h1>
	<?php include 'commons/DOM/header-lang.php'; ?>
</header>
<main id="main" class="rl-m border border-r-0 p-l">
	
	<?php printMainHeader(localize("home.intro.title")); ?>
    <p class="mt-xs ml-s"><?php print(localize("home.intro.text.1")); ?></p>
    <p class="mt-xs ml-s"><?php print(localize("home.intro.text.2")); ?></p>
    
    <?php
	$np_err_img = "";
	$np_err_img_alt = "";
    switch($np_err_code) {
        case 403:
        case 404:
        case 500:
        default:
            $np_err_img = "/resources/NibblePoker/images/drawings/computer_v1_dead_strong.png";
            $np_err_img_alt = localize("error.skit.pc.dead");
            break;
    }
    echo('<img id="error-page-skit" src="' . $np_err_img . '" alt="' . $np_err_img_alt . '" draggable="false">');
    ?>
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