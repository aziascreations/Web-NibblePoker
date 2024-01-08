<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

include_once 'commons/langs.php';
?>
<footer class="d-flex flex-align-center w-full p-s py-xs">
	<button id="sidebar-toggle-footer" class="p-xs border r-s t-size-10" aria-label="<?php echo(localize("footer.alt.sidebar.button")); ?>">
		<i class="fa fa-bars px-xxs" aria-hidden="true"></i>
	</button>
	<p class="flex-fill t-center t-size-10 t-w-500 t-muted">
		<a class="bland-link" href="<?php print(l10n_url_abs('/privacy/')); ?>">
			<?php print(localize('footer.text.privacy')); ?>
		</a>
	</p>
	<a href="<?php print(l10n_url_abs('/')); ?>">
		<img id="logo-footer" src="/resources/NibblePoker/images/logos/v2_full_unshaded_original.svg"
		     alt="<?php echo(localize("footer.alt.logo")); ?>" draggable="false">
	</a>
</footer>
<?php
if($enable_waffle_iron) {
	$emojis = ['🍟', '🧇', '🥔'];
	shuffle($emojis);
	echo('<div class="snowflakes" aria-hidden="true">');
	for($i_waffle = 0; $i_waffle < 12; $i_waffle++) {
		echo('<div class="snowflake"><div class="inner">' . ($emojis)[$i_waffle % 3] . '</div></div>');
	}
	echo('</div>');
}
if($enable_bouneschlupp_mode) {

}

// TODO: Implement those
//if($enable_gallery) {
//	echo('<div id="modal-bkgd" hidden></div>');
//	echo('<div id="modal-container" hidden></div>');
//}
?>