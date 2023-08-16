<?php
echo(getMainHeader(localize("tool.formula-wizard.introduction.title"), null, null, null,
	true, "bkgd-math", 3, false, false, true));
?>
<div class="m-s mt-xs">
	<p>Welcome to the <i>Formula Wizard</i> !</p>
	<p class="mt-xs">This tool was made ???.</p>
	<p class="mt-xs">
		If any formula you need is missing, you can email me at
		<a href="mailto:herwin.bozet@gmail.com.com?subject=Formula%20Wizard%20Request">herwin.bozet@gmail.com</a>
		and I'll look into it.</p>
	<p>I'll look into it ASAP and should take less than a couple of days.</p>
</div>


<?php
echo(getMainHeader(localize("tool.formula-wizard.output.graph"), null, null, null,
	true, "bkgd-math", 3, false, false, true));
?>
<div class="m-s mt-xs">
	<p>TODO</p>
</div>


<?php
echo(getMainHeader(localize("tool.formula-wizard.workbench"), null, null, null,
	true, "bkgd-math", 3, false, false, true));
?>

<template id="template-context-component">
	<div class="my-xs ml-xs context-component-form">
		<table class="border stylish table-v-center">
			<tr>
				<td>
					<label for="fw-context-component-id" class="mx-xs t-center">Id:</label>
				</td>
				<td>
					<input id="fw-context-component-id" type="text" class="p-mxs w-full">
				</td>
				<td>
					<button id="fw-context-component-delete" class="error p-mxs px-xs"
					        title="<?php echo(localize("tool.formula-wizard.button.context.add")); ?>">
						<i class="fad fa-trash-alt"></i>
					</button>
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-context-component-type" class="mx-xs t-center">Type:</label>
				</td>
				<td colspan="2">
					<select id="fw-context-component-type" class="w-full p-mxs">
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-context-component-manual-value" class="mx-xs t-center">Value:</label>
				</td>
				<td colspan="2">
					<input id="fw-context-component-manual-value" type="number" class="p-mxs w-full">
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-context-component-manual-values" class="mx-xs t-center">Values:</label>
				</td>
				<td colspan="2">
					<input id="fw-context-component-manual-values" type="text" class="p-mxs w-full">
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-context-component-range-from" class="mx-xs t-center">From:</label>
				</td>
				<td colspan="2">
					<input id="fw-context-component-range-from" type="number" class="p-mxs w-full">
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-context-component-range-to" class="mx-xs t-center">To:</label>
				</td>
				<td colspan="2">
					<input id="fw-context-component-range-to" type="number" class="p-mxs w-full">
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-context-component-range-step" class="mx-xs t-center">Step:</label>
				</td>
				<td colspan="2">
					<input id="fw-context-component-range-step" type="number" class="p-mxs w-full">
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-context-component-set" class="mx-xs t-center">Set:</label>
				</td>
				<td colspan="2">
					<select id="fw-context-component-set" class="w-full p-mxs">
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-context-component-unit" class="mx-xs t-center">Unit:</label>
				</td>
				<td colspan="2">
					<select id="fw-context-component-unit" class="w-full p-mxs">
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-context-component-scale" class="mx-xs t-center">Scale:</label>
				</td>
				<td colspan="2">
					<select id="fw-context-component-scale" class="w-full p-mxs">
					</select>
				</td>
			</tr>
		</table>
	</div>
</template>

<template id="template-workbench-formula-value">
	<div class="my-xs ml-xs formula-value-input-form">
		<table class="border stylish table-v-center">
			<tr>
				<td colspan="2">
					<p id="fw-workbench-formula-value-name" class="p-xxs t-center t-w-500">${value.name}</p>
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-workbench-formula-value-id" class="mx-xs t-center">Id:</label>
				</td>
				<td>
					<input id="fw-workbench-formula-value-id" type="text" class="p-mxs w-full">
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-workbench-formula-value-link" class="mx-xs t-center">Link:</label>
				</td>
				<td>
					<select id="fw-workbench-formula-value-link" class="p-mxs w-full">
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-workbench-formula-value-test-value" class="mx-xs t-center">Value:</label>
				</td>
				<td>
					<input id="fw-workbench-formula-value-test-value" type="number" class="p-mxs w-full">
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-workbench-formula-value-test-value-set" class="mx-xs t-center">Scale:</label>
				</td>
				<td>
					<select id="fw-workbench-formula-value-test-value-set" class="p-mxs w-full">
					</select>
				</td>
			</tr>
			<tr>
				<td>
					<label for="fw-workbench-formula-value-test-scale" class="mx-xs t-center">Scale:</label>
				</td>
				<td>
					<select id="fw-workbench-formula-value-test-scale" class="p-mxs w-full">
					</select>
				</td>
			</tr>
		</table>
	</div>
</template>

<template id="template-workbench-formula">
	<div class="border border-t-0 border-l-0 border-r-0">
		<table>
			<tr>
				<td class="border border-t-0 border-l-0 border-b-0 p-xs mobile-hide">
					<p class="t-size-14"><i class="fad fa-grip-vertical"></i></p>
				</td>
				<td class="w-full">
					<p id="fw-workbench-formula-name" class="p-xxs t-w-600 t-center border border-t-0 border-l-0 border-r-0">${formula.name}</p>
					<div class="fw-formula-io">
						<div class="p-xxs">
							<p class="t-w-500 t-italic">
								<?php echo(localize("tool.formula-wizard.workbench.formula.inputs")); ?>
							</p>
							<div id="fw-workbench-formula-inputs" class="fw-workbench-io-grid">
							
							</div>
						</div>
						<div class="p-xxs border border-l-0 border-r-0">
							<p class="t-w-500 t-italic">
								<?php echo(localize("tool.formula-wizard.workbench.formula.outputs")); ?>
							</p>
							<div id="fw-workbench-formula-outputs" class="fw-workbench-io-grid">
							
							</div>
						</div>
					</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<div class="m-s mt-xs">
	<div class=" border r-s bkgd-grid w-full">
		<div class="border border-t-0 border-l-0 border-r-0">
			<table>
				<tr>
					<td class="border border-t-0 border-l-0 border-b-0 p-xs mobile-hide">
						<p class="t-size-14"><i class="fad fa-grip-vertical"></i></p>
					</td>
					<td class="w-full">
						<p class="p-xxs t-w-600 t-center border border-t-0 border-l-0 border-r-0 fw-workbench-name">
							<?php echo(localize("tool.formula-wizard.workbench.context")); ?>
						</p>
						<div class="fw-formula-io">
							<div class="fw-formula-components p-xxs">
								<p class="t-w-500 t-italic">
									<?php echo(localize("tool.formula-wizard.workbench.context.components")); ?>
								</p>
								
								<!-- The graph's axis will point to these - Not the other way around -->
								
								<p id="fw-text-context-middle" class="my-xs ml-xs">
									<?php echo(localize("tool.formula-wizard.workbench.context.placeholder")); ?>
								</p>
								
								<div class="my-xs ml-xs">
									<button id="fw-button-add-context" class="success p-mxs px-xs border r-s"
									        title="<?php echo(localize("tool.formula-wizard.button.context.add")); ?>">
										<i class="fad fa-plus"></i>
									</button>
									<!--<button id="fw-button-debug-context" class="warning p-mxs px-xs border r-s"
									        title="<?php echo(localize("tool.formula-wizard.button.context.debug")); ?>">
										<i class="fad fa-bug"></i>
									</button>-->
								</div>
							</div>
						</div>
					</td>
				</tr>
			</table>
		</div>
		
		<!--<div class="border border-t-0 border-l-0 border-r-0">
			<table>
				<tr>
					<td class="border border-t-0 border-l-0 border-b-0 p-xs mobile-hide">
						<p class="t-size-14"><i class="fad fa-grip-vertical"></i></p>
					</td>
					<td class="w-full">
						<p class="p-xxs t-w-600 t-center border border-t-0 border-l-0 border-r-0 fw-workbench-name">${formula.name}</p>
						<div class="fw-formula-io">
							<div class="fw-formula-inputs p-xxs">
								<p class="t-w-500 t-italic">
									<?php echo(localize("tool.formula-wizard.workbench.formula.inputs")); ?>
								</p>
								<div class="border r-s d-inline-block bkgd-surround my-xs ml-xs">
									<label for="test-123" class="mx-xs t-center">Ohms (Ω)</label>
									<input id="test-123" type="text" class="p-mxs rr-s border border-t-0 border-b-0 border-r-0">
								</div>
								
								<div class="my-xs ml-xs formula-value-input-form">
								<table class="border stylish table-v-center">
									<tr>
										<td colspan="2">
											<p class="p-xxs t-center t-w-500">Current (A)</p>
										</td>
									</tr>
									<tr>
										<td>
											<label for="test-123" class="mx-xs t-center">Link:</label>
										</td>
										<td>
											<select id="fw-context-component-unit" class="p-mxs w-full">
											</select>
										</td>
									</tr>
									<tr>
										<td>
											<label for="fw-context-component-unit" class="mx-xs t-center">Value:</label>
										</td>
										<td>
											<input id="fw-context-component-unit" type="number" class="p-mxs w-full">
										</td>
									</tr>
									<tr>
										<td>
											<label for="fw-context-component-scale" class="mx-xs t-center">Scale:</label>
										</td>
										<td>
											<select id="fw-context-component-scale" class="p-mxs w-full">
											</select>
										</td>
									</tr>
								</table>
								</div>
								
								<button id="fw-context-component-delete" class="primary p-mxs px-xs border r-s"
								        title="<?php echo(localize("tool.formula-wizard.workbench.formula.value.expand")); ?>">
									<i class="fad fa-vial"></i>
								</button>
								
							</div>
							
							<div class="fw-formula-outputs p-xxs border border-l-0 border-r-0">
								<p class="t-w-500 t-italic">
									<?php echo(localize("tool.formula-wizard.workbench.formula.outputs")); ?>
								</p>
								
								<div class="border r-s d-inline-block bkgd-surround my-xs ml-xs">
									<label for="test-123" class="mx-xs t-center">Volts (V)</label>
									<input id="test-123" type="text" class="p-mxs rr-s border border-t-0 border-b-0 border-r-0" disabled>
								</div>
								
								<br>
								
								<div class="border r-s d-inline-block bkgd-surround my-xs ml-xs">
									<label for="test-123" class="mx-xs t-center">Watts (W)</label>
									<input id="test-123" type="text" class="p-mxs rr-s border border-t-0 border-b-0 border-r-0">
								</div>
							</div>
						</div>
					</td>
				</tr>
			</table>
		</div>-->
		
		<a id="fw-workbench-formula-spawn"></a>
		
		<!-- <div class="border border-t-0 border-l-0 border-r-0">
			<table>
				<tr>
					<td class="border border-t-0 border-l-0 border-b-0 p-xs mobile-hide">
						<p class="t-size-14"><i class="fad fa-grip-vertical"></i></p>
					</td>
					<td class="w-full">
						<p class="p-xxs t-w-600 t-center border border-t-0 border-l-0 border-r-0 fw-workbench-name">${formula.graph}</p>
						<div class="fw-formula-io">
							<div class="w-formula-graphing p-xxs">
								<p class="t-w-500 t-italic">Inputs:</p>
								
								<div class="border r-s d-inline-block bkgd-surround my-xs ml-xs">
									<label for="test-123" class="mx-xs t-center">Style</label>
									<input id="test-123" type="text" class="p-mxs rr-s border border-t-0 border-b-0 border-r-0">
								</div>
								
								<br>
								
								<div class="border r-s d-inline-block bkgd-surround my-xs ml-xs">
									<label for="test-123" class="mx-xs t-center">X/Y/Z-Axis (From context or calculated)</label>
									<input id="test-123" type="text" class="p-mxs rr-s border border-t-0 border-b-0 border-r-0">
								</div>
								
							
							</div>
						</div>
					</td>
				</tr>
			</table>
		</div>-->
		<!-- ON/OFF -> Add extra ranges as sliders, or refuse to proceed -->
		<!-- Highlights, limits, extra styles, ... -->
		
		<div id="fw-debug-root" class="border border-t-0 border-l-0 border-r-0" hidden>
			<table>
				<tr>
					<td class="border border-t-0 border-l-0 border-b-0 p-xs mobile-hide">
						<p class="t-size-14"><i class="fad fa-grip-vertical"></i></p>
					</td>
					<td class="w-full">
						<p class="p-xxs t-w-600 t-center border border-t-0 border-l-0 border-r-0 fw-workbench-name">
							<?php echo(localize("tool.formula-wizard.workbench.debugging")); ?>
						</p>
						<div class="fw-formula-io">
							<div class="fw-formula-components p-xxs">
								<div class="my-xs ml-xs">
									<button id="fw-button-debug-linkAndIds" class="warning p-mxs px-xs border r-s">
										<i class="fad fa-bug"></i> <?php echo(localize("tool.formula-wizard.button.debug.testLinkAndIds")); ?>
									</button>
								</div>
							</div>
						</div>
					</td>
				</tr>
			</table>
		</div>
		
		<div class="p-xxs">
			<p class="t-center t-muted t-size-8">Selected formulas will appear here, all seems good.</p>
		</div>
	</div>
</div>

<?php
echo(getMainHeader(localize("tool.formula-wizard.categories"), null, "<span id='fw-catalog-formula-count'></span>", null,
	true, "bkgd-math", 3, false, false, true));
?>

<!-- Template used for every formula -->
<template id="template-formula-available">
	<div class="border border-b-0 border-l-0 border-r-0 p-xxs px-s">
		<p class="t-w-500 t-italic t-underline">${formula.name}</p>
		<div class="fw-variants">
			${formula.variants}
		</div>
	</div>
</template>

<!-- Template used for every formula variant -->
<template id="template-formula-available-variant">
	<button class="t-size-15 primary p-xxs border r-m">
		${formula.variant.mathml}
	</button>
</template>

<div class="m-s mt-xs">
	<details class="border rt-s bkgd-grid" id="fw-catalog-category-electricity" open>
		<summary class="t-w-600 p-xs"><i class="fad fa-bolt mr-xs"></i><?php echo(localize("tool.formula-wizard.categories.electricity")); ?></summary>
	</details>
	<details class="border border-t-0 bkgd-grid p-xs" id="fw-catalog-category-converter">
		<summary class="t-w-600"><i class="fad fa-sync-alt mr-xs"></i><?php echo(localize("tool.formula-wizard.categories.convert")); ?></summary>
	</details>
	<details class="border border-t-0 bkgd-grid p-xs" id="fw-catalog-category-physics">
		<summary class="t-w-600"><i class="fad fa-apple-alt mr-xs"></i></i><?php echo(localize("tool.formula-wizard.categories.physics")); ?></summary>
	</details>
	<details class="border border-t-0 bkgd-grid p-xs" id="fw-catalog-category-chemistry">
		<summary class="t-w-600"><i class="fad fa-flask mr-xs"></i><?php echo(localize("tool.formula-wizard.categories.chemistry")); ?></summary>
	</details>
	<details class="border border-t-0 bkgd-grid p-xs" id="fw-catalog-category-radioactivity">
		<summary class="t-w-600"><i class="fad fa-radiation mr-xs"></i><?php echo(localize("tool.formula-wizard.categories.radioactivity")); ?></summary>
	</details>
</div>

<?php
echo(getMainHeader(localize("tool.formula-wizard.source"), null, null, null,
	true, "bkgd-math", 3, false, false, true));
?>

<div id="formula-wizard.test"></div>
