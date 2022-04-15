<?php
// Includes
set_include_path('../commons/');
include_once 'config.php';
include_once 'langs.php';
include_once 'content.php';

// Checking if an error occurred while loading data and parsing the URL.
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
		<?php $SIDEBAR_ID = 'blog'; include 'sidebar.php'; ?>
		<div class="content-wrapper">
			<div class="container-fluid">
				<div id="page-title-bar" class="card p-0 pl-20 m-0 square-corners bg-very-dark title-bkgd navbar">
					<h2 class="content-title font-size-24 mt-20 text-truncate">
                        <i class="fad fa-briefcase"></i>&nbsp;&nbsp;<?php
                        if($content_has_error) {
							if(isset($_SERVER['HTTP_REFERER'])) {
								echo('<a href="'.$_SERVER['HTTP_REFERER'].'">'.localize("content.title.content").'</a>');
                            } else {
								//echo('<a class="js-set-previous-url" href="#">'.localize("content.title.content").'</a>');
								echo(localize("content.title.content"));
                            }
							echo('<span class="mx-10">❱</span>'.localize("content.title.error"));
                        } elseif($requested_content_display_type == ContentDisplayType::SEARCH) {
							echo(localize("content.title.content").'<span class="mx-10">❱</span>'.localize("content.title.search"));
                        } elseif($requested_content_display_type == ContentDisplayType::CONTENT) {
							echo(localize("content.title.content").'<span class="mx-10">❱</span>$TODO');
                        }
                        ?>
					</h2>
					<?php include 'header-lang.php'; ?>
				</div>
				<div class="content mx-auto w-lg-p90">
                    <?php
					startMainCard("fad fa-construction", "Under construction", "");
					echo('<div class="py-20 bg-light-lm rounded-bottom px-0 bg-very-dark title-bkgd">');
					echo('<div class="content m-0 mx-20">');
					echo('<h3 class="font-size-18 mb-5 font-weight-semi-bold content-search-title">');
                    echo('<span class="font-weight-bold">15/04/2021</span> - This section is under construction...</h3>');
					echo('</div>');
					echo('</div>');
					endMainCard();
                    
                    if($SHOW_CONTENT_DEBUG_CARD) {
                        echo('<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<h2 class="card-title font-size-18 m-0"><i class="fad fa-debug"></i>&nbsp;&nbsp;Debug</h2>
								</div>
							</div>
						</div>
						<div class="px-card py-20 bg-light-lm rounded-bottom px-20 bg-very-dark title-bkgd">
							<!--<h3 class="m-0 mb-5 font-size-20 text-center font-weight-semi-bold">This page is still under construction !</h3>-->');
                        echo('<p class="m-0 mb-5">REQUEST_URI: '.$_SERVER['REQUEST_URI'].'</p>');
                        echo('<p class="m-0 mb-5">$requested_content_display_type: '.$requested_content_display_type.'</p>');
                        echo('<p class="m-0 mb-5">$requested_tags: ['.implode(", ", $requested_tags).']</p>');
                        echo('<p class="m-0 mb-5">count($requested_tags): '.count($requested_tags).'</p>');
                        echo('<p class="m-0 mb-5">$content_has_error: '.$content_has_error.'</p>');
                        echo('<p class="m-0 mb-5">$content_error_message_key: '.$content_error_message_key.'</p>');
                        echo('<p class="m-0 mb-5">localize($content_error_message_key): '.localize($content_error_message_key).'</p>');
                        echo('<p class="m-0 mb-5">$content_error_message: '.$content_error_message.'</p>');
						echo('<p class="m-0 mb-5">$raw_additional_tags: '.$raw_additional_tags.'</p>');
                        echo('<p class="m-0 mb-5">$filtered_content_index_data: ');
                        print_r($filtered_content_index_data);
                        echo('</p>');
                        echo('<p class="m-0 mb-5">$content_requested_url_part: '.$content_requested_url_part.'</p>');
                        if($requested_content_display_type == ContentDisplayType::CONTENT) {
							echo('<hr class="subtle mb-10 mt-15">');
							echo('<p class="m-0 mb-5">$requested_item_data: ');
							print_r($requested_item_data);
							echo('</p>');
                        }
                        echo('</div></div>');
                    }

                    // Checking if an error occurred.
					if($content_error_code != 200) {
						startMainCard("fad fa-exclamation-triangle", localize('error.content.title.generic'), "");
						echo('<div class="py-20 bg-light-lm rounded-bottom px-0 bg-very-dark title-bkgd">');
                        echo('<h3 class="m-0 font-size-20 text-center font-weight-semi-bold">'.$content_error_message.'</h3>');
						echo('</div>');
						echo('<div class="px-card py-10 bg-light-lm bg-dark-dm rounded-bottom border-top">'.
							'<p class="font-size-12 m-0">'.
							'Card footer here.'.
							'</p></div>');
						endMainCard();
						goto content_printing_end;
					}

					// Printing the containers
					if($requested_content_display_type == ContentDisplayType::SEARCH) {
                        // Creating the start of the card, only a "</div>" should be required afterward.
						startMainCard(
                                "fad fa-file-search",
                                localize("content.title.search"),
                                strval(count($filtered_content_index_data)) . " " .
                                    (count($filtered_content_index_data) > 1 ?
                                        localize("content.search.count.multiple") :
                                        localize("content.search.count.single")));
                        echo('<div class="py-20 bg-light-lm rounded-bottom px-0 bg-very-dark title-bkgd">');
						for($i = 0; $i < count($filtered_content_index_data); $i++) {
							if($i > 0) {
								echo('<div class="sidebar-divider m-20 mx-0"></div>');
							}
                            echo('<div class="content m-0 mx-20">');
							
							// https://css-tricks.com/float-an-element-to-the-bottom-corner/
                            echo('<div class="content-presentation-container">');
                            echo('<a href="'.l10n_url_abs("/content/".$filtered_content_index_data[$i]["id"]).'"><div>');
							echo('<div class="content-search-image-container">');
							echo('<img class="content-search-image" src="'.$filtered_content_index_data[$i]["image"].'">');
							echo('</div>');
							echo('<h3 class="font-size-18 mb-5 font-weight-semi-bold content-search-title">'.$filtered_content_index_data[$i]["title"][$user_language].'</h3>');
							echo($filtered_content_index_data[$i]["preamble"][$user_language]);
							echo('</div></a>');
                            echo('</div>');
                            
                            echo('<hr class="subtle">');

                            echo('<div class="d-flex flex-wrap">');
                            echo('<div class="content-tag-container">');
                            echo('<i class="fad fa-tags"></i>');
						    for($j = 0; $j < count($filtered_content_index_data[$i]["tags"]); $j++) {
                                echo('<a href="#" class="content-tag">#'.$filtered_content_index_data[$i]["tags"][$j].'</a>');
                            }
                            echo('</div>');
                            echo('</div>');
                            
                            echo('</div>');
						}
                        echo('</div>');
                        echo('<div class="px-card py-10 bg-light-lm bg-dark-dm rounded-bottom border-top">'.
                            '<p class="font-size-12 m-0">'.
                            'Card footer here.'.
                            '</p></div>');
                        endMainCard();
					} elseif($requested_content_display_type == ContentDisplayType::CONTENT) {
						$_title_icon = "fad fa-question";
						$_title_text = '<i>' . localize("error.content.data.no.title") . '</i>';
						
						if (array_key_exists("title", $requested_item_data)) {
							if (array_key_exists("icon", $requested_item_data["title"])) {
								$_title_icon = $requested_item_data["title"]["icon"];
							}
							
							if (array_key_exists($user_language, $requested_item_data["title"])) {
								$_title_text = $requested_item_data["title"][$user_language];
							} elseif (array_key_exists($default_language, $requested_item_data["title"])) {
								$_title_text = $requested_item_data["title"][$user_language];
							}
						}
						
						startMainCard($_title_icon, $_title_text, "");
						
						echo('<div class="py-20 bg-light-lm rounded-bottom px-0 bg-very-dark title-bkgd">');
						echo('<div class="content m-0 mx-20">');
						echo('<p class="my-0">Text will go here...</p>');
						echo('</div>');
						echo('</div>');
						
						echo('<div class="px-card py-10 bg-light-lm bg-dark-dm rounded-bottom border-top">' .
							'<p class="font-size-12 m-0">' .
							'Card footer here.' .
							'</p></div>');
						endMainCard();
					}
     
					content_printing_end:
					?>
				</div>
			</div>
		</div>
		<?php include 'footer.php'; ?>
	</div>
	<script src="/resources/HalfMoon/1.1.1/js/halfmoon.min.js"></script>
	<script src="/resources/Azias/js/nibblepoker.lu.js"></script>
</body>
</html>
