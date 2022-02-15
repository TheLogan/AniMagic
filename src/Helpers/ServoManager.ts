import { ServoModel } from "../Models/ServoModel";
import { BlendShape } from "../Models/BlendShape";
// import { Board, Servo, seri } from "johnny-five";

const electron = window.require('electron');
const { Board, Servo } = electron.remote.require('johnny-five');


export class ServoManager {
  static Instance: ServoManager;
  // @ts-ignore
  board: Board | null = null;

  constructor() {
    ServoManager.Instance = this;
    console.log('creating servo manager');
    this.createNewBoard();
  }

  createNewBoard() {
    this.board = new Board({ repl: false })
    this.board.on('open', () => {
      console.log('board connected');
    });
    this.board.on('ready', () => {
      console.log('board ready');
    });

    this.board.on("exit", () => {
      console.log('exiting');
    });
    this.board.on('close', () => {
      console.log('board closed');
      this.createNewBoard();
    });

    this.board.on('fail', () => {
      console.log('board failed');
      this.createNewBoard();
    })
    // @ts-ignore
    console.log('this.board', this.board.isConnected);
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