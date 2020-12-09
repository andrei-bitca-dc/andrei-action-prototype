const core = require('@actions/core');
const github = require('@actions/github');

try {
  const myToken = core.getInput('myToken');
  const octokit = github.getOctokit(myToken);
  const checkRun = octokit.checks.create({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    name: "Automator Action",
    head_sha: github.context.payload.head,
  });
  core.setOutput("checkRunId", checkRun.id);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
