<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
	header('HTTP/1.1 403 Forbidden');
	die();
}

function get_modal_id(string $id): string {
	return "modal-".$id;
}

function add_code_modal(string $id, string $title, string $text) {
	echo('<div class="modal" id="'.get_modal_id($id).'" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content p-0">
			<a href="#" class="close" role="button" aria-label="Close">
				<span aria-hidden="true"><i class="fad fa-times"></i></span>
			</a>
			<h5 class="modal-title my-10 text-center">'.$title.'</h5>
			<hr class="my-15">
			<div class="card p-0 m-0 bg-very-dark mx-15">
				<p id="modal-text-'.$id.'" class="text-monospace mx-15">'.$text.'</p>
			</div>
			<div class="text-right text-center my-15">
				<a href="#" class="btn mr-20" role="button">'.localize("generic.button.close").'</a>
				<a href="#" class="btn btn-primary disabled" role="button">'.localize("generic.button.copy").'</a>
			</div>
		</div>
	</div>
</div>');
}

?>





