"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const johnny_five_1 = require("johnny-five");
var temporal = require("temporal");
const controller = "PCA9685";
const board = new johnny_five_1.Board();
board.on('ready', () => {
    const a = new johnny_five_1.Servo({
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
