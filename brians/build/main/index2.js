"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const johnny_five_1 = require("johnny-five");
// import bodyParser from 'body-parser';
const express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
const board = new johnny_five_1.Board();
board.on('ready', async () => {
    let sss = new johnny_five_1.Servo({
        controller: "PCA9685",
        range: [0, 180],
        pin: 0,
    });
    sss.center();
});
app.post('/setservotarget', function (req, res) {
    console.log('incomming!');
    let { servo } = req.body;
    if (servo == null)
        return res.status(400).send();
    let servoObj = new johnny_five_1.Servo({
        controller: "PCA9685",
        range: [servo.min, servo.max],
        pin: servo.pin,
    });
    servoObj.to(30);
    res.send('Hello World');
});
let port = 4003;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
