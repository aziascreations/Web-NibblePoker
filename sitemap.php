<?php

// Constants.
CONST BASE_URL = "https://nibblepoker.";
const SITEMAP_LANGUAGES = ["", "en/", "fr/"];
const SITEMAP_PAGES = [
	"",
	"about/",
	"content/",
	"content/lscom-cli",
	"content/lscom-cli-dotnet",
	"content/youtube-auto-archiver",
	"content/excel-worksheet-password-remover",
	"content/mc-expanded-iron-bundles",
	"content/dotnet-arguments",
	"content/circuitpython-ebyte-e32",
	"links/",
	"contact/",
	"privacy/",
];

// Retrieving the requested TLD.
switch($_SERVER['SERVER_NAME']) {
	case "nibblepoker.lu":
		$domain_tld = "lu";
		break;
	case "nibblepoker.com":
		$domain_tld = "com";
		break;
	default:
		http_response_code(400);
		exit(1);
}

// Generating the sitemap.
foreach(SITEMAP_LANGUAGES as $language_key) {
	foreach(SITEMAP_PAGES as $page_path) {
		echo(BASE_URL . $domain_tld. "/" . $language_key . $page_path . "\r\n");
	}
}

// Finishing the response.
//http_response_code(200);
exit(0);
?>
