import { Board, Servo } from 'johnny-five';
import { createServos, sleep } from "./helpers";
import * as d3 from "d3-interpolate";
import { cServo } from "./cServo";

const board = new Board();
let closedEyes = [
  new cServo('c', 90, 200),
  new cServo('d', 90, 200),
  new cServo('e', 90, 200),
  new cServo('f', 90, 200),
]

let openEyes = [
  new cServo('c', 30, 200),
  new cServo('d', 140, 200),
  new cServo('e', 140, 200),
  new cServo('f', 30, 200),
]

let animations = [openEyes, closedEyes, openEyes, closedEyes]

board.on('ready', async () => {
  let servos = createServos();


  for (const servo of servos) {
    servo.center();
  }
  await sleep(500);
  servoLoop(servos);

  // a.to(130);
  // b.to(130);
});

async function servoLoop(servos: Servo[]) {

  let currentStep = 0;
  let servoArr = animations[0];

  for (let i = 0; i < 10000; i++) {
    await sleep(1);
    servoArr.map(x => {
      let servo = servos.find(y => x.id === y.id);
      let pos = d3.interpolate(servo.position, x.position)(x.getCurrentStep());
      servo.to(pos);
      x.currentTime++;
      return;
    });
    console.log('currentStep', currentStep);
    console.log('servoArr[0].currentTime', servoArr[0].currentTime, 'servoArr[0].totalTime', servoArr[0].totalTime)
    if (servoArr[currentStep].currentTime >= servoArr[currentStep].totalTime) {
      currentStep++;
      servoArr = animations[currentStep];
      if (servoArr == null) break;
    }
  }
}

