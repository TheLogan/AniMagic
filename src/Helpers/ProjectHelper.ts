import { Project } from "../Models/Project";
import { getSavesPath } from "./FileHelper";
import { SnackbarManager } from "./SnackbarManager/SnackbarManager";
const electron = window.require('electron');
let fs = electron.remote.require('fs');
let path = electron.remote.require('path');

export class ProjectHelper {
  async saveProject(project: Project) {
    try {
      if (!project) return false;
      let filepath = path.join(getSavesPath(), project.projectName + '.animagic');
      fs.writeFileSync(filepath, JSON.stringify(project));
      return true;
    } catch (error) {
      return false;
    }
  }

  async loadProjects() {
    try {
      let dirname = getSavesPath();
      let filenames = fs.readdirSync(dirname);
      let projects: Project[] = [];
      for (const fileName of filenames) {
        let fileStr = fs.readFileSync(path.join(dirname, fileName), 'utf-8');
        projects.push(JSON.parse(fileStr));
      }
      return projects;
    } catch (error) {
      SnackbarManager.Instance.addError('Could not load project files')
    }
  }
}