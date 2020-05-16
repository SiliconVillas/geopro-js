import { PCoords, HCoords, HomogeneusCoords, GeoMatrix } from './types';
import { Vector } from './vector';
import { precision, matrixPointMultiply } from './math';
import { isNil, reduce, curry } from 'ramda';
import { Frame } from './frame';
import { UnitVector } from './unitvector';

/**
 * A 3D point
 * @public
 */
export class Point implements HomogeneusCoords {
  // @internal
  private _coord: PCoords;

  constructor(x: number, y: number, z: number, w = 1.0) {
    this._coord = [x / w, y / w, z / w, 1.0];
  }

  get isPoint() {
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

  get coordinates(): HCoords {
    return [...this._coord] as HCoords;
  }

  /**
   * Use a transformation M to return a new point p' = M·p
   * @param m - transformation matrix
   */
  map = (m: GeoMatrix) =>
    Point.fromHCoords(matrixPointMultiply(m.directMatrix, this.coordinates));

  /**
   * Create a point given the coordinates relative to a frame
   * @param f - the frame of reference
   * @param c - the vector components
   */
  static relative = curry((f: Frame, p: Point): Point => p.map(f.inverte()));

  /**
   * Create a point adding the given vector to this point.
   */
  static add = curry(
    (v: Vector, p: Point): Point => new Point(p.x + v.x, p.y + v.y, p.z + v.z)
  );

  /**
   * Create a point adding all the vectors to this point.
   */
  static adds = curry(
    (vs: Vector[], p: Point): Point =>
      reduce((np: Point, v: Vector) => Point.add(v, np), p)(vs)
  );

  /**
   * Create a point given an array of coordinates (must be 4 long)
   */
  static fromHCoords = (vals: number[]): Point => {
    return new Point(vals[0], vals[1], vals[2], vals[3]);
  };

  static along = curry((t: number, dir: UnitVector, start: Point) =>
    Point.add(dir.multiplyBy(t), start)
  );

  /**
   * Returns true if the point are in the same location within tollerance
   */
  static equals = (p1: Point, p2: Point): boolean => {
    return (
      Math.abs(p1.x - p2.x) < precision &&
      Math.abs(p1.y - p2.y) < precision &&
      Math.abs(p1.z - p2.z) < precision
    );
  };

  /**
   * Returns true if the point are NOT in the same location within tollerance
   */
  static notEquals = (p1: Point, p2: Point): boolean => {
    return (
      Math.abs(p1.x - p2.x) >= precision ||
      Math.abs(p1.y - p2.y) >= precision ||
      Math.abs(p1.z - p2.z) >= precision
    );
  };
}

/**
 * Typeguard to cast coordinates to a Point
 * @param o
 */
export function isPoint(o: HomogeneusCoords): o is Point {
  return !isNil((o as Point).isPoint);
}
