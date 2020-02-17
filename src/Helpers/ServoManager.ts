import { ServoModel } from "../Models/ServoModel";
import { BlendShape } from "../Models/BlendShape";
// import { Board, Servo } from "johnny-five";

const electron = window.require('electron');
const { Board, Servo } = electron.remote.require('johnny-five');


export class ServoManager {
  static Instance: ServoManager;
  board = new Board({ repl: false });
  servos = [];

  constructor() {
    ServoManager.Instance = this;
  }

  moveToPosition(servoModel: ServoModel, position: number) {
    let servo = new Servo({
      pin: servoModel.pin,
      controller: 'PCA9685',
      range: [servoModel.min, servoModel.max]
    });
    servo.to(position);
  }

  moveToBlendShape(blendshape: BlendShape, servos: ServoModel[]) {
    for (const servoModel of servos) {
      let blendServo = blendshape.servos.find(x => x.id === servoModel.id);
      let servo = new Servo({
        pin: servoModel.pin,
        controller: 'PCA9685',
        range: [servoModel.min, servoModel.max]
      });
      servo.to(blendServo?.position);
    }
  }

  centerAll(servos: ServoModel[]) {
    for (const servoModel of servos) {
      let servo = new Servo({
        pin: servoModel.pin,
        controller: 'PCA9685',
        range: [servoModel.min, servoModel.max]
      })
      servo.to(servoModel.defaultPos)
    }
  }

}