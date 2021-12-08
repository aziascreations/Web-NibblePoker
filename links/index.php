<?php set_include_path('../commons/'); include 'config.php'; include 'langs.php'; ?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'headers.php'; ?>
	<title>Links - Nibble Poker</title>
	<meta name="description" content="A collection of links to all the other locations we are active on.">
	<meta property="og:title" content="Nibble Poker - Links" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="<?php echo($host_uri); ?>/" />
	<meta property="og:image" content="<?php echo($host_uri); ?>/resources/Azias/logos/rect1750-9-7-3-shaded.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="A collection of links to all the other locations we are active on."/>
</head>
<body class="with-custom-webkit-scrollbars with-custom-css-scrollbars dark-mode" data-dm-shortcut-enabled="true" data-sidebar-shortcut-enabled="true">
	<?php include 'body-root.php'; ?>
	<div class="page-wrapper with-sidebar with-navbar-fixed-bottom">
		<?php include 'sidebar.php'; ?>
		<div class="content-wrapper">
			<div class="container-fluid">
				<div id="page-title-bar" class="card p-0 pl-20 m-0 square-corners bg-very-dark title-bkgd navbar">
					<h2 class="content-title font-size-24 mt-20 text-truncate">
						<i class="fad fa-link"></i>&nbsp;<?php print(localize("links.title")); ?>
					</h2>
					<?php include 'header-lang.php'; ?>
				</div>
				<div class="content">
					<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-5 col-lg-12">
										<h2 class="card-title font-size-18 m-0">
											<i class="fab fa-github"></i>&nbsp;&nbsp;GitHub
										</h2>
									</div>
									<div class="col-7 hidden-lg-and-up text-right font-italic">
										<h2 class="card-title font-size-18 m-0 text-super-muted">aziascreations</h2>
									</div>
								</div>
							</div>
						</div>
						<!--<div class="content mx-15 my-15"><p>[Contains the most recent repositories and blablabla...]</p>
						</div>-->
						<div class="px-card py-10 bg-light-lm bg-very-dark-dm rounded-bottom px-20">
							<p class="font-size-12 m-0">
								<i class="fad fa-globe"></i> https://github.com/aziascreations
								<a class="ml-20" href="https://github.com/aziascreations">
									<span class="badge badge-primary">
										<?php print(localize('links.visit.button')); ?>
									</span>
								</a>
							</p>
						</div>
					</div>
					<!--<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-5 col-lg-12">
										<h2 class="card-title font-size-18 m-0">
											<i class="fab fa-youtube"></i>&nbsp;&nbsp;YouTube
										</h2>
									</div>
									<div class="col-7 hidden-lg-and-up text-right font-italic">
										<h2 class="card-title font-size-18 m-0 text-super-muted">Herwin | Nibble Poker</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="px-card py-10 bg-light-lm bg-very-dark-dm border-bottom px-20">
							<p class="font-size-12 m-0">
								<i class="fad fa-globe"></i> https://www.youtube.com/channel/UCfBSS1z3EsmpnhbbP-BBoYw
								<a class="ml-20" href="https://www.youtube.com/channel/UCfBSS1z3EsmpnhbbP-BBoYw">
									<span class="badge badge-primary">
										<?php print(localize('links.visit.button')); ?>
									</span>
								</a>
							</p>
						</div>
						<div class="px-card py-10 bg-light-lm bg-very-dark-dm rounded-bottom px-20">
							<p class="font-size-12 m-0">
								<i class="fad fa-globe"></i> https://www.youtube.com/channel/UCrvagfACQw9ukdNP-CE3A0g
								<a class="ml-20" href="https://www.youtube.com/channel/UCrvagfACQw9ukdNP-CE3A0g">
									<span class="badge badge-primary">
										<?php print(localize('links.visit.button')); ?>
									</span>
								</a>
							</p>
						</div>
					</div>-->
					<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-5 col-lg-12">
										<h2 class="card-title font-size-18 m-0">
											<i class="fab fa-twitter"></i>&nbsp;&nbsp;Twitter
										</h2>
									</div>
									<div class="col-7 hidden-lg-and-up text-right font-italic">
										<h2 class="card-title font-size-18 m-0 text-super-muted">@nibblepoker</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="px-card py-10 bg-light-lm bg-very-dark-dm rounded-bottom px-20">
							<p class="font-size-12 m-0">
								<i class="fad fa-globe"></i> https://twitter.com/NibblePoker
								<a class="ml-20" href="https://twitter.com/NibblePoker">
									<span class="badge badge-primary">
										<?php print(localize('links.visit.button')); ?>
									</span>
								</a>
							</p>
						</div>
					</div>
					<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-5 col-lg-12">
										<h2 class="card-title font-size-18 m-0">
											<i class="fab fa-twitch"></i>&nbsp;&nbsp;Twitch
										</h2>
									</div>
									<div class="col-7 hidden-lg-and-up text-right font-italic">
										<h2 class="card-title font-size-18 m-0 text-super-muted">NibblePoker</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="px-card py-10 bg-light-lm bg-very-dark-dm rounded-bottom px-20">
							<p class="font-size-12 m-0">
								<i class="fad fa-globe"></i> https://www.twitch.tv/nibblepoker
								<a class="ml-20" href="https://www.twitch.tv/nibblepoker">
									<span class="badge badge-primary">
										<?php print(localize('links.visit.button')); ?>
									</span>
								</a>
							</p>
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
