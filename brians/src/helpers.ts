import { ServoGeneralOption, Servo } from 'johnny-five';
import { readFileSync } from "fs";
import * as path from "path";

export function createServos() {

  let arr = [];

  for (let i = 0; i < 6; i++) {
    let servo = new Servo({
      controller: "PCA9685",
      range: [0, 180],
      pin: i
    });
    servo.id = String.fromCharCode(97 + i);
    arr.push(
      servo
    )
  }

  return arr;
}


export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve() }, time)
  })
}

export function loadJson() {
  // let filepath = path.join(__dirname, 'MockData/Rig.jsonc')
  // let file = readFileSync(filepath, 'utf8');
  // let data = JSON.parse(file);
  // console.log('data', data);
}