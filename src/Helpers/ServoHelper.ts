import axios, { AxiosRequestConfig } from "axios";
import { Servo } from "../Models/Servo";
export class ServoHelper {

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
}