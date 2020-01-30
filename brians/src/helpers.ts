import { ServoGeneralOption, Servo } from 'johnny-five';

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

// let a = servos[0]; // horizontal
// let b = servos[1]; // vertical
// let c = servos[2]; // left lid up
// let d = servos[3]; // left lid down
// let e = servos[4]; // right lid up
// let f = servos[5]; // right lid down


export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve() }, time)
  })
}
