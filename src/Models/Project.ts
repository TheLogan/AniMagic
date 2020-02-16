import { Servo } from "./Servo";
import { BlendShape } from "./BlendShape";

export class Project {
  projectName: string;
  rig: Servo[];
  blendShapes: BlendShape[];

  constructor(val: Partial<Project>) {
    this.projectName = val.projectName || '';
    this.rig = val.rig || [];
    this.blendShapes = val.blendShapes || [];
  }
}