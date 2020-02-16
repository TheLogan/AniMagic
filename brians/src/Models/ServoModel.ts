export class ServoModel {
  id: string;
  max: number;
  min: number;
  defaultPos: number;
  pin: string | number;
  address: string = '0x40';
  title: string;
}