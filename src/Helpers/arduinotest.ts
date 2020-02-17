const electron = window.require('electron');
const { Board, Servo } = electron.remote.require('johnny-five');

export class arduinotest {
  constructor() {
    const board = new Board({ repl: false });
    board.on('ready', async () => {
      let servo = new Servo({
        controller: "PCA9685",
        range: [0, 180],
        pin: 0,
      });
      servo.to(130);
    });
  }
}