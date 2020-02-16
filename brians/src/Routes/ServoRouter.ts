import { Request, Response } from 'express';
import { ServoModel } from '../Models/ServoModel';
import { Servo } from 'johnny-five';
import { BlendShapeModel } from '../Models/BlendShape';

var express = require('express');
var router = express.Router();

router.post('/movetoposition', function (req: Request, res: Response) {
  let { servo, position }: { servo: ServoModel | undefined, position: number } = req.body;
  if (servo == null) return res.status(400).send();

  let servoObj = new Servo({
    controller: "PCA9685",
    range: [servo.min, servo.max],
    pin: servo.pin,
  })
  servoObj.to(position);
  res.send();
});

router.post('/centerall', (req: Request, res: Response) => {
  let { servos } = req.body;
  if (Array.isArray(servos) === false || servos.length < 1) {
    return res.status(400).send('no servos');
  }

  for (const servo of servos) {
    let servoObj = new Servo({
      controller: "PCA9685",
      range: [servo.min, servo.max],
      pin: servo.pin,
    });
    servoObj.to(servo.defaultPos);
    res.send();
  }
});

router.post('/movetomaxservotarget', (req: Request, res: Response) => {
  let { blendshape, servos }: { blendshape: BlendShapeModel, servos: ServoModel[] } = req.body;
  if (Array.isArray(servos) === false || servos.length < 1 || !blendshape) {
    return res.status(400).send('no servos');
  }

  for (const servo of servos) {
    let servoObj = new Servo({
      controller: "PCA9685",
      range: [servo.min, servo.max],
      pin: servo.pin,
    });
    let position = blendshape.servos.find(x => x.id === servo.id)?.position;
    if (!position) return res.status(400).send();
    servoObj.to(position);
    res.send();
  }

});



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