const fs = require('fs');

if (process.argv.length < 3) {
	console.log('Usage: node php-relinker.js <input_php_file>');
	process.exit(1);
}

const inputFilePath = process.argv[2];
console.log(">", inputFilePath);

function replaceExtension(match) {
	return match.replace('.php', '.min.php');
}

try {
	const content = fs.readFileSync(inputFilePath, 'utf-8');
	const modifiedContent = content.replace(/include.*\.php/g, replaceExtension);
	fs.writeFileSync(inputFilePath, modifiedContent, 'utf-8');
} catch (error) {
	if (error.code === 'ENOENT') {
		console.log('> Error: File not found.');
	} else {
		console.error('> Error: An error occurred =>', error.message);
	}
}
