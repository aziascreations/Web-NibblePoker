const fs = require("fs");
const path = require("path");


// Grabbing launch arguments
if(process.argv.length !== 5) {
	console.error('!> Invalid syntax !');
	console.error('Use: node fix-import-path.js <input_file> <import_name> <replacement_file>');
	process.exit(1);
}

const inputFile = process.argv[2];
const inputImportName = process.argv[3];
const inputReplacement = process.argv[4];

let filesToProcess = inputFile.split(";");


// Fixing the files
for(const fileToProcess of filesToProcess) {
	console.log("> Replacing '"+inputImportName+"' with '"+inputReplacement+"' in '"+fileToProcess+"' ...");
	
	const inputFileLines = fs.readFileSync(fileToProcess).toString().split("\n");
	
	if(inputFileLines == null) {
		console.error('!> Failed to read lines !');
		process.exit(2);
	}
	
	const outputFileLines = [];
	
	for(let inputLine of inputFileLines) {
		if(inputLine.startsWith("import") && inputLine.includes("from")) {
			inputLine = inputLine.split(/['"]+/);
			
			// inputLine is now an array !
			//console.log(inputLine);
			
			inputLine[inputLine.length - 2] = inputLine[inputLine.length - 2].replace(
				inputImportName, inputReplacement
			);
			
			inputLine = inputLine.join("\"");
		}
		outputFileLines.push(inputLine);
	}
	
	try {
		fs.unlinkSync(fileToProcess);
		fs.writeFileSync(fileToProcess, outputFileLines.join("\n"), "utf8");
	} catch(err) {
		console.error(err);
	}
}
