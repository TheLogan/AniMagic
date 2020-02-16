import { Request, Response } from 'express';
import { ServoModel } from '../Models/ServoModel';
import { Servo } from 'johnny-five';

var express = require('express');
var router = express.Router();

router.post('/movetominservotarget', function (req: Request, res: Response) {
  let { servo }: { servo: ServoModel | undefined } = req.body;
  if (servo == null) return res.status(400).send();

  let servoObj = new Servo({
    controller: "PCA9685",
    range: [servo.min, servo.max],
    pin: servo.pin,
  })
  servoObj.to(servo.min);
  res.send();
});

router.post('/movetomaxservotarget', function (req: Request, res: Response) {
  let { servo }: { servo: ServoModel | undefined } = req.body;
  if (servo == null) return res.status(400).send();

  let servoObj = new Servo({
    controller: "PCA9685",
    range: [servo.min, servo.max],
    pin: servo.pin,
  })
  servoObj.to(servo.max);
  res.send();
});

router.post('/movetodefaultservotarget', function (req: Request, res: Response) {
  let { servo }: { servo: ServoModel | undefined } = req.body;
  if (servo == null) return res.status(400).send();

  let servoObj = new Servo({
    controller: "PCA9685",
    range: [servo.min, servo.max],
    pin: servo.pin,
  })
  servoObj.to(servo.defaultPos);
  res.send();
});

module.exports = router;