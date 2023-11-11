<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}
?>
<details id="lang-selector" class="border p-mxs px-s bkgd-blank-dark r-m">
	<summary>
		<i class="fad fa-language"></i>
		<span class="mobile-hide t-w-500">&nbsp;<?php print(localize("lang.menu.title")); ?></span>
		&nbsp;<i class="fa fa-angle-down"></i>
	</summary>
	<div class="p-xs border bkgd-surround r-m t-w-500">
		<a href="<?php echo(l10n_url_switch('en')); ?>" class="bland-link">
			<p class="mb-s px-xxs"><?php print(localize("lang.english")); ?></p>
		</a>
		<a href="<?php echo(l10n_url_switch('fr')); ?>" class="bland-link">
			<p class="my-s px-xxs"><?php print(localize("lang.french")); ?></p>
		</a>
		<hr class="subtle m-0">
		<a href="<?php echo(l10n_url_switch(NULL)); ?>" class="bland-link">
			<p class="mt-xs px-xxs"><?php print(localize("lang.automatic")); ?></p>
		</a>
	</div>
</details>