export class BlendShape {
  // needs to save servo data (id)


}

export class BlendShapeServo {
  id: string;
  position: number;

  constructor(val: Partial<BlendShapeServo>) {
    this.id = val.id || '';
    this.position = val.position || 90;
  }
}