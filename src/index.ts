import * as core from "@actions/core";
import github from "@actions/github";

function isJsError(error: unknown): error is Error {
  if (error instanceof Error) {
    return true;
  }

  return false;
}

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  // console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  if (isJsError(error)) {
    core.setFailed(error.message);
  } else {
    core.setFailed(`${error}`);
  }
}
