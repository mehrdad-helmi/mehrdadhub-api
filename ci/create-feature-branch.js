const { exec } = require('child_process');

// Function to execute shell commands
const runCommand = (command) => {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(`Error: ${error.message}`);
			} else if (stderr) {
				reject(`Info: ${stderr}`);
			} else {
				resolve(stdout);
			}
		});
	});
};

// Main function to create and checkout new branch
const createAndCheckoutBranch = async (branchName) => {
	try {
		console.log(`⌛ Creating new branch: ${branchName}`);
		await runCommand(`git branch ${branchName}`);
		console.log(`⌛ Checking out to the branch`);
		await runCommand(`git checkout ${branchName}`);
		console.log(`✅ Switched to branch '${branchName}'`);
	} catch (error) {
		console.error(error);
	}
};

// Get the branch name from command line arguments
const branchName = process.argv[2];

if (!branchName) {
	console.error('Please provide a name for the feature branch.');
	process.exit(1);
}

createAndCheckoutBranch(branchName);
