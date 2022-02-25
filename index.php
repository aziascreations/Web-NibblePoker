<?php set_include_path('./commons/'); include 'config.php'; include 'langs.php'; ?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'headers.php'; ?>
	<title>Nibble Poker</title>
	<meta name="description" content="<?php print(localize('home.intro.meta.description')); ?>">
	<meta property="og:title" content="Nibble Poker" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="<?php echo($host_uri); ?>/" />
	<meta property="og:image" content="<?php echo($host_uri); ?>/resources/Azias/logos/rect1750-9-7-3-shaded.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="<?php print(localize('home.intro.meta.description')); ?>"/>
</head>
<body class="with-custom-webkit-scrollbars with-custom-css-scrollbars dark-mode" data-dm-shortcut-enabled="true" data-sidebar-shortcut-enabled="true">
	<?php include 'body-root.php'; ?>
	<div class="page-wrapper with-sidebar with-navbar-fixed-bottom">
		<?php const SIDEBAR_ID = 'home'; include 'sidebar.php'; ?>
		<div class="content-wrapper">
			<div class="container-fluid h-full stretch-align-items">
				<div id="page-title-bar" class="card p-0 pl-20 m-0 square-corners bg-very-dark title-bkgd navbar">
					<h2 class="content-title font-size-24 mt-20 text-truncate">
						<i class="fad fa-home"></i>&nbsp;<?php print(localize("home.title.header")); ?>
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
												<div class="col-1 text-center"><i class="fad fa-alien-monster"></i></div>
												<div class="col-10 text-center">
													<h2 class="card-title font-size-18 m-0"><?php print(localize("home.intro.title")); ?></h2>
												</div>
												<div class="col-1 text-center"><i class="fad fa-alien-monster"></i></div>
											</div>
										</div>
									</div>
									<div class="content m-20">
										<h2 class="content-title font-size-20 mb-10"></h2>
										<p class="ml-lg-10 mt-lg-5 mb-lg-5"><?php print(localize("home.intro.text.1")); ?></p>
										<p class="ml-lg-10 mt-lg-5"><?php print(localize("home.intro.text.2")); ?></p>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					
					
					
					<div class="col-sm-12 col-lg-8 mb-20">
						<div class="content mb-0">
							<div class="card p-0 m-0 card-bkgd">
								<div class="content m-0">
									
									<div class="px-card py-10 border-bottom px-20 bg-light-lm bg-very-dark-dm">
										<div class="container-fluid">
											<div class="row">
												<div class="col-1"><i class="fad fa-computer-classic"></i></div>
												<div class="col-10 text-center">
													<h2 class="card-title font-size-18 m-0">Applications</h2>
												</div>
												<div class="col-1 text-right"><i class="fad fa-computer-classic"></i></div>
											</div>
											
										</div>
									</div>
									
									<div class="px-card py-5 px-20">
									
										<div class="pl-lg-15 l-lab-app">
											<p class="mb-0 font-weight-semi-bold">
												PB-ListComPort
												<span class="ml-15 text-super-muted">
													<i class="fab fa-windows"></i>
												</span>
											</p>
											<p class="ml-5 mt-0">
												Cli tool that lists COM ports in different parsable formats.<br>
												<i class="fad fa-globe"></i>&nbsp;&nbsp;Link
											</p>
										</div>
										<hr>
										<div class="pl-lg-15 l-lab-web">
											<p class="mb-0 font-weight-semi-bold">
												Youtube-Auto-Archiver
												<span class="ml-15 text-super-muted">
													<i class="fab fa-windows"></i>&nbsp;
													<i class="fab fa-linux"></i>&nbsp;
													<i class="fab fa-docker"></i>
												</span>
											</p>
											<p class="ml-5 mt-0">
												Automatic archival solutions for YouTube livestreams and uploads.<br>
												<i class="fad fa-globe"></i>&nbsp;&nbsp;Link
											</p>
										</div>
										<hr>
										<div class="pl-lg-15 l-lab-office">
											<p class="mb-0 font-weight-semi-bold">
												Excel-Worksheet-Password-Remover
												<span class="ml-15 text-super-muted">
													<i class="fab fa-chrome"></i>&nbsp;
													<i class="fab fa-firefox-browser"></i>
												</span>
											</p>
											<p class="ml-5 mt-0">
												Web-based tool that simplifies the removal of passwords on Excel's Worksheet.<br>
												<i class="fad fa-globe"></i>&nbsp;&nbsp;Link
											</p>
										</div>
									</div>
									
								</div>
							</div>
						</div>
					</div>
					
					<div class="col-sm-12 col-lg-4 d-none d-sm-block">
						<div class="content ml-lg-0">
							<div class="card p-0 m-0 card-bkgd">
								<div class="content m-0">
									
									<div class="px-card py-10 border-bottom px-20 bg-light-lm bg-very-dark-dm">
										<div class="container-fluid">
											<div class="row">
												<div class="col-1">
													<i class="fad fa-pen-nib fa-flip-horizontal"></i>
												</div>
												<div class="col-10 text-center">
													<h2 class="card-title font-size-18 m-0">Updates</h2>
												</div>
												<div class="col-1 text-right"><i class="fad fa-pen-nib"></i></div>
											</div>
											
										</div>
									</div>
									
									<div class="px-card py-5 px-20">
										<p>
											1st February 2022<br>
											Going the self-hosted route.
										</p>
									</div>
									
								</div>
							</div>
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
