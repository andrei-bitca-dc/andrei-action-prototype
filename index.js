const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

const URL = "https://ht9ztjsdg5.execute-api.us-east-1.amazonaws.com/prod/trigger-build";

async function run() {
  const userKeyId = core.getInput("userKeyId");
  const userKeySecret = core.getInput("userKeySecret");
  const testSuiteId = core.getInput("testSuiteId");
  const { payload: { pull_request: { head: { sha } } }, repo: { owner: repoOwner, repo: repoName } } = github.context;
  const response = await axios.post(URL, {
    userKeyId,
    userKeySecret,
    testSuiteId,
    repoOwner,
    repoName,
    sha,
  });
  core.setOutput("buildId", JSON.parse(response.data).buildId);
}

run().then(() => {}).catch(e => core.setFailed(e.message));
