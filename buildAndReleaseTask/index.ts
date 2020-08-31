import tl = require("azure-pipelines-task-lib/task");
import {
  ConvertStringToProjectChangeModel,
  ProjectChangeModel,
} from "./projectChangeModel";
import { execShellCommand } from "./execShellCommand";

async function run() {
  try {
    const inputProjects: string | undefined = tl.getInput("projects", true);

    if (inputProjects === undefined) {
      return;
    }
    const projects = ConvertStringToProjectChangeModel(inputProjects);
    const gitLines = (
      await execShellCommand("git diff HEAD HEAD~ --name-only")
    ).split("\n");

    const projectsThatAreChanged = projects.filter((project) =>
      project.IsProjectChanged(gitLines)
    );

    projectsThatAreChanged.forEach((project) =>
      tl.setVariable(project.GetProjectName(), "True")
    );
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
