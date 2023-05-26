<?php
echo(getMainHeader(localize("tool.svg-to-png.input.title"), null, null, null,
	true, "bkgd-math", 3, false, false, true));

echo('<table class="table-v-center table-p-xs mt-xs"><tr><td>');

echo('<label for="tool-svg-to-png-files" hidden>' . localize("tool.svg-to-png.files") . ':</label>');
echo('<input type="file" id="tool-svg-to-png-files" name="tool-svg-to-png-files" class="d-none" accept=".svg,image/svg+xml" multiple>');

echo('<p id="tool-svg-to-png-text-none" class="t-italic px-xxs">' . localize("tool.svg-to-png.text.no.files") . '</p>');
echo('<p id="tool-svg-to-png-text-good" class="t-italic px-xxs" hidden>' . localize("tool.svg-to-png.text.has.files") . '</p>');

echo('</td></tr><tr><td>');

echo('<button id="tool-svg-to-png-btn-select" class="p-mxs r-s border b-light primary">');
echo('<span class="text-monospace"><i class="fad fa-file-search"></i>&nbsp;&nbsp;');
echo(localize("tool.svg-to-png.select.files"));
echo('</span></button>');

echo('</td></tr></table>');


echo(getMainHeader(localize("tool.svg-to-png.options.title"), null, null, null,
	true, "bkgd-math", 3, false, false, true));

echo('<table class="table-v-center table-p-xs mt-xs"><tr><td>');
echo('<label for="tool-svg-to-png-width">' . localize("tool.svg-to-png.width") . ': </label>');
echo('</td><td>');
echo('<input type="number" id="tool-svg-to-png-width" name="tool-svg-to-png-width" class="border p-xs r-s" value="256" min="1" max="8192"/>');
echo('</td></tr><tr><td>');
echo('<label for="tool-svg-to-png-height">' . localize("tool.svg-to-png.height") . ': </label>');
echo('</td><td>');
echo('<input type="number" id="tool-svg-to-png-height" name="tool-svg-to-png-height" class="border p-xs r-s" value="256" min="1" max="8192"/>');
echo('</td></tr></table>');


echo(getMainHeader(localize("tool.svg-to-png.output.title"), null, null, null,
	true, "bkgd-math", 3, false, false, true));

echo('<div class="p-s pt-m">');
echo('<button id="tool-svg-to-png-btn-convert" class="p-mxs r-s border b-light primary">');
echo('<span class="text-monospace"><i class="fad fa-file-search"></i>&nbsp;&nbsp;');
echo(localize("tool.svg-to-png.convert"));
echo('</span></button>');

// TODO: Add 2nd button with aspect ration preservation

echo('</div>');

echo('<br>');

echo('<div class="p-s">');
echo('<canvas id="conversion-canvas" width="256" height="256" class="border r-l d-none"></canvas>');
echo('</div>');

?>