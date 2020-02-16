import uuidv1 from 'uuid/v1';
import { BlendShapeServo } from "./BlendShapeServo";

export class BlendShape {
  id: string;
  name: string;
  servos: BlendShapeServo[];

  constructor(val: Partial<BlendShape>) {
    this.id = val.id || uuidv1();
    this.name = val.name || 'blendshape';
    this.servos = val.servos || [];
  }
}