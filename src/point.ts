import { HCoords } from "./types";

export class Point {
  private _coord: HCoords;

  constructor(x:number, y:number, z: number, w = 1.0) {
    this._coord = [x/w, y/w, z/w, 1.0];
  }

  get x() { return this._coord[0]; }
  get y() { return this._coord[1]; }
  get z() { return this._coord[2]; }
}

