import { PCoords, HCoords, HomogeneusCoords } from "./types";
import { Vector } from "./vector";
import { precision } from "./math";
import { isNil, reduce, curry } from "ramda";
import { Frame } from "./frame";
import { map } from "./operations";
import { UnitVector } from "./unitvector";

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

  /**
   * Create a point adding the given vector to this point.
   */
  static add = curry((v: Vector, p: Point): Point => new Point(p.x+v.x, p.y+v.y, p.z+v.z));

  /**
   * Create a point adding all the vectors to this point.
   */
  static adds = curry((vs: Vector[], p: Point): Point => reduce(
      (np: Point, v: Vector) => Point.add(v, np),
      p
    )(vs));

  /**
   * Create a point given the coordinates relative to a frame
   */
  static relative = (f: Frame, x: number, y: number,z: number,w = 1 ): Point => {
    return map(f.inverte(), new Point(x,y,z,w));
  }

  /**
   * Create a point given an array of coordinates (must be 4 long)
   */
  static fromCoordinates = (vals: number[]): Point => {
    return new Point(vals[0],vals[1],vals[2],vals[3]);
  }

  static along = curry((t: number, dir: UnitVector, start: Point) =>
    Point.add( dir.multiplyBy(t), start)
  );

  /**
   * Returns true if the point are in the same location within tollerance
   */
  static equals = (p1: Point, p2: Point): boolean => {
    return Math.abs(p1.x - p2.x) < precision
        && Math.abs(p1.y - p2.y) < precision
        && Math.abs(p1.z - p2.z) < precision;
  }

  /**
   * Returns true if the point are NOT in the same location within tollerance
   */
  static notEquals = (p1: Point, p2: Point): boolean => {
    return Math.abs(p1.x - p2.x) >= precision
        || Math.abs(p1.y - p2.y) >= precision
        || Math.abs(p1.z - p2.z) >= precision;
  }
}

/**
 * Typeguard to cast coordinates to a Point
 * @param o
 */
export function isPoint( o: HomogeneusCoords): o is Point {
  return !isNil((o as Point).isPoint )
}


