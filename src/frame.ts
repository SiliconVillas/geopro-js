import { Point } from './point';
import { Vector } from './vector';
import {
  Matrix,
  GeoMatrix,
  Row,
  Col,
  VCoords,
  InvertableGroMatrix,
  AffineGeoMatrix,
} from './types';
import { UnitVector } from './unitvector';
import { invertAffineOrtogonalMatrix, matrixMultiply } from './math';
import { clone } from 'ramda';

/**
 * A frame of reference
 * @public
 */
export class Frame implements GeoMatrix, InvertableGroMatrix {
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
    const inverse: Matrix = [
      i.coordinates,
      j.coordinates,
      k.coordinates,
      o.coordinates,
    ];
    const direct = invertAffineOrtogonalMatrix(inverse);
    return Frame.fromMatrices(direct, inverse);
  };

  /**
   * Retrive the matrix used to transform from this frame to
   * the global frame.
   */
  get directMatrix() {
    return this._direct;
  }

  /**
   * Retrieve the matrix used to transform from global frame
   * to this frame
   */
  get inverseMatrix() {
    return this._inverse;
  }

  direct(row: Row, col: Col): Number {
    return this._direct[col][row];
  }

  inverse(row: Row, col: Col): Number {
    return this._inverse[col][row];
  }

  /**
   * The i vector for this frame
   */
  get i(): Vector {
    return Vector.fromVCoords(this._inverse[0] as VCoords);
  }

  /**
   * The j vector for this frame
   */
  get j(): Vector {
    return Vector.fromVCoords(this._inverse[1] as VCoords);
  }

  /**
   * The k vector for this frame
   */
  get k(): Vector {
    return Vector.fromVCoords(this._inverse[2] as VCoords);
  }

  /**
   * The origin of this frame
   */
  get origin(): Point {
    return Point.fromHCoords(this._inverse[3]);
  }

  /**
   * Inverte the transformation defined for this frame.
   */
  inverte(): GeoMatrix {
    return Frame.fromMatrices(this._inverse, this._direct);
  }

  /**
   * Builds and returns the composition of t with the
   * transformation represented by this frame.
   * This can be use to transform a frame to another
   * by using simple trasnformations.
   * That is: resM = t.M · this.M
   * @param t - the transformation to compose with
   */
  composeWith(t: AffineGeoMatrix): AffineGeoMatrix {
    const { directMatrix: dm1, inverseMatrix: im1 } = this;
    const { directMatrix: dm2, inverseMatrix: im2 } = t;
    const resM: Matrix = matrixMultiply(dm2, dm1);
    const invResM: Matrix = matrixMultiply(im1, im2);
    return Frame.fromMatrices(invResM, resM) as AffineGeoMatrix;
  }
}
