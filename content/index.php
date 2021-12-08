<?php set_include_path('../commons/'); include 'config.php'; include 'langs.php'; include 'content.php'?>
<?php
// TODO: Check if it went well, else 503 or something like that.
?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<?php include 'headers.php'; ?>
	<title>Content - Nibble Poker</title>
	<meta name="description" content="???">
	<meta property="og:title" content="Nibble Poker - Content" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="<?php echo($host_uri); ?>/" />
	<meta property="og:image" content="<?php echo($host_uri); ?>/resources/Azias/logos/rect1750-9-7-3-shaded.png"/>
	<meta property="og:image:type" content="image/png"/>
	<meta property="og:description" content="???"/>
</head>
<body class="with-custom-webkit-scrollbars with-custom-css-scrollbars dark-mode" data-dm-shortcut-enabled="true" data-sidebar-shortcut-enabled="true">
<?php include 'body-root.php'; ?>
<div class="page-wrapper with-sidebar with-navbar-fixed-bottom">
	<?php include 'sidebar.php'; ?>
	<div class="content-wrapper">
		<div class="container-fluid">
			<div id="page-title-bar" class="card p-0 pl-20 m-0 square-corners bg-very-dark title-bkgd navbar">
				<h2 class="content-title font-size-24 mt-20 text-truncate">
					<i class="fad fa-mailbox"></i>&nbsp;${TODO}
				</h2>
				<?php include 'header-lang.php'; ?>
			</div>
			<div class="content">
				
				<div class="card p-0 mx-0">
					<div class="px-card py-10 border-bottom px-20">
						<div class="container-fluid">
							<div class="row">
								<div class="col-4">
									<h2 class="card-title font-size-18 m-0"><i class="fad fa-debug"></i>&nbsp;&nbsp;Debug</h2>
								</div>
							</div>
						</div>
					</div>
					<div class="px-card py-20 bg-light-lm bg-very-dark-dm rounded-bottom px-20">
						<h3 class="m-0 mb-5 font-size-20 text-center font-weight-semi-bold">This page is still under construction !</h3>
						<p class="m-0 mb-5">REQUEST_URI: <?php echo($_SERVER['REQUEST_URI']); ?></p>
						<p class="m-0 mb-5">$requested_content_type: <?php echo($requested_content_type); ?></p>
						<p class="m-0 mb-5">$requested_content_display_type: <?php echo($requested_content_display_type); ?></p>
						<p class="m-0 mb-5">$requested_tags: [<?php echo(implode(", ", $requested_tags)); ?>]</p>
						<p class="m-0 mb-5">count($requested_tags): <?php echo(count($requested_tags)); ?></p>
						<p class="m-0 mb-5">$content_has_error: <?php echo($content_has_error); ?></p>
						<p class="m-0 mb-5">$_content_error_message_key: <?php echo($_content_error_message_key); ?></p>
						<p class="m-0 mb-5">localize($_content_error_message_key): <?php echo(localize($_content_error_message_key)); ?></p>
						<p class="m-0 mb-5">$content_error_message: <?php echo($content_error_message); ?></p>
						<p class="m-0 mb-5">$filtered_content_index_data: <?php print_r($filtered_content_index_data); ?></p>
						<p class="m-0 mb-5">$content_requested_url_part: <?php echo($content_requested_url_part); ?></p>
					</div>
				</div>
				
				<div class="card p-0 mx-0">
					<div class="px-card py-10 border-bottom px-20">
						<div class="container-fluid">
							<div class="row">
								<div class="col-4">
									<h2 class="card-title font-size-18 m-0">
										<i class="fad fa-exclamation-triangle"></i>&nbsp;&nbsp;error.content.title.generic
									</h2>
								</div>
							</div>
						</div>
					</div>
					<div class="px-card py-20 bg-light-lm bg-very-dark-dm rounded-bottom px-20">
						<h3 class="m-0 font-size-20 text-center font-weight-semi-bold"><?php echo($content_error_message); ?></h3>
					</div>
				</div>
				
				<div class="card p-0 mx-0 d-none">
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
						<form action="mailto:herwin.bozet@gmail.com?subject=Website%20contact%20form%20message" method="post" class="w-full">
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
				
			</div>
		</div>
	</div>
	<?php include 'footer.php'; ?>
</div>
<script src="/resources/HalfMoon/1.1.1/js/halfmoon.min.js"></script>
<script src="/resources/Azias/js/nibblepoker.lu.js"></script>
</body>
</html>
