import { observable, action, computed, autorun } from "mobx";
import { Project } from "../Models/Project";
import { Servo } from "../Models/Servo";
import { SnackbarManager } from "../Helpers/SnackbarManager/SnackbarManager";
import { BlendShape } from "../Models/BlendShape";
import { BlendShapeServo } from "../Models/BlendShapeServo";

export class ProjectStore {
  @observable
  projectName: string = '';

  @observable
  isDirty: boolean = false;

  @observable
  rig: Servo[] = [];

  @observable.deep
  blendShapes: BlendShape[] = [];

  @action
  addProject = (project: Project) => {
    this.projectName = project.projectName;
    this.rig = project.rig;
    this.blendShapes = project.blendShapes;
  }

  @action
  getProject = () => {
    if (!this.projectName) return null;
    let project = new Project({ projectName: this.projectName, rig: this.rig, blendShapes: this.blendShapes });
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

  @action
  AddBlendShape = () => {
    let servos: BlendShapeServo[] = this.rig.map(servo => {
      return new BlendShapeServo({
        id: servo.id,
        position: servo.defaultPos,
        name: servo.title,
        htmlPosX: servo.htmlPosX,
        htmlPosY: servo.htmlPosY,
      })
    })
    let blendShape = new BlendShape({ servos });
    this.blendShapes = [...this.blendShapes, blendShape];
    this.isDirty = true;
  }

  @action
  setBlendServoValue = (blendShapeId: string, servoId: string, position: number) => {
    let blendShape = this.blendShapes.find(x => x.id === blendShapeId);
    if (!blendShape) return false;
    let servo = blendShape.servos.find(x => x.id === servoId);
    if (!servo) return false;
    servo.position = position;

    this.blendShapes = [...this.blendShapes];
    this.isDirty = true;
  }

  @action
  setBlendshapeName = (id: string, name: string) => {
    let blendShape = this.blendShapes.find(x => x.id === id);
    if (!blendShape) return;
    blendShape.name = name;
    this.isDirty = true;
    this.blendShapes = [...this.blendShapes];
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