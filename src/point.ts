import { PCoords, HCoords, HomogeneusCoords } from "./types";
import { Vector } from "./vector";
import { precision } from "./math";
import { isNil } from "ramda";

export class Point  implements HomogeneusCoords {
  private _coord: PCoords;

  constructor(x:number, y:number, z: number, w = 1.0) {
    this._coord = [x/w, y/w, z/w, 1.0];
  }

  get isPoint() { return true; }
  get x() { return this._coord[0]; }
  get y() { return this._coord[1]; }
  get z() { return this._coord[2]; }

  get coordinates(): HCoords { return [...this._coord] as HCoords; }

  add = (v: Vector) => {
    return new Point(this._coord[0]+v.x, this._coord[1]+v.y, this._coord[2]+v.z);
  }

  static fromCoordinates = (vals: number[]): Point => {
    return new Point(vals[0],vals[1],vals[2],vals[3]);
  }

  static equals = (p1: Point, p2: Point): boolean => {
    return Math.abs(p1.x - p2.x) < precision
        && Math.abs(p1.y - p2.y) < precision
        && Math.abs(p1.z - p2.z) < precision;
  }

  static notEquals = (p1: Point, p2: Point): boolean => {
    return Math.abs(p1.x - p2.x) >= precision
        || Math.abs(p1.y - p2.y) >= precision
        || Math.abs(p1.z - p2.z) >= precision;
  }
}


export function isPoint( o: HomogeneusCoords): o is Point {
  return !isNil((o as Point).isPoint )
}


