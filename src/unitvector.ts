import { VCoords, HCoords, HomogeneusCoords } from "./types";
import { Vector } from "./vector";
import { precision } from "./math";
import { isNil } from "ramda";


export class UnitVector implements HomogeneusCoords  {
  private _coord: VCoords;

  static fromVector(v: Vector) {
    const uv = new UnitVector();
    const l = v.length;
    uv._coord = [ v.x / l, v.y / l, v.z / l, 0 ];
    return uv;
  }

  private constructor() {
    this._coord = [ 1.0, 0.0, 0.0, 0 ];
  }

  private static fromComponents(x: number, y: number, z: number): UnitVector {
    const uv = new UnitVector();
    uv._coord = [ x, y, z, 0];
    return uv;
  }

  get isUnitVector() { return true; }
  get x() { return this._coord[0]; }
  get y() { return this._coord[1]; }
  get z() { return this._coord[2]; }

  get coordinates(): HCoords { return [...this._coord] as HCoords; }

  get length () { return 1; }

  static fromCoordinates = (vals: number[]): UnitVector => {
    return UnitVector.fromVector(Vector.fromCoordinates(vals));
  }

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

  /**
   * Returns true if the two unit vector are parallel
   * Same or opposite direction
   */
  static parallel = (v1: UnitVector, v2: UnitVector): boolean => {
    return Math.abs(v1.x) - Math.abs(v2.x) < precision
        && Math.abs(v1.y) - Math.abs(v2.y) < precision
        && Math.abs(v1.z) - Math.abs(v2.z) < precision;
  }

  static crossProduct = (v1: UnitVector, v2: UnitVector) => {
    return UnitVector.fromComponents(
      v1.y*v2.z - v1.z*v2.y,
      v2.z*v2.x - v1.x*v2.z,
      v1.x*v2.y - v1.y*v2.x,
    );
  }

  static dotProduct = (v1: UnitVector, v2: UnitVector) => {
    return v1.x*v2.x+v1.y*v2.y+v1.z*v2.z;
  }

  static angleBetween = (v1: UnitVector, v2: UnitVector) => {
    return Math.acos(v1.x*v2.x+v1.y*v2.y+v1.z*v2.z);
  }

}

export function isUnitVector( o: HomogeneusCoords): o is UnitVector {
  return !isNil((o as UnitVector).isUnitVector )
}