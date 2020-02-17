import { ServoModel } from "./ServoModel";

export class RigData {
  projectName: string;
  servos: ServoModel[];

  constructor(val: Partial<RigData>) {
    this.projectName = val.projectName || '';
    this.servos = val.servos || [];
  }
}