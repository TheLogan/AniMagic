"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const johnny_five_1 = require("johnny-five");
const fs_1 = require("fs");
const path = require("path");
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
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, time);
    });
}
exports.sleep = sleep;
function loadJson() {
    let filepath = path.join(__dirname, 'MockData/Rig.jsonc');
    let file = fs_1.readFileSync(filepath, 'utf8');
    let data = JSON.parse(file);
    console.log('data', data);
}
exports.loadJson = loadJson;
