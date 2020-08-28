import tl = require("azure-pipelines-task-lib/task");
import { exec } from "child_process";

async function run() {
  try {
    const inputString: string | undefined = tl.getInput("samplestring", false);

    console.log(inputString);
    if (inputString === undefined) {
      return;
    }
    var projectWithText = inputString.split("\n");

    projectWithText.forEach((project) => {
      var x = project.split(":");
      var name = x[0];
      var fullPahts = x[1];

      var paths = fullPahts.split(",");
      console.log("Project: " + name);
      paths.forEach((path) => console.log(" - " + path));
    });

    var result = await execShellCommand("git diff HEAD HEAD~ --name-only");
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

function execShellCommand(cmd: string): Promise<string> {
  const exec = require("child_process").exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error: any, stdout: any, stderr: any) => {
      if (error) {
        reject(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

run();
