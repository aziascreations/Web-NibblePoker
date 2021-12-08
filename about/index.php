<?php set_include_path('../commons/'); include 'config.php'; include 'langs.php'; ?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'headers.php'; ?>
	<title>About - Nibble Poker</title>
	<meta name="description" content="???">
	<meta property="og:title" content="Nibble Poker - About"/>
	<meta property="og:type" content="website"/>
	<meta property="og:url" content="<?php echo($host_uri); ?>/"/>
	<meta property="og:image" content="<?php echo($host_uri); ?>/resources/Azias/logos/rect1750-9-7-3-shaded.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="???"/>
</head>
<body class="with-custom-webkit-scrollbars with-custom-css-scrollbars dark-mode" data-dm-shortcut-enabled="true"
	  data-sidebar-shortcut-enabled="true">
	<?php include 'body-root.php'; ?>
	<div class="page-wrapper with-sidebar with-navbar-fixed-bottom">
		<?php include 'sidebar.php'; ?>
		<div class="content-wrapper">
			<div class="container-fluid">
				<div id="page-title-bar" class="card p-0 pl-20 m-0 square-corners bg-very-dark title-bkgd navbar">
					<h2 class="content-title font-size-24 mt-20 text-truncate">
						<i class="fad fa-user"></i>&nbsp;&nbsp;<?php print(localize("about.title")); ?>
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
											<i class="fad fa-user-circle"></i>&nbsp;&nbsp;Who	am I ?
										</h2>
									</div>
									<div class="col-7 hidden-lg-and-up text-right font-italic">
										<h2 class="card-title font-size-18 m-0 text-super-muted">nibblepoker@gmail.com</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="px-card py-10 bg-light-lm bg-very-dark-dm rounded-bottom px-20">
							<p>TODO</p>
						</div>
					</div>
					
					<div class="card p-0 mx-0">
						
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-5 col-lg-12">
										<h2 class="card-title font-size-18 m-0">
											<i class="fad fa-books"></i>&nbsp;&nbsp;Skills
										</h2>
									</div>
									<div class="col-7 hidden-lg-and-up text-right font-italic">
										<h2 class="card-title font-size-18 m-0 text-super-muted">@NibblePoker</h2>
									</div>
								</div>
							</div>
						</div>
						
						<div class="px-card py-10 bg-light-lm bg-very-dark-dm rounded-bottom px-20">
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
