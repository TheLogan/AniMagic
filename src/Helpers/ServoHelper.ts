import axios, { AxiosRequestConfig } from "axios";
import { Servo } from "../Models/Servo";
import { BlendShape } from "../Models/BlendShape";
export class ServoHelper {

  async moveToPosition(servo: Servo, position: number) {
    try {
      let config: AxiosRequestConfig = {
        url: '/servo/movetoposition',
        baseURL: 'http://localhost:4003',
        method: 'POST',
        data: { servo, position }
      }

      await axios(config);
      return;
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
    }
  }

  async centerAll(servos: Servo[]) {
    try {
      let config: AxiosRequestConfig = {
        url: '/servo/centerall',
        baseURL: 'http://localhost:4003',
        method: 'POST',
        data: { servos }
      }
      await axios(config);
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
    }
  }

  async moveToDefaultVal(servo: Servo) {
    try {
      let config: AxiosRequestConfig = {
        url: '/servo/movetodefaultservotarget',
        baseURL: 'http://localhost:4003',
        method: 'POST',
        data: { servo }
      }

      await axios(config);
      return;
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
    }
  }
  async moveToMinServoTarget(servo: Servo) {
    try {
      let config: AxiosRequestConfig = {
        url: '/servo/movetominservotarget',
        baseURL: 'http://localhost:4003',
        method: 'POST',
        data: { servo }
      }

      await axios(config);
      return;
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
    }
  }

  async moveToMaxServoTarget(servo: Servo) {
    try {
      let config: AxiosRequestConfig = {
        url: '/servo/movetomaxservotarget',
        baseURL: 'http://localhost:4003',
        method: 'POST',
        data: { servo }
      }

      await axios(config);
      return;
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
    }
  }

  async moveToBlendShape(blendshape: BlendShape, servos: Servo[]) {
    try {
      let config: AxiosRequestConfig = {
        url: '/servo/movetomaxservotarget',
        baseURL: 'http://localhost:4003',
        method: 'POST',
        data: { blendshape, servos }
      }

      await axios(config);
      return;
    } catch (error) {

    }
  }
}