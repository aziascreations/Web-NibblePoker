<?php
header('Content-Type: text/xml; charset=utf-8');
echo("<?xml version='1.0'?>
<module>
	<name>VtigerVulnPlugin</name>
	<label>VtigerVulnPlugin</label>
	<parent>Tools</parent>
	<version>1.01</version>
	<dependencies>
		<vtiger_version>7.0.0</vtiger_version>
		<vtiger_max_version>7.*</vtiger_max_version>
	</dependencies>
	<license>
		<file>LICENSE.txt</file>
	</license>

	<actions>
		<action>
			<name><![CDATA[Import]]></name>
			<status>enabled</status>
		</action>
		<action>
			<name><![CDATA[Export]]></name>
			<status>disabled</status>
		</action>
	</actions>
</module>");
?>