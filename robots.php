<?php
// Returning a domain-specific "robots.txt" file based on the requested host.
switch($_SERVER['SERVER_NAME']) {
	case "nibblepoker.lu":
		print("User-agent: *\r\n");
		print("Allow: /\r\n\r\n");
		print("Sitemap: https://nibblepoker.lu/sitemap.txt\r\n");
		break;
	case "nibblepoker.com":
		print("User-agent: *\r\n");
		print("Allow: /\r\n\r\n");
		print("Sitemap: https://nibblepoker.com/sitemap.txt\r\n");
		break;
	default:
		http_response_code(400);
		exit(1);
}
http_response_code(200);
exit(0);
?>
