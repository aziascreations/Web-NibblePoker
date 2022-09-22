<?php
set_include_path('./commons/');
include_once 'config.php';
include_once 'langs.php';
include_once 'modals.php';
?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'headers.php'; ?>
	<title><?php print(localize('error.404.title')); ?> - Nibble Poker</title>
	<meta name="description" content="<?php print(localize('error.404.description')); ?>">
	<meta property="og:title" content="Nibble Poker - <?php print(localize('error.404.title')); ?>" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="<?php echo($host_uri); ?>/" />
    <meta property="og:image" content="<?php echo($host_uri); ?>/resources/Azias/logos/opengraph.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="<?php print(localize('error.404.description')); ?>"/>
</head>
<body class="with-custom-webkit-scrollbars with-custom-css-scrollbars dark-mode" data-dm-shortcut-enabled="true" data-sidebar-shortcut-enabled="true">
    <?php
	$debuggingText = "Referrer: " . (
        array_key_exists('HTTP_REFERER', $_SERVER) ? htmlspecialchars($_SERVER['HTTP_REFERER']) : "<i>Not present in request !</i>"
    ) . "<br>";
	$debuggingText .= "<br>TODO: Add more info once the cache is properly configured for 4xx errors !";
	add_code_modal(
		"http-error",
		localize('modal.title.debugging'),
		$debuggingText
    );
    include 'body-root.php';
    ?>
	<div class="page-wrapper with-sidebar with-navbar-fixed-bottom">
		<?php include 'sidebar.php'; ?>
		<div class="content-wrapper">
			<div class="container-fluid">
				<div id="page-title-bar" class="card p-0 pl-20 m-0 square-corners bg-very-dark title-bkgd navbar">
					<h2 class="content-title font-size-24 mt-20 text-truncate">
						<i class="fad fa-exclamation-triangle"></i>&nbsp;&nbsp;<?php print(localize('error.4xx.title')); ?>
					</h2>
					<?php include 'header-lang.php'; ?>
				</div>
                <div class="content mx-auto w-lg-p90">
					<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-1 text-center"><i class="fad fa-exclamation-triangle"></i></div>
									<div class="col-10 text-center">
										<h3 class="card-title font-size-18 m-0"><?php print(localize("error.404.title")); ?></h3>
									</div>
									<div class="col-1 text-center"><i class="fad fa-exclamation-triangle"></i></div>
								</div>
							</div>
						</div>
						<div class="p-20 bg-light-lm rounded-bottom bg-very-dark title-bkgd text-center">
                            <p class="font-size-18 m-0 font-weight-semi-bold">
								<?php print(localize("error.404.description")); ?>
                            </p>
                            <hr class="my-15">
                            <p class="font-size-14 m-0"><!--no hr => mt-lg-10 mt-lg-5-->
								<?php print(localize("error.404.explanation")); ?>
                            </p>
                            <!--<hr class="my-20">
                            <a href="/" class="js-set-previous-url">
                                <button class="btn btn-primary" type="button">Go back to previous page</button>
                            </a>-->
                            <a href="#<?php echo(get_modal_id("http-error")); ?>">
                                <div class="container-card-fold secondary">
                                    <i class="fad fa-bug"></i>
                                </div>
                            </a>
						</div>
					</div>
                </div>
			</div>
		</div>
		<?php include 'footer.php'; ?>
	</div>
	<script src="/resources/HalfMoon/1.1.1/js/halfmoon.min.js"></script>
	<script src="/resources/Azias/js/nibblepoker.lu.js"></script>
</body>
</html>