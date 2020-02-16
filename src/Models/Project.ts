import { Servo } from "./Servo";

export class Project {
  projectName: string;
  rig: Servo[];

  constructor(val: Partial<Project>) {
    this.projectName = val.projectName || '';
    this.rig = val.rig || [];
  }
}