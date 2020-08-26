import tl = require("azure-pipelines-task-lib/task");
import { exec } from "child_process";

async function run() {
  try {
    const inputString: string | undefined = tl.getInput("samplestring", false);
    // if (inputString == "bad") {
    //   tl.setResult(tl.TaskResult.Failed, "Bad input was given");
    //   return;
    // }
    var result = await execShellCommand("git diff HEAD HEAD~ --name-only");
    let i = 0;
    result.split("\n").forEach((line) => {
      console.log(i++);
    });

    console.log("Hello", inputString);
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
