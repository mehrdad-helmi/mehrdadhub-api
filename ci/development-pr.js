/* eslint-disable */

const { exec } = require('child_process');
const os = require('os');

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

// Function to check if GitHub CLI is installed
const checkGitHubCLI = async () => {
	try {
		await runCommand('gh --version');
		return true;
	} catch {
		return false;
	}
};

// Function to install GitHub CLI based on OS
const installGitHubCLI = async () => {
	const platform = os.platform();
	try {
		if (platform === 'darwin') {
			console.log('⌛ Installing GitHub CLI on macOS...');
			await runCommand('brew install gh');
		} else if (platform === 'win32') {
			console.log('⌛ Installing GitHub CLI on Windows...');
			await runCommand('winget install --id GitHub.cli');
		} else {
			throw new Error('🚫 Unsupported OS for automatic GitHub CLI installation.');
		}
		console.log('✅ GitHub CLI installed successfully.');
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

// Function to create a new pull request
const createPullRequest = async (title) => {
	try {
		console.log(`⌛ Creating pull request with title: ${title}`);
		await runCommand(`gh pr create --base development --title "${title}" --body "Feature development is finished, please review the PR and merge it with development."`);
		console.log('✅ Pull request created successfully.');
	} catch (error) {
		console.error(error);
	}
};

// Main function to run the script
const main = async () => {
	const prTitle = process.argv[2];
	if (!prTitle) {
		console.error('✏️ Please provide a pull request title.');
		process.exit(1);
	}
	
	const isCLIInstalled = await checkGitHubCLI();
	if (!isCLIInstalled) {
		await installGitHubCLI();
	}
	
	await createPullRequest(prTitle);
};

main();
