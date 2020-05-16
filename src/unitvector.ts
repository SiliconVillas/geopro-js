import { VCoords, HomogeneusCoords, GeoMatrix } from './types';
import { Vector } from './vector';
import { precision, matrixVectorMultiply } from './math';
import { isNil } from 'ramda';
import { Frame } from './frame';

/**
 * A 3D unit-vector
 * @public
 */
export class UnitVector implements HomogeneusCoords {
  private _coord: VCoords;

  static fromVector(v: Vector) {
    const uv = new UnitVector();
    const l = v.length;
    uv._coord = [v.x / l, v.y / l, v.z / l, 0];
    return uv;
  }

  private constructor() {
    this._coord = [1.0, 0.0, 0.0, 0];
  }

  private static fromComponents(x: number, y: number, z: number): UnitVector {
    const uv = new UnitVector();
    uv._coord = [x, y, z, 0];
    return uv;
  }

  public static fromVCoords(c: VCoords): UnitVector {
    return UnitVector.fromVector(Vector.fromVCoords(c));
  }

  get isUnitVector() {
    return true;
  }
  get x() {
    return this._coord[0];
  }
  get y() {
    return this._coord[1];
  }
  get z() {
    return this._coord[2];
  }

  get coordinates(): VCoords {
    return [...this._coord] as VCoords;
  }

  get length() {
    return 1;
  }

  map = (t: GeoMatrix) =>
    UnitVector.fromVCoords(
      matrixVectorMultiply(t.directMatrix, this.coordinates)
    );

  multiplyBy(s: number): Vector {
    return Vector.fromVCoords([
      this._coord[0] * s,
      this._coord[1] * s,
      this._coord[2] * s,
      0,
    ]);
  }

  static relative = (f: Frame, c: VCoords): UnitVector => {
    return UnitVector.fromVCoords(c).map(f.inverte());
  };

  static equals = (v1: UnitVector, v2: UnitVector): boolean => {
    return (
      Math.abs(v1.x - v2.x) < precision &&
      Math.abs(v1.y - v2.y) < precision &&
      Math.abs(v1.z - v2.z) < precision
    );
  };

  static notEquals = (v1: UnitVector, v2: UnitVector): boolean => {
    return (
      Math.abs(v1.x - v2.x) >= precision ||
      Math.abs(v1.y - v2.y) >= precision ||
      Math.abs(v1.z - v2.z) >= precision
    );
  };

  /**
   * Returns true if the two unit vector are parallel
   * Same or opposite direction
   */
  static parallel = (v1: UnitVector, v2: UnitVector): boolean => {
    return (
      Math.abs(v1.x) - Math.abs(v2.x) < precision &&
      Math.abs(v1.y) - Math.abs(v2.y) < precision &&
      Math.abs(v1.z) - Math.abs(v2.z) < precision
    );
  };

  static crossProduct = (v1: UnitVector, v2: UnitVector) => {
    return UnitVector.fromComponents(
      v1.y * v2.z - v1.z * v2.y,
      -(v1.x * v2.z - v1.z * v2.x),
      v1.x * v2.y - v1.y * v2.x
    );
  };

  static dotProduct = (v1: UnitVector, v2: UnitVector) => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  };

  static angleBetween = (v1: UnitVector, v2: UnitVector) => {
    return Math.acos(v1.x * v2.x + v1.y * v2.y + v1.z * v2.z);
  };
}

export function isUnitVector(o: HomogeneusCoords): o is UnitVector {
  return !isNil((o as UnitVector).isUnitVector);
}
