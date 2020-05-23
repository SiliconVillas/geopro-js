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

  /**
   * build a basic projection on XY on Z=-1
   * @param fov - Field of view angle (in radians)
   */
  constructor(fov = Math.PI / 3) {
    const s = Project.fovScale(fov);
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
    return Project.fromMatrices(resM, resM) as Project;
  }

  private get fovScale() {
    return Project.fovScale(this._fov);
  }

  static fovScale(fov: number) {
    return 1 / Math.tan(fov / 2);
  }

  static fromProjectOnXY(viewDist: number, fov: number) {
    const s = Project.fovScale(fov);
    const direct: Matrix = [
      [s, 0.0, 0.0, 0.0], // col 0
      [0.0, s, 0.0, 0.0], // col 1
      [0.0, 0.0, 1.0, 1.0], // col 2
      [0.0, 0.0, 0.0, 0.0], // col 3
    ];
    return Project.fromMatrices(direct, direct);
  }

  static fromProjectOnXZ(viewDist: number, fov: number) {
    const s = Project.fovScale(fov);
    const direct: Matrix = [
      [s, 0.0, 0.0, 0.0], // col 0
      [0.0, 1.0, 0.0, 1.0], // col 1
      [0.0, 0.0, s, 0.0], // col 2
      [0.0, 0.0, 0.0, 0.0], // col 3
    ];
    return Project.fromMatrices(direct, direct);
  }

  static fromProjectOnYZ(viewDist: number, fov: number) {
    const s = Project.fovScale(fov);
    const direct: Matrix = [
      [1.0, 0.0, 0.0, 1.0], // col 0
      [0.0, s, 0.0, 0.0], // col 1
      [0.0, 0.0, s, 0.0], // col 2
      [0.0, 0.0, 0.0, 0.0], // col 3
    ];
    return Project.fromMatrices(direct, direct);
  }

  private static fromMatrices(dir: Matrix, _: Matrix) {
    const t = new Project();
    t._direct = clone(dir);
    return t;
  }
}
