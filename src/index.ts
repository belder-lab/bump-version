import * as core from "@actions/core";
import * as github from "@actions/github";
import * as exec from "@actions/exec";
import fs from "fs";
import { bumpVersion } from "./bumpVersion";

function isJsError(error: unknown): error is Error {
  if (error instanceof Error) {
    return true;
  }

  return false;
}

export function updateFile(file: string, projectName: string, version: string) {
  const fileData = fs.readFileSync(file, { encoding: "utf-8" });
  fs.writeFileSync(file, bumpVersion(projectName, version, fileData));
}

export async function commitChanges(projectName: string, version: string) {
  const branch = 'main';
  const author = "bump-bot";
  const email =  "bump@fastup-kit";
  core.info("Committing file changes");
  await exec.exec("git", ["config", "--global", "user.name", author]);
  await exec.exec("git", ["config", "--global", "user.email", email]);
  await exec.exec("git", [
    "commit",
    "-am",
    `bump ${projectName}@${version}`,
  ]);
  await exec.exec("git", ["push", "-u", "origin", `HEAD:${branch}`]);
}

// https://github.community/t/triggering-by-other-repository/16163
try {
  const file = core.getInput("file");
  const projectName = core.getInput("name");
  const version = core.getInput("file");

  updateFile(file, projectName, version);
  commitChanges(projectName, version);
} catch (error) {
  if (isJsError(error)) {
    core.setFailed(error.message);
  } else {
    core.setFailed(`${error}`);
  }
}
