import { observable, action, computed, autorun } from "mobx";
import { Project } from "../Models/Project";
import { Servo } from "../Models/Servo";
import { SnackbarManager } from "../Helpers/SnackbarManager/SnackbarManager";

export class ProjectStore {
  @observable
  projectName: string = '';

  @observable
  isDirty: boolean = false;

  @observable
  rig: Servo[] = [];

  @action
  addProject = (project: Project) => {
    this.projectName = project.projectName;
    this.rig = project.rig;
  }

  @action
  getProject = () => {
    if (!this.projectName) return null;
    let project = new Project({ projectName: this.projectName, rig: this.rig });
    return project;
  }

  @action
  addProjectName = (projectName: string) => {
    this.projectName = projectName;
  }

  @action
  changeDirty = (dirty: boolean) => {
    this.isDirty = dirty;
  }

  @action
  setRig = (servos: Servo[]) => {
    if (!this.projectName) return SnackbarManager.Instance.addError('No project to add rig to');
    this.rig = servos;
    this.isDirty = true;
  }

  @action
  getRig = () => {
    if (!this.rig)
      this.rig = [];
    return this.rig;
  }


  @computed get projectExists() {
    return this.projectName != null && this.projectName !== '';
  }
}



// @ts-ignore
var store = window.store = new ProjectStore();

export default store;

autorun(() => {
  console.log('project', store.rig.length);
})