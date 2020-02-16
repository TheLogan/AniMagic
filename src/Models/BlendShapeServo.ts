export class BlendShapeServo {
  id: string;
  name: string;
  position: number;
  htmlPosX: number;
  htmlPosY: number;

  constructor(val: Partial<BlendShapeServo>) {
    this.id = val.id || '';
    this.name = val.name || 'unnamed servo';
    this.position = val.position || 90;
    this.htmlPosX = val.htmlPosX || 0;
    this.htmlPosY = val.htmlPosY || 0;
  }
}