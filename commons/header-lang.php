<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
    header('HTTP/1.1 403 Forbidden');
    die();
}
?>
<div id="header-lang-menu" class="navbar-content ml-auto">
	<div class="dropdown with-arrow">
		<button class="btn" data-toggle="dropdown" type="button" id="navbar-lang-dropdown">
			<i class="fad fa-language"></i>&nbsp;&nbsp;<?php print(localize("lang.menu.title")); ?>
			<i class="fa fa-angle-down" aria-hidden="true"></i>
		</button>
		<div class="dropdown-menu dropdown-menu-right w-150" aria-labelledby="navbar-lang-dropdown">
			<a href="<?php echo(l10n_url_switch('en')); ?>" class="dropdown-item">
				<?php print(localize("lang.english")); ?>
			</a>
			<a href="<?php echo(l10n_url_switch('fr')); ?>" class="dropdown-item">
				<?php print(localize("lang.french")); ?>
			</a>
			<!--<a href="<?php echo(l10n_url_switch('lb')); ?>" class="dropdown-item">
				<?php print(localize("lang.luxembourgish")); ?>
			</a>-->
			<div class="dropdown-divider mt-5 mb-5"></div>
			<a href="<?php echo(l10n_url_switch(NULL)); ?>" class="dropdown-item">
				<?php print(localize("lang.automatic")); ?>
			</a>
		</div>
	</div>
</div>
