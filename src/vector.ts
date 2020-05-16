import { VCoords, HomogeneusCoords, GeoMatrix } from './types';
import { precision, matrixVectorMultiply } from './math';
import { Point } from './point';
import { reduce, isNil, curry } from 'ramda';
import { UnitVector } from './unitvector';
import { Frame } from './frame';

/**
 * A 3D vector
 * @public
 */
export class Vector implements HomogeneusCoords {
  private _coord: VCoords;

  /**
   * Build a vector in space with the given components
   * @param x - X component
   * @param y - Y component
   * @param z - Z component
   */
  constructor(x: number, y: number, z: number) {
    this._coord = [x, y, z, 0.0];
  }

  /**
   * Build a new vector given vector components
   * @param c - components
   */
  static fromVCoords = (vals: VCoords): Vector => {
    return new Vector(vals[0], vals[1], vals[2]);
  };

  /**
   * Return true is the object is a Vector
   */
  get isVector() {
    return true;
  }

  /**
   * Get component along the X axis
   */
  get x() {
    return this._coord[0];
  }

  /**
   * Get component along the Y axis
   */
  get y() {
    return this._coord[1];
  }

  /**
   * Get component along the Z axis
   */
  get z() {
    return this._coord[2];
  }

  /**
   * Get the vector components
   */
  get coordinates(): VCoords {
    return [...this._coord] as VCoords;
  }

  /**
   * Retrieve the length of the vector: |v|
   */
  get length() {
    const x = this._coord[0];
    const y = this._coord[1];
    const z = this._coord[2];
    return Math.sqrt(x * x + y * y + z * z);
  }

  /**
   * Return a new vector by multiplying this one by a scalar
   * @param s - the multiplier
   */
  multiplyBy = (s: number) => {
    return new Vector(
      this._coord[0] * s,
      this._coord[1] * s,
      this._coord[2] * s
    );
  };

  /**
   * Use a transformation M to return a new vector v' = M·v
   * @param m - transformation matrix
   */
  map(m: GeoMatrix): Vector {
    return Vector.fromVCoords(
      matrixVectorMultiply(m.directMatrix, this.coordinates)
    );
  }

  /**
   * Create a vector given the coordinates relative to a frame
   * @param f - the frame of reference
   * @param c - the vector components
   */
  static relative = curry(
    (f: Frame, c: VCoords): Vector => {
      return Vector.fromVCoords(c).map(f.inverte());
    }
  );

  static equals = (v1: Vector, v2: Vector): boolean => {
    return (
      Math.abs(v1.x - v2.x) < precision &&
      Math.abs(v1.y - v2.y) < precision &&
      Math.abs(v1.z - v2.z) < precision
    );
  };

  static notEquals = (v1: Vector, v2: Vector): boolean => {
    return (
      Math.abs(v1.x - v2.x) >= precision ||
      Math.abs(v1.y - v2.y) >= precision ||
      Math.abs(v1.z - v2.z) >= precision
    );
  };

  static parallel = (v1: Vector, v2: Vector): boolean => {
    return UnitVector.parallel(
      UnitVector.fromVector(v1),
      UnitVector.fromVector(v2)
    );
  };

  static fromPoints = (p1: Point, p2: Point): Vector => {
    return new Vector(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
  };

  static adds = (...vs: Vector[]): Vector =>
    reduce(
      (acc: Vector, v: Vector) =>
        new Vector(acc.x + v.x, acc.z + v.z, acc.z + v.z),
      new Vector(0, 0, 0)
    )(vs);

  static crossProduct = (v1: Vector, v2: Vector) => {
    return new Vector(
      v1.y * v2.z - v1.z * v2.y,
      v2.z * v2.x - v1.x * v2.z,
      v1.x * v2.y - v1.y * v2.x
    );
  };

  static dotProduct = (v1: Vector, v2: Vector) => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  };
}

export function isVector(o: HomogeneusCoords): o is Vector {
  return !isNil((o as Vector).isVector);
}
