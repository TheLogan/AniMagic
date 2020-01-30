"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const johnny_five_1 = require("johnny-five");
function createServos() {
    let arr = [];
    for (let i = 0; i < 6; i++) {
        let servo = new johnny_five_1.Servo({
            controller: "PCA9685",
            range: [0, 180],
            pin: i
        });
        servo.id = String.fromCharCode(97 + i);
        arr.push(servo);
    }
    return arr;
}
exports.createServos = createServos;
// let a = servos[0]; // horizontal
// let b = servos[1]; // vertical
// let c = servos[2]; // left lid up
// let d = servos[3]; // left lid down
// let e = servos[4]; // right lid up
// let f = servos[5]; // right lid down
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, time);
    });
}
exports.sleep = sleep;
