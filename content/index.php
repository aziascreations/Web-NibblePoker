<?php set_include_path('../commons/'); include 'config.php'; include 'langs.php'; include 'content.php'?>
<?php
// TODO: Check if it went well, else 503 or something like that.
?>
<!DOCTYPE html>
<html lang="<?php echo($user_language); ?>">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
		  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
	<h1>This section is currently under construction !</h1>
	<p>Entered "/content/index.php"</p>
	<p>REQUEST_URI: <?php echo($_SERVER['REQUEST_URI']); ?></p>
	<p>$requested_content_type: <?php echo($requested_content_type); ?></p>
	<p>$requested_content_display_type: <?php echo($requested_content_display_type); ?></p>
	<p>$requested_tags: [<?php echo(implode(", ", $requested_tags)); ?>]</p>
	<p>count($requested_tags): <?php echo(count($requested_tags)); ?></p>
	<p>$content_has_error: <?php echo($content_has_error); ?></p>
	<p>$_content_error_message_key: <?php echo($_content_error_message_key); ?></p>
	<p>localize($_content_error_message_key): <?php echo(localize($_content_error_message_key)); ?></p>
	<p>$content_error_message: <?php echo($content_error_message); ?></p>
	<p>$filtered_content_index_data: <?php print_r($filtered_content_index_data); ?></p>
	<p>$content_requested_url_part: <?php echo($content_requested_url_part); ?></p>
</body>
</html>