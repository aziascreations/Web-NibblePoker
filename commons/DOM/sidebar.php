<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

include_once 'commons/langs.php';

if(!isset($SIDEBAR_IDS)) {
	$SIDEBAR_IDS = [];
}

function printSidebarEntry($url, $title, $icon, $activeId) {
	global $SIDEBAR_IDS;
	echo('<a class="' . (in_array($activeId, $SIDEBAR_IDS) ? 'text-link' : 'bland-link') . '" href="' . $url . '">');
	echo('<p class="t-size-18 t-w-500 py-xs sidebar-entry">');
	echo('<i class="' . $icon . ' pr-xs t-size-12 t-half-muted"></i><span class="t-size-12">' . $title . '</span></p></a>');
}

?>
<nav id="sidebar" class="sidebar p-m pt-l">
	<a href="<?php print(l10n_url_abs('/')); ?>" class="no-select">
		<img id="logo-sidebar" src="/resources/NibblePoker/images/logos/v2_full_unshaded_original.svg"
		     alt="<?php echo(localize("sidebar.alt.logo")); ?>" draggable="false">
	</a>
	<p class="quantum t-logo-text mb-s mt-xs t-muted ucase">
		N<span class="t-super-muted">ibble</span>P<span class="t-super-muted">oker</span>
	</p>
	<hr class="subtle">
	<?php
	printSidebarEntry(l10n_url_abs('/'), localize("sidebar.text.home"), "fad fa-home", "home");
	?>
	<hr class="subtle">
	<?php
	printSidebarEntry(l10n_url_abs('/content/'), localize("sidebar.text.projects"), "fad fa-briefcase", "content");
	?>
	<div class="ml-m">
		<?php
		printSidebarEntry(l10n_url_abs('/content/?tags=application'), localize("sidebar.text.applications"), "fad fa-browser", "application");
		printSidebarEntry(l10n_url_abs('/content/?tags=library'), localize("sidebar.text.libraries"), "fad fa-puzzle-piece", "library");
		printSidebarEntry(l10n_url_abs('/content/?tags=electronic'), localize("sidebar.text.electronics"), "fad fa-microchip", "electronic");
		?>
	</div>
	<hr class="subtle">
	<?php
	printSidebarEntry(l10n_url_abs('/tools/'), localize("sidebar.text.tools"), "fad fa-tools", "tools");
	?>
	<hr class="subtle">
	<?php
	printSidebarEntry(l10n_url_abs('/links/'), localize("sidebar.text.links"), "fad fa-link", "links");
	?>
	<div class="ml-m">
		<?php
		printSidebarEntry("https://files.nibblepoker.lu/", localize("sidebar.text.downloads"), "fad fa-download", "");
		printSidebarEntry("https://git.nibblepoker.lu/", localize("sidebar.text.gitea"), "fad fa-code", "");
		//printSidebarEntry("https://wiki.nibblepoker.lu/", localize("sidebar.text.wiki"), "fad fa-books", "");
		?>
	</div>
	<hr class="subtle">
	<?php
	printSidebarEntry(l10n_url_abs('/about/'), localize("sidebar.text.about"), "fad fa-user", "about");
	printSidebarEntry(l10n_url_abs('/contact/'), localize("sidebar.text.contact"), "fad fa-mailbox", "contact");
	?>
</nav>
