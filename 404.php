<?php set_include_path('./commons/'); include 'config.php'; include 'langs.php'; ?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'headers.php'; ?>
	<title><?php print(localize('error.404.title')); ?> - Nibble Poker</title>
	<meta name="description" content="<?php print(localize('error.404.description')); ?>">
	<meta property="og:title" content="Nibble Poker - <?php print(localize('error.404.title')); ?>" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="<?php echo($host_uri); ?>/" />
	<meta property="og:image" content="<?php echo($host_uri); ?>/resources/Azias/logos/rect1750-9-7-3-shaded.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="<?php print(localize('error.404.description')); ?>"/>
</head>
<body class="with-custom-webkit-scrollbars with-custom-css-scrollbars dark-mode" data-dm-shortcut-enabled="true" data-sidebar-shortcut-enabled="true">
	<?php include 'body-root.php'; ?>
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
				<div class="row">
					<div class="col-12 d-block">
						<div class="content mb-0">
							<div class="card p-0 m-0 card-bkgd">
								<div class="content m-0">
									<div class="px-card py-10 border-bottom px-20 bg-light-lm bg-very-dark-dm">
										<div class="container-fluid">
											<div class="row">
												<div class="col-1 text-center"><i class="fad fa-exclamation-triangle"></i></div>
												<div class="col-10 text-center">
													<h2 class="card-title font-size-18 m-0"><?php print(localize("error.404.title")); ?></h2>
												</div>
												<div class="col-1 text-center"><i class="fad fa-exclamation-triangle"></i></div>
											</div>
										</div>
									</div>
									<div class="content m-20">
										<h2 class="content-title font-size-20 mb-10"></h2>
										<p class="ml-lg-10 mt-lg-5 text-center"><?php print(localize("error.404.description")); ?></p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- TODO: Add button to go back !-->
			</div>
		</div>
		<?php include 'footer.php'; ?>
	</div>
	<script src="/resources/HalfMoon/1.1.1/js/halfmoon.min.js"></script>
	<script src="/resources/Azias/js/nibblepoker.lu.js"></script>
</body>
</html>