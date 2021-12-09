<?php set_include_path('../commons/'); include 'config.php'; include 'langs.php'; include 'content.php'?>
<?php
// Checking if an error occured while loading data and parsing the URL.
$content_error_code = 200;
if($content_has_error) {
	if(is_null($requested_tags)) {
		// Failed to parse URL and detect a default category.
		header("HTTP/1.1 400 Bad Request");
		$content_error_code = 400;
	} elseif(is_null($filtered_content_index_data)) {
		// Failed to get a display type or to extract types.
		header("HTTP/1.1 400 Bad Request");
		$content_error_code = 400;
	} else {
		//Other error. (No article, ...)
		header("HTTP/1.1 500 Internal Server Error");
		$content_error_code = 500;
	}
}

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
									<h2 class="card-title font-size-18 m-0"><i class="fad fa-debug"></i>&nbsp;&nbsp;Debug</h2>
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
					
					<?php
					if($content_error_code != 200) {
						printErrorCard('error.content.title.generic', $content_error_message);
						goto content_printing_end;
					}
					
					// Printing the containers
					if($requested_content_display_type == ContentDisplayType::SEARCH) {
						startMainCard("fad fa-file-alt", "content.title.search", "subtitle");
                        echo('<div class="py-20 bg-light-lm bg-very-dark-dm rounded-bottom px-0">');
						for($i = 0; $i < count($filtered_content_index_data); $i++) {
							if($i > 0) {
								echo('<div class="sidebar-divider m-20 mx-0"></div>');
							}
                            echo('<div class="content m-0 mx-20">');
                            echo('<h3 class="font-size-14 font-weight-semi-bold m-0">'.$filtered_content_index_data[$i]["title"][$user_language].'</h3>');
                            echo('</div>');
						}
                        echo('</div>');

                        echo('<div class="px-card py-10 bg-light-lm bg-dark-dm rounded-bottom border-top">'.
                            '<p class="font-size-12 m-0">'.
                            'Card footer here.'.
                            '</p></div>');/**/

                        endMainCard();
					} elseif($requested_content_display_type == ContentDisplayType::ARTICLE) {
						startMainCard("fad fa-file-alt", "content.title.article", "subtitle");
                        endMainCard();
					} elseif($requested_content_display_type == ContentDisplayType::APPLICATION) {
						startMainCard("fad fa-file-alt", "content.title.application", "subtitle");
                        endMainCard();
					}
					
					content_printing_end:
					?>

                    <!--
                     -->

					<!--<div class="px-card py-20 bg-light-lm bg-very-dark-dm rounded-bottom px-20">
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
					</div>-->
				</div>
			</div>
		</div>
		<?php include 'footer.php'; ?>
	</div>
	<script src="/resources/HalfMoon/1.1.1/js/halfmoon.min.js"></script>
	<script src="/resources/Azias/js/nibblepoker.lu.js"></script>
</body>
</html>
