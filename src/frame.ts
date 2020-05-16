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

  /**
   * Build a frame directly with 2 matrices
   * @param dir - Direct matrix
   * @param inv - its inverse
   * @internal
   */
  private static fromMatrices(dir: Matrix, inv: Matrix) {
    const f = new Frame();
    f._direct = clone(dir);
    f._inverse = clone(inv);
    return f;
  }

  /**
   * Build an Identity frame, center in the origin and aligned
   * along the main three axes.
   */
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
   * Retrive the matrix used to transform from this frame to
   * the global frame.
   */
  get directMatrix() {
    return this._inverse;
  }

  /**
   * Retrieve the matrix used to transform from global frame
   * to this frame
   */
  get inverseMatrix() {
    return this._direct;
  }

  direct(row: Row, col: Col): Number {
    return this._inverse[col][row];
  }

  inverse(row: Row, col: Col): Number {
    return this._direct[col][row];
  }

  /**
   * The i vector for this frame
   */
  get i(): Vector {
    return Vector.fromVCoords(this._direct[0] as VCoords);
  }

  /**
   * The j vector for this frame
   */
  get j(): Vector {
    return Vector.fromVCoords(this._direct[1] as VCoords);
  }

  /**
   * The k vector for this frame
   */
  get k(): Vector {
    return Vector.fromVCoords(this._direct[2] as VCoords);
  }

  /**
   * The origin of this frame
   */
  get origin(): Point {
    return Point.fromHCoords(this._direct[3]);
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

  /**
   * Inverte the transformation defined for this frame.
   */
  inverte(): GeoMatrix {
    return Frame.fromMatrices(this._inverse, this._direct);
  }
}
