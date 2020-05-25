import { Matrix, Row, Col, GeoMatrix } from './types';
import { matrixMultiply } from './math';
import { clone } from 'ramda';

/**
 * A simple projection transformation
 * @public
 */
export class Project implements GeoMatrix {
  private _direct: Matrix;
  private _fov: number = Math.PI / 3; // 60 degrees
  private _d = 1;

  /**
   * build a basic projection on XY on Z=-1
   * @param fov - Field of view angle (in radians)
   */
  constructor(d: number, fov = Math.PI / 3) {
    this._d = d;
    this._fov = fov;
    const s = Project.fovScale(d, fov);
    this._direct = [
      [s, 0.0, 0.0, 0.0], // col 0
      [0.0, s, 0.0, 0.0], // col 1
      [0.0, 0.0, 1.0, 1.0], // col 2
      [0.0, 0.0, 0.0, 0.0], // col 3
    ];
  }

  get directMatrix() {
    return this._direct;
  }

  direct(row: Row, col: Col): Number {
    return this._direct[col][row];
  }

  /**
   * Builds and returns the composition of t with this transformation
   * That is: resM = t.M · this.M
   * @param t - the transformation to compose with
   */
  composeWith(t: GeoMatrix): Project {
    const { directMatrix: dm1 } = this;
    const { directMatrix: dm2 } = t;
    const resM: Matrix = matrixMultiply(dm2, dm1);
    return Project.fromMatrix(resM, this._d, this._fov) as Project;
  }

  private get fovScale() {
    return Project.fovScale(this._d, this._fov);
  }

  static fovScale(d: number, fov: number) {
    return 1 / (d * Math.tan(fov / 2));
  }

  static fromOrthographicOnXY(d: number, fov: number) {
    const s = Project.fovScale(d, fov);
    const direct: Matrix = [
      [s, 0.0, 0.0, 0.0], // col 0
      [0.0, s, 0.0, 0.0], // col 1
      [0.0, 0.0, 0.0, 0.0], // col 2
      [0.0, 0.0, d, 1], // col 3
    ];
    return Project.fromMatrix(direct, d, fov);
  }

  static fromOrthographicOnXZ(d: number, fov: number) {
    const s = Project.fovScale(d, fov);
    const direct: Matrix = [
      [s, 0.0, 0.0, 0.0], // col 0
      [0.0, 0.0, 0.0, 0.0], // col 1
      [0.0, 0.0, s, 0.0], // col 2
      [0.0, d, 0.0, 1], // col 3
    ];
    return Project.fromMatrix(direct, d, fov);
  }

  static fromOrthographicOnYZ(d: number, fov: number) {
    const s = Project.fovScale(d, fov);
    const direct: Matrix = [
      [0.0, 0.0, 0.0, 0.0], // col 0
      [0.0, s, 0.0, 0.0], // col 1
      [0.0, 0.0, s, 0.0], // col 2
      [d, 0.0, 0.0, 1], // col 3
    ];
    return Project.fromMatrix(direct, d, fov);
  }

  static fromPerspectiveOnXY(d: number, fov: number) {
    const s = Project.fovScale(d, fov);
    const direct: Matrix = [
      [s, 0.0, 0.0, 0.0], // col 0
      [0.0, s, 0.0, 0.0], // col 1
      [0.0, 0.0, 1, 1 / d], // col 2
      [0.0, 0.0, 0.0, 0.0], // col 3
    ];
    return Project.fromMatrix(direct, d, fov);
  }

  static fromPerspectiveOnXZ(d: number, fov: number) {
    const s = Project.fovScale(d, fov);
    const direct: Matrix = [
      [s, 0.0, 0.0, 0.0], // col 0
      [0.0, 1, 0.0, 1 / d], // col 1
      [0.0, 0.0, s, 0.0], // col 2
      [0.0, 0.0, 0.0, 0.0], // col 3
    ];
    return Project.fromMatrix(direct, d, fov);
  }

  static fromPerspectiveOnYZ(d: number, fov: number) {
    const s = Project.fovScale(d, fov);
    const direct: Matrix = [
      [1, 0.0, 0.0, 1 / d], // col 0
      [0.0, s, 0.0, 0.0], // col 1
      [0.0, 0.0, s, 0.0], // col 2
      [0.0, 0.0, 0.0, 0.0], // col 3
    ];
    return Project.fromMatrix(direct, d, fov);
  }

  private static fromMatrix(dir: Matrix, d: number, fov: number) {
    const t = new Project(d, fov);
    t._direct = clone(dir);
    return t;
  }
}
