<?php
set_include_path('../commons/');
include_once 'config.php';
include_once 'langs.php';
?>
<!-- FIXME: Add a section about project phylosophy -> About archival -->
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'headers.php'; ?>
	<title>About - Nibble Poker</title>
	<meta name="description" content="???">
	<meta property="og:title" content="Nibble Poker - About"/>
	<meta property="og:type" content="website"/>
	<meta property="og:url" content="<?php echo($host_uri); ?>/"/>
    <meta property="og:image" content="<?php echo($host_uri); ?>/resources/Azias/logos/opengraph.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="???"/>
</head>
<body class="with-custom-webkit-scrollbars with-custom-css-scrollbars dark-mode" data-dm-shortcut-enabled="true"
	  data-sidebar-shortcut-enabled="true">
	<?php include 'body-root.php'; ?>
	<div class="page-wrapper with-sidebar with-navbar-fixed-bottom">
		<?php $SIDEBAR_ID = 'about'; include 'sidebar.php'; ?>
		<div class="content-wrapper">
			<div class="container-fluid">
				<div id="page-title-bar" class="card p-0 pl-20 m-0 square-corners bg-very-dark title-bkgd navbar">
					<h2 class="content-title font-size-24 mt-20 text-truncate">
						<i class="fad fa-user"></i>&nbsp;&nbsp;<?php print(localize("about.title")); ?>
					</h2>
					<?php include 'header-lang.php'; ?>
				</div>
				<div class="content mx-auto w-lg-p90">
					
					<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-12">
										<h2 class="card-title font-size-18 m-0">
											<i class="fad fa-user-circle"></i>&nbsp;&nbsp;<?php print(localize("about.biography.title")); ?>
										</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="px-card py-10 bg-light-lm rounded-bottom px-20 bg-very-dark title-bkgd">
							
							<div class="row">
								<div class="col-4 col-lg-3">
									<img src="/resources/Azias/imgs/maki-pain-03.png" class="img-fluid rounded no-save" alt="rounded image">
								</div>
								
								<div class="col-8 col-lg-9">
									<div class="row">
										<div class="col-6 text-center">
											<p class="font-weight-bold font-size-28 mt-0 mb-0 ml-20">
												<span class="text-uppercase">Bozet</span> Herwin
											</p>
										</div>
										<!--<div class="col-4 col-md-2 text-center">
											<p class="font-weight-bold font-size-24 mt-0 ml-20">🇱🇺, 🇧🇪</p>
										</div>
										<div class="col-8 col-md-4 text-right text-super-muted">
											<p class="font-weight-bold font-size-24 mt-0 ml-20">25y/o Male</p>
										</div>-->
									</div>
									
									
								</div>
							</div>
							
							
						</div>
					</div>
					
					<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-5 col-lg-12">
										<h2 class="card-title font-size-18 m-0">
											<i class="fad fa-books"></i>&nbsp;&nbsp;<?php print(localize("about.skills.title")); ?>
										</h2>
									</div>
									<div class="col-7 hidden-lg-and-up text-right font-italic">
										<h2 class="card-title font-size-18 m-0 text-super-muted">@NibblePoker</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="px-card py-10 bg-light-lm rounded-bottom px-20 bg-very-dark title-bkgd">
							<h3 class="font-size-16 font-weight-semi-bold">
								<i class="fad fa-file-certificate"></i>&nbsp;&nbsp;TODO
							</h3>
						</div>
					</div>
					
					<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-5 col-lg-12">
										<h2 class="card-title font-size-18 m-0">
											<i class="fad fa-briefcase"></i>&nbsp;&nbsp;<?php print(localize("about.work.title")); ?>
										</h2>
									</div>
									<div class="col-7 hidden-lg-and-up text-right font-italic">
										<h2 class="card-title font-size-18 m-0 text-super-muted">@NibblePoker</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="px-card py-10 bg-light-lm rounded-bottom px-20 bg-very-dark title-bkgd">
							<h3 class="font-size-16 font-weight-semi-bold">
								<i class="fad fa-file-certificate"></i>&nbsp;&nbsp;TODO
							</h3>
						</div>
					</div>
					
					<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-5 col-lg-12">
										<h2 class="card-title font-size-18 m-0">
											<i class="fad fa-head-side-brain"></i>&nbsp;&nbsp;<?php print(localize("about.philosophy.title")); ?>
										</h2>
									</div>
									<div class="col-7 hidden-lg-and-up text-right font-italic">
										<h2 class="card-title font-size-18 m-0 text-super-muted">@NibblePoker</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="px-card py-10 bg-light-lm rounded-bottom px-20 bg-very-dark title-bkgd">
							<h3 class="font-size-16 font-weight-semi-bold">
								<i class="fad fa-file-certificate"></i>&nbsp;&nbsp;TODO
							</h3>
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
