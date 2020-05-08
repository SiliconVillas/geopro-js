import { clone, curry, reduce } from 'ramda';
import { Point } from "./point";
import { Matrix, Row, Col } from './types';
import { round4, matrixMultiply } from './math';

export class Transform {
  private _direct: Matrix;
  private _inverse: Matrix;

  constructor() {
    this._direct = [
      [ 1.0, 0.0, 0.0, 0.0 ], // col 0
      [ 0.0, 1.0, 0.0, 0.0 ], // col 1
      [ 0.0, 0.0, 1.0, 0.0 ], // col 2
      [ 0.0, 0.0, 0.0, 1.0 ], // col 3
    ];
    this._inverse = clone(this._direct);
  }

  dir(row: Row, col: Col) {
    return this._direct[col][row];
  }

  inv(row: Row, col: Col) {
    return this._inverse[col][row];
  }

  inverse() {
      return Transform.fromMatrices(this._inverse, this._direct);
  }

  mapPoint(p: Point): Point {
    const { _direct } = this;
    const x = round4(_direct[0][0]*p.x + _direct[1][0]*p.y + _direct[2][0]*p.z + _direct[3][0]);
    const y = round4(_direct[0][1]*p.x + _direct[1][1]*p.y + _direct[2][1]*p.z + _direct[3][1]);
    const z = round4(_direct[0][2]*p.x + _direct[1][2]*p.y + _direct[2][2]*p.z + _direct[3][2]);
    const w = round4(_direct[0][3]*p.x + _direct[1][3]*p.y + _direct[2][3]*p.z + _direct[3][3]);
    return new Point(x,y,z,w);
  }

  /**
   * return the composition of t with this transformation
   * That is: resM = t.M * this.M
   * @param t
   */
  composeWith(t: Transform): Transform {
    const { _direct: dm1, _inverse: im1 } = this;
    const { _direct: dm2, _inverse: im2 } = t;
    const resM: Matrix = matrixMultiply(dm2,dm1);
    const invResM: Matrix = matrixMultiply(im1,im2);
    return Transform.fromMatrices(resM, invResM);
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
      [ [ 1.0, 0.0, 0.0, 0.0 ]
      , [ 0.0, 1.0, 0.0, 0.0 ]
      , [ 0.0, 0.0, 1.0, 0.0 ]
      , [  tx,  ty,  tz, 1.0 ]
      ],
      [ [ 1.0, 0.0, 0.0, 0.0 ]
      , [ 0.0, 1.0, 0.0, 0.0 ]
      , [ 0.0, 0.0, 1.0, 0.0 ]
      , [ -tx, -ty, -tz, 1.0 ]
      ]
    );
  }

  static fromRotationX(a: number) {
    const cosa = round4(Math.cos(a));
    const sina = round4(Math.sin(a));
    return Transform.fromMatrices(
      [ [ 1.0, 0.0, 0.0, 0.0 ]
      , [ 0.0, cosa, sina, 0.0 ]
      , [ 0.0, -sina, cosa, 0.0 ]
      , [ 0.0, 0.0, 0.0, 1.0 ]
      ],
      [ [ 1.0, 0.0, 0.0, 0.0 ]
      , [ 0.0, cosa, -sina, 0.0 ]
      , [ 0.0, sina, cosa, 0.0 ]
      , [ 0.0, 0.0, 0.0, 1.0 ]
      ]
    );
  }
  static fromRotationY(a: number) {
    const cosa = round4(Math.cos(a));
    const sina = round4(Math.sin(a));
    return Transform.fromMatrices(
      [ [ cosa, 0.0, -sina, 0.0 ]
      , [ 0.0, 1.0, 0.0, 0.0 ]
      , [ sina, 0.0, cosa, 0.0 ]
      , [ 0.0, 0.0, 0.0, 1.0 ]
      ],
      [ [ cosa, 0.0, sina, 0.0 ]
      , [ 0.0, 1.0, 0.0, 0.0 ]
      , [ -sina, 0.0, cosa, 0.0 ]
      , [ 0.0, 0.0, 0.0, 1.0 ]
      ],
    );
  }
  static fromRotationZ(a: number) {
    const cosa = round4(Math.cos(a));
    const sina = round4(Math.sin(a));
    return Transform.fromMatrices(
      [ [ cosa, -sina, 0.0, 0.0 ]
      , [ sina, cosa, 0.0, 0.0 ]
      , [ 0.0, 0.0, 1.0, 0.0 ]
      , [ 0.0, 0.0, 0.0, 1.0 ]
      ],
      [ [ cosa, 0.0, sina, 0.0 ]
      , [ 0.0, 1.0, 0.0, 0.0 ]
      , [ -sina, 0.0, cosa, 0.0 ]
      , [ 0.0, 0.0, 0.0, 1.0 ]
      ],
    );
  }


  static fromScale(tx: number, ty: number, tz: number) {
    return Transform.fromMatrices(
      [ [ tx, 0.0, 0.0, 0.0 ]
      , [ 0.0,  ty, 0.0, 0.0 ]
      , [ 0.0, 0.0,  tz, 0.0 ]
      , [ 0.0, 0.0, 0.0, 1.0 ]
      ],
      [ [ 1/tx, 0.0, 0.0, 0.0 ]
      , [ 0.0, 1/ty, 0.0, 0.0 ]
      , [ 0.0, 0.0, 1/tz, 0.0 ]
      , [ 0.0, 0.0, 0.0, 1.0 ]
      ],
    );
  }
}


/**
 * Apply the transformation to a point.
 * p' = M*p
 */
export const map = curry((t: Transform, p: Point) => t.mapPoint(p));

/**
 * Compose transformation right to left (eg T2*T1)
 * @param tlist a list of transformation to combine
 */
export const compose = ( ...tlist: Transform[]) =>
  reduce(
    (accTrans: Transform, trans: Transform ) => accTrans.composeWith(trans),
    new Transform(),
  )(tlist);
