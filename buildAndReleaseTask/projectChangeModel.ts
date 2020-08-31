export class ProjectChangeModel {
  private projectName: string;
  private paths: string[];

  constructor(projectName: string, paths: string[]) {
    this.projectName = projectName;
    this.paths = paths;
  }

  public GetProjectName(): string {
    return this.projectName;
  }

  public IsProjectChanged(paths: string[]): boolean {
    for (var path in paths) {
      if (this.IsPathForProject(path)) {
        return true;
      }
    }
    return false;
  }

  private IsPathForProject(path: string): boolean {
    for (var x in this.paths) {
      if (path.indexOf(x) !== -1) {
        return true;
      }
    }
    return false;
  }
}

export function ConvertStringToProjectChangeModel(
  input: string
): ProjectChangeModel[] {
  const projectWithText = input.split(";");
  const projects: ProjectChangeModel[] = [];

  projectWithText.forEach((project) => {
    const projectNameSplit = project.split(":");
    const projectName = projectNameSplit[0];
    const allProjectPaths = projectNameSplit[1];

    const paths = allProjectPaths.split(",");

    projects.push(new ProjectChangeModel(projectName, paths));
  });

  return projects;
}
