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

// Function to check if GitHub CLI is installed
const checkGitHubCLI = async () => {
	try {
		await runCommand('gh --version');
		return true;
	} catch {
		return false;
	}
};

// Function to create a new pull request
const createPullRequest = async (title) => {
	try {
		console.log(`⌛ Creating pull request with title: ${title}`);
		await runCommand(`gh pr create --base develop --title "${title}" --body "Feature development is finished, please review the PR and merge it with development."`);
		console.log('✅ Pull request created successfully.');
	} catch (error) {
		console.error(error);
	}
};

// Main function to run the script
const main = async () => {
	const prTitle = process.argv[2] || "Feature finished";
	
	const isCLIInstalled = await checkGitHubCLI();
	if (!isCLIInstalled) {
		console.error('🚫 Creating pull request failed!\nPlease Install GitHub CLI(gh) on your system.\nView installation instructions:\nhttps://github.com/cli/cli#installation');
		console.info('📝 After Install login into it with `gh auth login`')
		process.exit(1);
	}
	
	await createPullRequest(prTitle);
};

main();
