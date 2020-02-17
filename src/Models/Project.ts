import { ServoModel } from "./ServoModel";
import { BlendShape } from "./BlendShape";

export class Project {
  projectName: string;
  rig: ServoModel[];
  blendShapes: BlendShape[];

  constructor(val: Partial<Project>) {
    this.projectName = val.projectName || '';
    this.rig = val.rig || [];
    this.blendShapes = val.blendShapes || [];
  }
}