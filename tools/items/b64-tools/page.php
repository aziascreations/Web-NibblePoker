<?php
echo(getMainHeader(localize("tool.b64-tools.text"), null, null, null,
	true, "bkgd-math", 3, false, false, true));
?>
<div class="p-xs pb-0">
	<label for="tool-b64-tools-ta-text"></label>
	<textarea id="tool-b64-tools-ta-text" class="my-xs w-full no-resize border r-s" name="" rows="10"></textarea>
	
	<?php
	echo('<button id="tool-b64-tools-btn-convert-text" class="p-mxs r-s border b-light primary">');
	echo('<span class="text-monospace"><i class="fad fa-file-search"></i>&nbsp;&nbsp;');
	echo(localize("tool.b64-tools.actions.convert.text"));
	echo('</span></button>');
	
	echo('<button id="tool-b64-tools-btn-clear-text" class="p-mxs r-s border b-light primary">');
	echo('<span class="text-monospace"><i class="fad fa-file-search"></i>&nbsp;&nbsp;');
	echo(localize("tool.b64-tools.actions.clear.text"));
	echo('</span></button>');
	
	echo('<div class="f-right">');
	echo('<label for="tool-b64-tools-encoding" class="mr-xs">Encoding:</label>');
	echo('<select id="tool-b64-tools-encoding">');
	echo('<option value="utf8">UTF-8</option>');
	echo('<option value="unicode">Unicode</option>');
	echo('<option value="ascii">ASCII</option>');
	echo('</select>');
	echo('</div>');
	?>
</div>

<?php
echo(getMainHeader(localize("tool.b64-tools.base64"), null, null, null,
	true, "bkgd-math", 3, false, false, true));
?>
<div class="p-xs pb-0">
	<label for="tool-b64-tools-ta-b64"></label>
	<textarea id="tool-b64-tools-ta-b64" class="my-xs w-full no-resize border r-s" name="" rows="10"></textarea>
	<?php
	echo('<button id="tool-b64-tools-btn-convert-b64" class="p-mxs r-s border b-light primary">');
	echo('<span class="text-monospace"><i class="fad fa-file-search"></i>&nbsp;&nbsp;');
	echo(localize("tool.b64-tools.actions.convert.b64"));
	echo('</span></button>');
	
	echo('<button id="tool-b64-tools-btn-clear-b64" class="p-mxs r-s border b-light primary">');
	echo('<span class="text-monospace"><i class="fad fa-file-search"></i>&nbsp;&nbsp;');
	echo(localize("tool.b64-tools.actions.clear.base64"));
	echo('</span></button>');
	
	echo('<div class="f-right">');
	echo('<input class="border r-s my-0" type="checkbox" id="tool-b64-tools-checkbox-padding" name="vehicle1" value="Bike">');
	echo('<label for="tool-b64-tools-checkbox-padding">&nbsp;Add padding</label>');
	echo('</div>');
	?>
</div>

<?php
echo(getMainHeader(localize("tool.b64-tools.actions"), null, null, null,
	true, "bkgd-math", 3, false, false, true));

echo('<div class="px-xs pt-s">');

echo('<button id="tool-b64-tools-btn-clear-all" class="p-mxs r-s border b-light primary">');
echo('<span class="text-monospace"><i class="fad fa-file-search"></i>&nbsp;&nbsp;');
echo(localize("tool.b64-tools.actions.clear.all"));
echo('</span></button>');

echo('</div>');
?>
