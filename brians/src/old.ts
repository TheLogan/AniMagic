import { Board, Led, Servo } from 'johnny-five';

var temporal = require("temporal");

const controller = "PCA9685";
const board = new Board();

board.on('ready', () => {
  const a = new Servo({
    controller,
    range: [0, 180],
    pin: 0,
  });

  a.to(90);
  console.log('test');

  temporal.delay(1500, () => {
    console.log('has run');
    a.to(180);
  });

  board.repl.inject({
    a
  });
});