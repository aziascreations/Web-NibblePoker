<?php
// Importing required scripts.
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
    
    // Setting up the page's title, description and opengraph tags.
	if($content_has_error) {
		echo('<title>' . localize("error.content.title.generic") . ' - Nibble Poker</title>');
		echo('<meta name="description" content="'.$content_error_message.'">');
		echo('<meta property="og:title" content="Nibble Poker - '.localize("error.content.title.generic").'" />');
		echo('<meta property="og:description" content="'.$content_error_message.'"/>');
		echo('<meta property="og:type" content="website" />');
		echo('<meta property="og:url" content="' . $host_uri . '" />');
		echo('<meta property="og:image" content="' . $host_uri . '/resources/Azias/logos/v2_opengraph.png"/>');
		echo('<meta property="og:image:type" content="image/png"/>');
	} else {
	    if($requested_content_display_type == ContentDisplayType::CONTENT) {
			echo('<title>'.$content->get_head_title().' - Nibble Poker</title>');
			echo('<meta name="description" content="'.$content->get_head_description().'">');
			echo($content->get_opengraph_tags("Nibble Poker - ", "website", $host_uri,
				null, $host_uri . "/resources/Azias/logos/v2_opengraph.png"));
        } else {
            echo('<title>' . localize("content.title.search.card") . ' - Nibble Poker</title>');
            echo('<meta name="description" content="">');
            echo('<meta property="og:title" content="Nibble Poker - '.localize("content.title.search.card").'" />');
            echo('<meta property="og:description" content=""/>');
            echo('<meta property="og:type" content="website" />');
            echo('<meta property="og:url" content="' . $host_uri . '" />');
            echo('<meta property="og:image" content="' . $host_uri . '/resources/Azias/logos/v2_opengraph.png"/>');
            echo('<meta property="og:image:type" content="image/png"/>');
        }
    }
    ?>
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
                        if($content_has_error) {
                            echo('<span class="hidden-xs-and-down">'.localize("content.title.content").'<span class="mx-10">❱</span></span>'.localize("content.title.error"));
                        } elseif($requested_content_display_type == ContentDisplayType::SEARCH) {
							echo(localize("content.title.content").'<span class="hidden-xs-and-down"><span class="mx-10">❱</span>'.localize("content.title.search.header").'</span>');
                        } elseif($requested_content_display_type == ContentDisplayType::CONTENT) {
							echo('<span class="hidden-xs-and-down">'.localize("content.title.content").'<span class="mx-10">❱</span></span>'.$content->get_head_title());
                        }
                        ?>
					</h2>
					<?php include 'header-lang.php'; ?>
				</div>
				<div class="content mx-auto w-lg-p90">
                    <?php
                    // Checking if an error occurred.
					if($content_error_code != 200) {
						// #############
						//  Error card
						// #############
						start_content_card("fad fa-exclamation-triangle", localize('error.content.title.generic'), "");
						echo('<div class="py-20 bg-light-lm rounded-bottom px-0 bg-very-dark title-bkgd">');
                        echo('<h3 class="m-0 font-size-20 text-center font-weight-semi-bold">'.$content_error_message.'</h3>');
						echo('</div>');
						echo('<div class="px-card py-10 bg-light-lm bg-dark-dm rounded-bottom border-top">'.
							'<p class="font-size-12 m-0 text-super-muted">'.
							'Card footer here.'.
							'</p></div>');
						end_content_card();
						goto content_printing_end;
					}

					// Printing the containers
					if($requested_content_display_type == ContentDisplayType::SEARCH) {
						// #############
						//  Search page
						// #############
						start_content_card(
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
						end_content_card();
					} elseif($requested_content_display_type == ContentDisplayType::CONTENT) {
						// ##############
                        //  Content page
						// ##############
                        echo($content->get_html());
					}
     
					content_printing_end:
					?>
				</div>
			</div>
		</div>
        
        <!-- Custom modal, see: https://dev.to/nicm42/fading-in-and-fading-out-with-css-transitions-3lc1 -->
        
        <div class="modal" id="modal-content-image-viewer" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content modal-content-media w-three-quarter">
                    <a id="modal-img-close" href="#" class="close" role="button" aria-label="Close">
                        <span aria-hidden="true"><i class="fad fa-times"></i></span>
                    </a>
                    <img id="modal-img" src="/resources/Azias/imgs/placeholder.png" class="img-fluid ml-auto mr-auto" alt="modal-img">
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
