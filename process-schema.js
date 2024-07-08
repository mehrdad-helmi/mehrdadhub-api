// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

/**
 * Function to convert camelCase to "snake_case"
 * @param str
 * @returns {*}
 */
function camelToSnakeCase(str) {
	return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Function to process the prisma file
 * @param filePath
 * @returns {string}
 */
function processPrismaFile(filePath) {
	const data = fs.readFileSync(filePath, 'utf8');
	const lines = data.split('\n');
	let insideModel = false;

	const processedLines = lines.map((line, index) => {
		const prevLine = index === 0 ? '' : lines[index - 1];
		// Check for model start and end
		if (line.trim().startsWith('model ')) insideModel = true;
		else if (line.trim() === '}') insideModel = false;

		const isRelationField =
			prevLine.trim().includes('one to many') ||
			prevLine.trim().includes('one to one') ||
			prevLine.trim().includes('many to many') ||
			prevLine.trim().includes('many to one');

		if (
			insideModel &&
			line.trim() &&
			!line.trim().startsWith('//') &&
			!line.trim().startsWith('@') &&
			!line.includes('@relation') &&
			!isRelationField &&
			!/^[A-Z]/.test(line.trim().charAt(0))
		) {
			const parts = line.trim().split(/\s+/);
			if (parts.length >= 2) {
				const fieldName = parts[0];
				const snakeCaseName = camelToSnakeCase(fieldName);
				if (fieldName !== snakeCaseName)
					return `${line.trim()} @map("${snakeCaseName}")`;
			}
		}

		return line;
	});

	return processedLines.join('\n');
}

const prismaDraftSchema = './prisma/schema-draft.prisma';
const updatedSchema = processPrismaFile(prismaDraftSchema);
// Write the updated schema to a new file
const outputFilePath = './prisma/schema.prisma'; // Name of the new file
fs.writeFileSync(outputFilePath, updatedSchema);

// Remove the draft file
fs.unlinkSync(prismaDraftSchema);

console.log(` ✅  Updated schema written to ${outputFilePath}`);
