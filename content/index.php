<?php
// Includes
set_include_path('../commons/');
include_once 'config.php';
include_once 'langs.php';
include_once 'content.php';

// Checking if an error occurred while loading data and parsing the URL.
$content_error_code = 200;
if($content_has_error) {
    // TODO: Add condition for the lack of data for an item.
	if(is_null($filtered_content_index_data)) {
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
	<?php
    include 'headers.php';
    
    // Setting up the common variables.
	if($content_has_error) {
		$_metaTitle = localize("error.content.title.generic");
		$_metaDescription = $content_error_message;
	} else {
		$_metaTitle = localize("error.content.data.no.title");
		$_metaDescription = localize("error.content.data.no.description");
	    if($requested_content_display_type == ContentDisplayType::CONTENT) {
            if(array_key_exists("meta", $requested_item_data)) {
				if(array_key_exists("title", $requested_item_data["meta"])) {
					$_metaTitle = getContentItemText($requested_item_data["meta"]["title"]);
				}
				if(array_key_exists("description", $requested_item_data["meta"])) {
					$_metaDescription = getContentItemText($requested_item_data["meta"]["description"]);
				}
            }
        } else {
            $_metaTitle = localize("content.title.search.card");
			$_metaDescription = "";
        }
    }
    
	// Printing the title, meta and opengraph tags.
	echo('<title>'.$_metaTitle.' - Nibble Poker</title>');
	echo('<meta name="description" content="'.$_metaDescription.'">');
	echo('<meta property="og:title" content="Nibble Poker - '.$_metaTitle.'" />');
	echo('<meta property="og:description" content="'.$_metaDescription.'"/>');
    ?>
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?php echo($host_uri); ?>/" />
    <meta property="og:image" content="<?php echo($host_uri); ?>/resources/Azias/logos/opengraph.png"/>
    <meta property="og:image:type" content="image/png"/>
    <link href="/resources/GliderJs/1.7.6/glider.min.css" rel="stylesheet" />
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
						echo('<span class="hidden-xs-and-down">');
                        if($content_has_error) {
							if(isset($_SERVER['HTTP_REFERER'])) {
								echo('<a href="'.$_SERVER['HTTP_REFERER'].'">'.localize("content.title.content").'</a>');
                            } else {
								//echo('<a class="js-set-previous-url" href="#">'.localize("content.title.content").'</a>');
								echo(localize("content.title.content"));
                            }
							echo('<span class="mx-10">❱</span>'.localize("content.title.error"));
                        } elseif($requested_content_display_type == ContentDisplayType::SEARCH) {
							echo(localize("content.title.content").'<span class="mx-10">❱</span>'.localize("content.title.search.header"));
                        } elseif($requested_content_display_type == ContentDisplayType::CONTENT) {
							$_nav_title_text = '<i>' . localize("error.content.data.no.title") . '</i>';
       
							if (array_key_exists("page", $requested_item_data["title"])) {
								$_nav_title_text = getContentItemText($requested_item_data["title"]["page"]);
							}
       
							echo(localize("content.title.content").'<span class="mx-10">❱</span></span>'.$_nav_title_text);
                        }
                        ?>
					</h2>
					<?php include 'header-lang.php'; ?>
				</div>
				<div class="content mx-auto w-lg-p90">
                    <?php
                    if($SHOW_CONTENT_DEBUG_CARD) {
						// ################
						//  Debugging card
						// ################
                        echo('<div class="card p-0 mx-0">
						<div class="px-card py-10 border-bottom px-20">
							<div class="container-fluid">
								<div class="row">
									<h2 class="card-title font-size-18 m-0"><i class="fad fa-debug"></i>&nbsp;&nbsp;Debug</h2>
								</div>
							</div>
						</div>
						<div class="px-card py-20 bg-light-lm rounded-bottom px-20 bg-very-dark title-bkgd">');
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
						// #############
						//  Error card
						// #############
						startMainCard("fad fa-exclamation-triangle", localize('error.content.title.generic'), "");
						echo('<div class="py-20 bg-light-lm rounded-bottom px-0 bg-very-dark title-bkgd">');
                        echo('<h3 class="m-0 font-size-20 text-center font-weight-semi-bold">'.$content_error_message.'</h3>');
						echo('</div>');
						echo('<div class="px-card py-10 bg-light-lm bg-dark-dm rounded-bottom border-top">'.
							'<p class="font-size-12 m-0 text-super-muted">'.
							'Card footer here.'.
							'</p></div>');
						endMainCard();
						goto content_printing_end;
					}

					// Printing the containers
					if($requested_content_display_type == ContentDisplayType::SEARCH) {
						// #############
						//  Search page
						// #############
                        
                        // Creating the start of the card, only a "</div>" should be required afterward.
						startMainCard(
                                "fad fa-file-search",
                                localize("content.title.search.card"),
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
                                echo('<a href="'.l10n_url_abs("/content/?tags=".$filtered_content_index_data[$i]["tags"][$j]).'" class="content-tag">#');
                                echo($filtered_content_index_data[$i]["tags"][$j].'</a>');
                            }
                            echo('</div>');
                            echo('</div>');
                            
                            echo('</div>');
						}
                        echo('</div>');
                        echo('<div class="px-card py-10 bg-light-lm bg-dark-dm rounded-bottom border-top">'.
                            '<p class="font-size-12 m-0 text-super-muted">'.
                            'Card footer here.'.
                            '</p></div>');
                        endMainCard();
					} elseif($requested_content_display_type == ContentDisplayType::CONTENT) {
						// ##############
                        //  Content page
						// ##############
      
                        // Preparing soma variables for the icon, title and subtitle.
						$_title_icon = "fad fa-question";
						$_title_text_main = '<i>'.localize("error.content.data.no.title").'</i>';
						$_title_text_sub = NULL;
      
						// Attempting to read the card's icon, title and subtitle.
						if (array_key_exists("title", $requested_item_data)) {
							if (array_key_exists("icon", $requested_item_data["title"])) {
								$_title_icon = $requested_item_data["title"]["icon"];
							}
							if (array_key_exists("card", $requested_item_data["title"])) {
								if (array_key_exists("main", $requested_item_data["title"]["card"])) {
									$_title_text_main = getContentItemText($requested_item_data["title"]["card"]["main"], true);
								}
								if (array_key_exists("sub", $requested_item_data["title"]["card"])) {
									$_title_text_sub = getContentItemText($requested_item_data["title"]["card"]["sub"], true);
								}
							}
						}
						
						// Opening the card.
						startMainCard($_title_icon, $_title_text_main, (is_null($_title_text_sub) ? "" : $_title_text_sub));
						
						// Opening the content container.
						echo('<article id="content-item-container" class="py-01 pb-0 bg-light-lm rounded-bottom px-0 bg-very-dark title-bkgd">');
                        
                        // Adding elements defined in the JSON file.
                        if(array_key_exists("parts", $requested_item_data)) {
                            for ($i = 0; $i < count($requested_item_data["parts"]); $i++) {
								createElementNode($requested_item_data["parts"][$i]);
                            }
                        } else {
							echo('<h3 class="m-0 font-size-20 text-center text-danger font-weight-semi-bold">');
                            echo(localize("error.content.data.no.parts").'</h3>');
                        }
      
						// New elements test zone. - START
                        
						// New elements test zone. - END
						
						// Closing the content container.
						echo('</article>');
						
                        // Printing the tags' section at the end of the card
						echo('<div class="px-20 py-10 bg-light-lm bg-dark-dm rounded-bottom border-top">');
						echo('<div class="content-tag-container"><i class="fad fa-tags"></i>');
                        if(array_key_exists("tags", $requested_item_data)) {
							for($i = 0; $i < count($requested_item_data["tags"]); $i++) {
								echo('<a href="'.l10n_url_abs("/content/?tags=".$requested_item_data["tags"][$i]).'" class="content-tag">#');
								echo($requested_item_data["tags"][$i].'</a>');
							}
                        } else {
                            echo('<i>'.localize("error.content.data.no.tags").'</i>');
                        }
						echo('</div></div>');
                        
                        // Closing the card.
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
    <script src="/resources/GliderJs/1.7.6/glider.min.js"></script>
	<script src="/resources/Azias/js/nibblepoker.lu.js"></script>
</body>
</html>
