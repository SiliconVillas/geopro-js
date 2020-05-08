import { VCoords } from "./types";
import { Vector } from "./vector";
import { precision } from "./math";


export class UnitVector {
  private _coord: VCoords;

  private static fromCoords(c: VCoords) {
    const uv = new UnitVector();
    uv._coord = c;
    return uv;
  }

  static fromVector(v: Vector) {
    const uv = new UnitVector();
    const l = v.length;
    uv._coord = [ v.x / l, v.y / l, v.z / l, 0 ];
    return uv;
  }

  private constructor() {
    this._coord = [ 1.0, 0.0, 0.0, 0 ];
  }

  get x() { return this._coord[0]; }
  get y() { return this._coord[1]; }
  get z() { return this._coord[2]; }

  get coordinates() { return [...this._coord]; }

  get length () { return 1; }

  static equals = (v1: UnitVector, v2: UnitVector): boolean => {
    return Math.abs(v1.x - v2.x) < precision
        && Math.abs(v1.y - v2.y) < precision
        && Math.abs(v1.z - v2.z) < precision;
  }

  static notEquals = (v1: UnitVector, v2: UnitVector): boolean => {
    return Math.abs(v1.x - v2.x) >= precision
        || Math.abs(v1.y - v2.y) >= precision
        || Math.abs(v1.z - v2.z) >= precision;
  }

  static parallel = (v1: UnitVector, v2: UnitVector): boolean => {
    return Math.abs(v1.x) - Math.abs(v2.x) < precision
        && Math.abs(v1.y) - Math.abs(v2.y) < precision
        && Math.abs(v1.z) - Math.abs(v2.z) < precision;
  }

  static crossProduct = (v1: UnitVector, v2: UnitVector) => {
    return UnitVector.fromCoords([
      v1.y*v2.z - v1.z*v2.y,
      v2.z*v2.x - v1.x*v2.z,
      v1.x*v2.y - v1.y*v2.x,
      0.0
    ]);
  }

  static dotProduct = (v1: UnitVector, v2: UnitVector) => {
    return v1.x*v2.x+v1.y*v2.y+v1.z*v2.z;
  }

  static angleBetween = (v1: UnitVector, v2: UnitVector) => {
    return Math.acos(v1.x*v2.x+v1.y*v2.y+v1.z*v2.z);
  }

}