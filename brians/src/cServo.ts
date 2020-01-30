import { Servo } from 'johnny-five';

export class cServo {
  id: string;
  position: number;
  totalTime: number;
  currentTime: number;

  getCurrentStep() {
    return this.currentTime <= this.totalTime ? 1 / this.totalTime * this.currentTime : 1;
  }

  constructor(id: string, position: number, totalTime: number) {
    if (position < 0) position = 0;
    else if (position > 180) position = 180;

    this.id = id;
    this.position = position;
    this.totalTime = totalTime;
    this.currentTime = 0;
  }
}