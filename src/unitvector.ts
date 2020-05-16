import { VCoords, HomogeneusCoords, GeoMatrix } from './types';
import { Vector } from './vector';
import { precision, matrixVectorMultiply } from './math';
import { isNil, curry } from 'ramda';
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

  /**
   * Build a unit vector. (by default along the X axis).
   * @param x - x component
   * @param y - y component
   * @param z - z component
   */
  constructor(x = 1.0, y = 0.0, z = 0.0) {
    const v = new Vector(x, y, z);
    const l = v.length;
    this._coord = [v.x / l, v.y / l, v.z / l, 0];
  }

  /**
   * Build a new unit-vector given 3 components
   * @param x - X component
   * @param y - Y component
   * @param z - Z component
   */
  private static fromComponents(x: number, y: number, z: number): UnitVector {
    const uv = new UnitVector();
    uv._coord = [x, y, z, 0];
    return uv;
  }

  /**
   * Build a new unit-vector given vector components
   * @param c - components
   */
  public static fromVCoords(c: VCoords): UnitVector {
    return UnitVector.fromVector(Vector.fromVCoords(c));
  }

  /**
   * return tru if the object is a UnitVector
   */
  get isUnitVector() {
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
   * Get the unit-vector components
   */
  get coordinates(): VCoords {
    return [...this._coord] as VCoords;
  }

  /**
   * Retrieve the length of the vector: |v|
   * For unit-vector the length is always 1
   */
  get length() {
    return 1;
  }

  /**
   * Return a new vector along the direction of this unit-vector and
   * of length s
   * @param s - the multiplier
   */
  multiplyBy(s: number): Vector {
    return Vector.fromVCoords([
      this._coord[0] * s,
      this._coord[1] * s,
      this._coord[2] * s,
      0,
    ]);
  }

  /**
   * Use a transformation M to return a new unit-vector u' = M·u
   * @param m - transformation matrix
   */
  map = (t: GeoMatrix) =>
    UnitVector.fromVCoords(
      matrixVectorMultiply(t.directMatrix, this.coordinates)
    );

  /**
   * Use a transformation M to return a new unit-vector u' = M·u
   * @param m - transformation matrix
   */
  static relative = curry(
    (f: Frame, u: UnitVector): UnitVector => u.map(f.inverte())
  );

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
   * Returns true if the two unit vectors are parallel
   * Note: vector can point in the same or opposite direction
   * @param v1 - a first unit-vector
   * @param v2 - a second unit-vector
   */
  static parallel = (v1: UnitVector, v2: UnitVector): boolean => {
    return (
      Math.abs(v1.x) - Math.abs(v2.x) < precision &&
      Math.abs(v1.y) - Math.abs(v2.y) < precision &&
      Math.abs(v1.z) - Math.abs(v2.z) < precision
    );
  };

  /**
   * Returns a new UnitVector computed as the cross-product
   * of the two unit-vector passed as parameter: u' = u1 x u2
   * @param v1 - a first unit-vector
   * @param v2 - a second unit-vector
   */
  static crossProduct = (v1: UnitVector, v2: UnitVector) => {
    return UnitVector.fromComponents(
      v1.y * v2.z - v1.z * v2.y,
      -(v1.x * v2.z - v1.z * v2.x),
      v1.x * v2.y - v1.y * v2.x
    );
  };

  /**
   * Return the result of the dot-product of the two unit-vectors
   * Note: Uses the right-hand rule.
   * @param v1 - a first unit-vector
   * @param v2 - a second unit-vector
   */
  static dotProduct = (v1: UnitVector, v2: UnitVector) => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  };

  /**
   * Return the angle between two unit-vectors.
   * Note: Uses the right-hand rule.
   * @param v1 - a first unit-vector
   * @param v2 - a second unit-vector
   */
  static angleBetween = (v1: UnitVector, v2: UnitVector) => {
    return Math.acos(v1.x * v2.x + v1.y * v2.y + v1.z * v2.z);
  };
}

export function isUnitVector(o: HomogeneusCoords): o is UnitVector {
  return !isNil((o as UnitVector).isUnitVector);
}
