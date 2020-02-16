import { Servo } from "./Servo";

export class RigData {
  projectName: string;
  servos: Servo[];

  constructor(val: Partial<RigData>) {
    this.projectName = val.projectName || '';
    this.servos = val.servos || [];
  }
}