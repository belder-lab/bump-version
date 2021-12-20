import * as core from "@actions/core";
import * as github from "@actions/github";

function isJsError(error: unknown): error is Error {
  if (error instanceof Error) {
    return true;
  }

  return false;
}

// https://github.community/t/triggering-by-other-repository/16163
try {
  const nameToGreet = core.getInput("who-to-greet");
  const time = new Date().toTimeString();

  core.setOutput("time", time);

  const payload = JSON.stringify(github.context.payload, undefined, 2);
} catch (error) {
  if (isJsError(error)) {
    core.setFailed(error.message);
  } else {
    core.setFailed(`${error}`);
  }
}
