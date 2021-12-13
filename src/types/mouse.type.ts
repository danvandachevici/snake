import TargetInterface from "./target.interface";

export default class MouseType implements TargetInterface {
  col!: number;
  line!: number;
  type!: string;
  effectKey!: string;
  effectValue!: number;

  constructor(line: number, col: number) {
    this.type = 'mouse';
    this.effectKey = 'length';
    this.effectValue = 1;
    this.col = col;
    this.line = line;
  }
}