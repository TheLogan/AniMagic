import uuidv1 from 'uuid/v1';


export class Servo {
  id: string;
  max: number;
  min: number;
  defaultPos: number;
  pin: string | number;
  address: string = '0x40';
  title: string;
  htmlPosX: number;
  htmlPosY: number;

  constructor(val: Partial<Servo>) {
    this.id = val.id || uuidv1();

    if (val.max == null) this.max = 180;
    else this.max = val.max;
    this.min = val.min || 0;

    if (val.defaultPos == null) this.defaultPos = 90;
    else this.defaultPos = val.defaultPos;
    this.pin = val.pin || 0;
    this.address = val.address || '0x40';
    this.title = val.title || 'Stepper motor';
    this.htmlPosX = val.htmlPosX || 30;
    this.htmlPosY = val.htmlPosY || 30;
  }
}