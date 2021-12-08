<?php if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) { header('HTTP/1.1 403 Forbidden'); die(); } ?>
<nav class="navbar navbar-fixed-bottom">
	<div class="navbar-content">
		<div class="navbar-content">
			<button id="button-sidebar" class="btn btn-action" type="button">
				<i class="fa fa-bars" aria-hidden="true"></i><span class="sr-only">Sidebar</span>
			</button>
		</div>
		<!--<div id="copyright-text" class="text-muted ml-15">© Copyright 2020-2021, BOZET Herwin</div>-->
	</div>
	<span class="ml-auto">
		<div id="privacy-footer-link" class="text-muted ml-15">
			<a href="<?php print(l10n_url_abs('/privacy/')); ?>" class="text-decoration-none">
				<p class="text-muted font-weight-semi-bold"><?php print(localize('privacy.title')); ?></p>
			</a>
		</div>
	</span>
	<!--<span class="navbar-brand ml-auto">
		<a href="<?php echo(l10n_url_switch('en')); ?>">
			<img src="/resources/Icons8/color/flags/countries/uk.svg" alt="English">
		</a>
		<a href="<?php echo(l10n_url_switch('fr')); ?>">
			<img src="/resources/Icons8/color/flags/countries/france.svg" alt="French">
		</a>
		<a href="<?php echo(l10n_url_switch('lb')); ?>">
			<img src="/resources/Icons8/color/flags/countries/luxembourg.svg" alt="Luxembourgish">
		</a>
	</span>-->
	<a href="<?php print(l10n_url_abs('/')); ?>" class="navbar-brand ml-auto">
		<span class="navbar-brand ml-auto">
			<img id="logo-footer" src="/resources/Azias/logos/logov3-test-finalized.svg" alt="logo" draggable="false">
		</span>
	</a>
</nav>
