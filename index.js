const core = require('@actions/core');
const axios = require('axios');

const URL = "https://ht9ztjsdg5.execute-api.us-east-1.amazonaws.com/prod/trigger-build";

async function run() {
  const userKeyId = core.getInput('userKeyId');
  const userKeySecret = core.getInput('userKeySecret');
  const testSuiteId = core.getInput('testSuiteId');
  const response = await axios.post(URL, {
    userKeyId,
    userKeySecret,
    testSuiteId,
  });
  core.setOutput("buildId", JSON.parse(response.data).buildId);
}

run().then(() => {}).catch(e => core.setFailed(e.message));
