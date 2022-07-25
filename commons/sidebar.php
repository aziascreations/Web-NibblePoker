<?php
// Making sure the file is included and not accessed directly.
if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
    header('HTTP/1.1 403 Forbidden');
    die();
}

include_once 'langs.php';

if(!isset($SIDEBAR_ID)) {
    $SIDEBAR_ID = 'default';
}
?>
<div class="sidebar">
	<div class="sidebar-menu font-weight-bold">
		<a href="<?php print(l10n_url_abs('/')); ?>" class="sidebar-brand no-select">
			<img id="logo-sidebar" src="/resources/Azias/logos/v2_full_unshaded_original.svg" alt="logo" draggable="false">
		</a>
		<h4 class="text-center quantum ucase font-size-28 text-muted">N<span class="text-super-muted">ibble</span> P<span class="text-super-muted">oker</span></h4>
		<div class="sidebar-divider"></div>
		<a id="sbl-home" href="<?php print(l10n_url_abs('/')); ?>" class="sidebar-link sidebar-link-with-icon<?php if($SIDEBAR_ID=="home"){echo(" active");} ?>">
			<span class="sidebar-icon"><i class="fad fa-home" aria-hidden="true"></i></span>
			<?php print(localize("home.title.nav")); ?>
		</a>
		<div class="sidebar-divider"></div>
		<a id="sbl-programming" href="<?php print(l10n_url_abs('/content/')); ?>" class="sidebar-link sidebar-link-with-icon<?php if($SIDEBAR_ID=="blog"){echo(" active");} ?>">
			<span class="sidebar-icon"><i class="fad fa-briefcase"></i></span>
			<?php print(localize("programming.title.projects")); ?>
		</a>
		<div class="ml-20">
			<a id="sbl-projects-apps" href="<?php print(l10n_url_abs('/content/?tags=application')); ?>" class="sidebar-link sidebar-link-with-icon">
				<span class="sidebar-icon"><i class="fad fa-browser"></i></span>
				<?php print(localize("programming.apps.title")); ?>
			</a>
			<a id="sbl-projects-tutorials" href="<?php print(l10n_url_abs('/content/?tags=tutorial')); ?>" class="sidebar-link sidebar-link-with-icon">
				<span class="sidebar-icon"><i class="fad fa-books"></i></span>
				<?php print(localize("programming.tutorials.title")); ?>
			</a>
			<a id="sbl-projects-tools" href="<?php print(l10n_url_abs('/content/?tags=tool')); ?>" class="sidebar-link sidebar-link-with-icon">
				<span class="sidebar-icon"><i class="fad fa-tools"></i></span>
				<?php print(localize("programming.tools.title")); ?>
			</a>
			<div class="sidebar-divider"></div>
			<a id="sbl-purebasic" href="<?php print(l10n_url_abs('/content/?tags=purebasic')); ?>" class="sidebar-link sidebar-link-with-icon">
				<span class="sidebar-icon"><i class="fad fa-microchip"></i></span>
				<?php print(localize("programming.purebasic.title")); ?>
			</a>
			<a id="sbl-python" href="<?php print(l10n_url_abs('/content/?tags=python')); ?>" class="sidebar-link sidebar-link-with-icon">
				<span class="sidebar-icon"><i class="fab fa-python"></i></span>
				<?php print(localize("programming.python.title")); ?>
			</a>
			<a id="sbl-docker" href="<?php print(l10n_url_abs('/content/?tags=docker')); ?>" class="sidebar-link sidebar-link-with-icon">
				<span class="sidebar-icon"><i class="fab fa-docker"></i></span>
				<?php print(localize("programming.docker.title")); ?>
			</a>
			<div class="sidebar-divider"></div>
            <a id="sbl-projects-downloads" href="https://files.nibblepoker.lu/" class="sidebar-link sidebar-link-with-icon">
                <span class="sidebar-icon"><i class="fad fa-download"></i></span>
				<?php print(localize("programming.downloads.title")); ?>
            </a>
            <a id="sbl-projects-downloads" href="https://git.nibblepoker.lu/" class="sidebar-link sidebar-link-with-icon">
                <span class="sidebar-icon"><i class="fad fa-code"></i></span>
				<?php print(localize("programming.git.title")); ?>
            </a>
		</div>
		<div class="sidebar-divider"></div>
		<a id="sbl-links" href="<?php print(l10n_url_abs('/links/')); ?>" class="sidebar-link sidebar-link-with-icon<?php if($SIDEBAR_ID=="links"){echo(" active");} ?>">
			<span class="sidebar-icon"><i class="fad fa-link"></i></span>
			<?php print(localize("links.title")); ?>
		</a>
		<a id="sbl-contact" href="<?php print(l10n_url_abs('/contact/')); ?>" class="sidebar-link sidebar-link-with-icon<?php if($SIDEBAR_ID=="contact"){echo(" active");} ?>">
			<span class="sidebar-icon"><i class="fad fa-mailbox"></i></span>
			<?php print(localize("contact.title")); ?>
		</a>
	</div>
</div>
