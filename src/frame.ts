import { Point } from './point';
import { Vector } from './vector';
import { Matrix, GeoMatrix, Row, Col, VCoords } from './types';
import { UnitVector } from './unitvector';
import { invertAffineOrtogonalMatrix } from './math';
import { clone } from 'ramda';

/**
 * A frame of reference
 * @public
 */
export class Frame implements GeoMatrix {
  private _direct: Matrix;
  private _inverse: Matrix;

  private static fromMatrices(dir: Matrix, inv: Matrix) {
    const f = new Frame();
    f._direct = clone(dir);
    f._inverse = clone(inv);
    return f;
  }

  get directMatrix() {
    return this._inverse;
  }
  get inverseMatrix() {
    return this._direct;
  }

  direct(row: Row, col: Col): Number {
    return this._direct[col][row];
  }

  inverse(row: Row, col: Col): Number {
    return this._inverse[col][row];
  }

  constructor() {
    this._direct = [
      [1.0, 0.0, 0.0, 0.0], // col 0
      [0.0, 1.0, 0.0, 0.0], // col 1
      [0.0, 0.0, 1.0, 0.0], // col 2
      [0.0, 0.0, 0.0, 1.0], // col 3
    ];
    this._inverse = clone(this._direct);
  }

  /**
   * Build a Frame throug an origin and 2 independent vector.
   * The first vector will be considered the Z direction
   * The second vector will point in the semi-space of x
   * @param o - origin point
   * @param v1 - a vector indicating the Z of the new frame
   * @param v2 - a vector in the XY plane of the new frame
   */
  static from2Vectors = (o: Point, v1: Vector, v2: Vector) => {
    const k = UnitVector.fromVector(v1);
    const j = UnitVector.crossProduct(k, UnitVector.fromVector(v2));
    const i = UnitVector.crossProduct(j, k);
    const direct: Matrix = [
      i.coordinates,
      j.coordinates,
      k.coordinates,
      o.coordinates,
    ];
    const inverse = invertAffineOrtogonalMatrix(direct);
    return Frame.fromMatrices(direct, inverse);
  };

  get i(): Vector {
    return Vector.fromVCoords(this._direct[0] as VCoords);
  }
  get j(): Vector {
    return Vector.fromVCoords(this._direct[1] as VCoords);
  }
  get k(): Vector {
    return Vector.fromVCoords(this._direct[2] as VCoords);
  }

  get origin(): Point {
    return Point.fromHCoords(this._direct[3]);
  }

  inverte(): GeoMatrix {
    return Frame.fromMatrices(this._inverse, this._direct);
  }
}
