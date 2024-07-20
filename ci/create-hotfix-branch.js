const fs = require('fs');
const simpleGit = require('simple-git');

// Function to get the version from package.json
const getVersion = () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return packageJson.version;
};

// Function to create and push the git branch
const createAndPushBranch = async (version) => {
  const git = simpleGit();
  
  // Branch name
  const branchName = `hotfix-${version}`;

  try {
    // Checkout develop branch
    await git.checkout('master');

    // Pull the latest changes from develop
    await git.pull('origin', 'master');

    // Create new branch
    await git.checkoutBranch(branchName, 'master');

    // Push the new branch to remote
    await git.push('origin', branchName);

    console.log(`Branch ${branchName} created and pushed to remote.`);
  } catch (err) {
    console.error('Error:', err);
  }
};

const version = getVersion();
createAndPushBranch(version);
