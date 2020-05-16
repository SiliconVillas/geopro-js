import { clone } from 'ramda';
import { Matrix, Row, Col, GeoMatrix } from './types';
import { matrixMultiply } from './math';

/**
 * A 3D transformation
 * @public
 */
export class Transform implements GeoMatrix {
  private _direct: Matrix;
  private _inverse: Matrix;

  constructor() {
    this._direct = [
      [1.0, 0.0, 0.0, 0.0], // col 0
      [0.0, 1.0, 0.0, 0.0], // col 1
      [0.0, 0.0, 1.0, 0.0], // col 2
      [0.0, 0.0, 0.0, 1.0], // col 3
    ];
    this._inverse = clone(this._direct);
  }

  get directMatrix() {
    return this._direct;
  }
  get inverseMatrix() {
    return this._inverse;
  }

  direct(row: Row, col: Col): Number {
    return this._direct[col][row];
  }

  inverse(row: Row, col: Col): Number {
    return this._inverse[col][row];
  }

  inverte(): Transform {
    return Transform.fromMatrices(this._inverse, this._direct);
  }

  /**
   * Builds and returns the composition of t with this transformation
   * That is: resM = t.M · this.M
   * @param t - the transformation to compose with
   */
  composeWith(t: GeoMatrix): GeoMatrix {
    const { directMatrix: dm1, inverseMatrix: im1 } = this;
    const { directMatrix: dm2, inverseMatrix: im2 } = t;
    const resM: Matrix = matrixMultiply(dm2, dm1);
    const invResM: Matrix = matrixMultiply(im1, im2);
    return Transform.fromMatrices(resM, invResM) as GeoMatrix;
  }

  private static fromMatrices(dir: Matrix, inv: Matrix) {
    const t = new Transform();
    t._direct = clone(dir);
    t._inverse = clone(inv);
    return t;
  }

  static byInverting(t: Transform) {
    return Transform.fromMatrices(t._inverse, t._direct);
  }

  static fromTranslation(tx: number, ty: number, tz: number) {
    return Transform.fromMatrices(
      [
        [1.0, 0.0, 0.0, 0.0],
        [0.0, 1.0, 0.0, 0.0],
        [0.0, 0.0, 1.0, 0.0],
        [tx, ty, tz, 1.0],
      ],
      [
        [1.0, 0.0, 0.0, 0.0],
        [0.0, 1.0, 0.0, 0.0],
        [0.0, 0.0, 1.0, 0.0],
        [-tx, -ty, -tz, 1.0],
      ]
    );
  }

  static fromRotationX(a: number) {
    const cosa = Math.cos(a);
    const sina = Math.sin(a);
    return Transform.fromMatrices(
      [
        [1.0, 0.0, 0.0, 0.0],
        [0.0, cosa, sina, 0.0],
        [0.0, -sina, cosa, 0.0],
        [0.0, 0.0, 0.0, 1.0],
      ],
      [
        [1.0, 0.0, 0.0, 0.0],
        [0.0, cosa, -sina, 0.0],
        [0.0, sina, cosa, 0.0],
        [0.0, 0.0, 0.0, 1.0],
      ]
    );
  }

  static fromRotationY(a: number) {
    const cosa = Math.cos(a);
    const sina = Math.sin(a);
    return Transform.fromMatrices(
      [
        [cosa, 0.0, -sina, 0.0],
        [0.0, 1.0, 0.0, 0.0],
        [sina, 0.0, cosa, 0.0],
        [0.0, 0.0, 0.0, 1.0],
      ],
      [
        [cosa, 0.0, sina, 0.0],
        [0.0, 1.0, 0.0, 0.0],
        [-sina, 0.0, cosa, 0.0],
        [0.0, 0.0, 0.0, 1.0],
      ]
    );
  }

  static fromRotationZ(a: number) {
    const cosa = Math.cos(a);
    const sina = Math.sin(a);
    return Transform.fromMatrices(
      [
        [cosa, -sina, 0.0, 0.0],
        [sina, cosa, 0.0, 0.0],
        [0.0, 0.0, 1.0, 0.0],
        [0.0, 0.0, 0.0, 1.0],
      ],
      [
        [cosa, sina, 0.0, 0.0],
        [-sina, cosa, 0.0, 0.0],
        [0.0, 0.0, 1.0, 0.0],
        [0.0, 0.0, 0.0, 1.0],
      ]
    );
  }

  static fromScale(tx: number, ty: number, tz: number) {
    return Transform.fromMatrices(
      [
        [tx, 0.0, 0.0, 0.0],
        [0.0, ty, 0.0, 0.0],
        [0.0, 0.0, tz, 0.0],
        [0.0, 0.0, 0.0, 1.0],
      ],
      [
        [1 / tx, 0.0, 0.0, 0.0],
        [0.0, 1 / ty, 0.0, 0.0],
        [0.0, 0.0, 1 / tz, 0.0],
        [0.0, 0.0, 0.0, 1.0],
      ]
    );
  }
}
