<?php
set_include_path('../commons/');
include_once 'config.php';
include_once 'langs.php';
?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'headers.php'; ?>
	<title><?php print(localize('contact.title')); ?> - Nibble Poker</title>
	<meta name="description" content="<?php print(localize('contact.description')); ?>">
	<meta property="og:title" content="Nibble Poker - <?php print(localize('contact.title')); ?>" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="<?php echo($host_uri); ?>/" />
    <meta property="og:image" content="<?php echo($host_uri); ?>/resources/Azias/logos/v2_opengraph.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="<?php print(localize('contact.description')); ?>"/>
</head>
<body class="with-custom-webkit-scrollbars with-custom-css-scrollbars dark-mode" data-dm-shortcut-enabled="true" data-sidebar-shortcut-enabled="true">
	<?php include 'body-root.php'; ?>
	<div class="page-wrapper with-sidebar with-navbar-fixed-bottom">
		<?php $SIDEBAR_ID = 'contact'; include 'sidebar.php'; ?>
		
		<div class="content-wrapper">
			<div class="container-fluid">
				<div id="page-title-bar" class="card p-0 pl-20 m-0 square-corners bg-very-dark title-bkgd navbar">
					<h2 class="content-title font-size-24 mt-20 text-truncate">
						<i class="fad fa-mailbox"></i>&nbsp;<?php print(localize("contact.title")); ?>
					</h2>
					<?php include 'header-lang.php'; ?>
				</div>
				<div class="content mx-auto w-lg-p90">
					<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-4">
										<h2 class="card-title font-size-18 m-0"><i class="fad fa-envelope-square"></i>&nbsp;&nbsp;Email</h2>
									</div>
									<div class="col-8 text-right font-italic">
										<h2 class="card-title font-size-18 m-0 text-super-muted">herwin.bozet@gmail.com</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="px-card py-20 bg-light-lm bg-very-dark-dm rounded-bottom px-20">
							<form action="mailto:herwin.bozet@gmail.com?subject=Website%20contact%20form%20message" target="_top" method="post" class="w-full">
								<div class="form-group">
									<label for="name">Sender's Name</label>
									<input type="text" class="form-control" id="name" placeholder="John Smith">
								</div>
								<div class="form-group">
									<label for="message" class="required">Message</label>
									<textarea class="form-control" id="message" placeholder="Write your message here." required="required"></textarea>
								</div>
								<input class="btn btn-primary mr-10" type="submit" value="Submit">
								<input class="btn btn-secondary" type="reset" value="Reset">
							</form>
						</div>
					</div>
					<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-4">
										<h2 class="card-title font-size-18 m-0"><i class="fab fa-twitter"></i>&nbsp;&nbsp;Twitter</h2>
									</div>
									<div class="col-8 text-right font-italic">
										<h2 class="card-title font-size-18 m-0 text-super-muted">@NibblePoker</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="px-card py-20 bg-light-lm bg-very-dark-dm rounded-bottom pl-20">
							<a href="https://twitter.com/messages/compose?recipient_id=937370791334895616">
								<button class="btn btn-primary">Compose DM to @NibblePoker on Twitter</button>
							</a>
						</div>
					</div>
					<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<div class="col-5 col-lg-12">
										<h2 class="card-title font-size-18 m-0">
											<i class="fad fa-lock-alt"></i>&nbsp;&nbsp;Tox
										</h2>
									</div>
								</div>
							</div>
						</div>
						<div class="px-card py-10 bg-light-lm bg-very-dark-dm rounded-bottom px-20">
							<p class="mb-0 mt-10">
								Main account:
							</p>
							<p class="text-monospace text-break font-size-12 mt-0 ml-10">
								62C1A91A425F90D7B4F047D70CCF31E7402C9EC37B93604B0F37C416442D15044AF6C1AE033B
							</p>
							<p class="mb-20 text-decoration-none">
								<a href="tox:62C1A91A425F90D7B4F047D70CCF31E7402C9EC37B93604B0F37C416442D15044AF6C1AE033B" class="text-decoration-none">
									<button class="btn btn-primary">Open in Tox Client</button>
								</a>
								<button id="button-copy-tox-id-main" class="btn btn-secondary ml-10">Copy to clipboard</button>
							</p>
							<hr>
							<p class="mb-0">
								Backup account:
							</p>
							<p class="text-monospace text-break font-size-12 mt-0 ml-10">
								01ABBD4515C8FA56231333D1022CEEE0A605F4E85F8A945365F56D196A1BBA10FB4DCE08DBE8
							</p>
							<p>
								<a href="tox:01ABBD4515C8FA56231333D1022CEEE0A605F4E85F8A945365F56D196A1BBA10FB4DCE08DBE8" class="text-decoration-none">
									<button class="btn btn-primary">Open in Tox Client</button>
								</a>
								<button id="button-copy-tox-id-backup" class="btn btn-secondary ml-10">Copy to clipboard</button>
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