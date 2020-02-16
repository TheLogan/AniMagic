"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const johnny_five_1 = require("johnny-five");
const helpers_1 = require("./helpers");
const d3 = require("d3-interpolate");
const cServo_1 = require("./Classes/cServo");
const board = new johnny_five_1.Board();
let closedEyes = [
    new cServo_1.cServo('c', 90, 200),
    new cServo_1.cServo('d', 90, 200),
    new cServo_1.cServo('e', 90, 200),
    new cServo_1.cServo('f', 90, 200),
];
let openEyes = [
    new cServo_1.cServo('c', 30, 200),
    new cServo_1.cServo('d', 140, 200),
    new cServo_1.cServo('e', 140, 200),
    new cServo_1.cServo('f', 30, 200),
];
let lookLeft = [new cServo_1.cServo('a', 0, 200)];
let lookRight = [new cServo_1.cServo('a', 180, 200)];
let lookUp = [new cServo_1.cServo('b', 0, 200)];
let lookDown = [new cServo_1.cServo('b', 180, 200)];
let animations = [openEyes, closedEyes, openEyes, lookUp, lookLeft];
board.on('ready', async () => {
    let servos = helpers_1.createServos();
    // loadJson();
    for (const servo of servos) {
        servo.center();
    }
    await helpers_1.sleep(500);
    // servoLoop(servos);
});
async function servoLoop(servos) {
    let currentStep = 0;
    let servoArr = animations[0];
    for (let i = 0; i < 10000; i++) {
        await helpers_1.sleep(1);
        servoArr.map(x => {
            let servo = servos.find(y => x.id === y.id);
            let pos = d3.interpolate(servo.position, x.position)(x.getCurrentStep());
            servo.to(pos);
            x.currentTime++;
            return;
        });
        // console.log('currentStep', currentStep);
        // console.log('servoArr[0].currentTime', servoArr[0].currentTime, 'servoArr[0].totalTime', servoArr[0].totalTime)
        // if (servoArr[currentStep].currentTime >= servoArr[currentStep].totalTime) {
        //   console.log('currentStep', currentStep);
        //   currentStep++;
        //   servoArr = animations[currentStep];
        //   if (servoArr == null) break;
        // }
    }
}
