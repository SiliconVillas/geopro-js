import { Point } from "./point";
import { Vector } from "./vector";
import { Matrix, GeoMapper } from "./types";
import { UnitVector } from "./unitvector";
import { invertAffineOrtogonalMatrix, matrixVectorMultiply } from "./math";
import { clone } from "ramda";

export class Frame implements GeoMapper {
  private _direct: Matrix;
  private _inverse: Matrix;

  private static fromMatrices(dir: Matrix, inv: Matrix) {
    const f = new Frame();
    f._direct = clone(dir);
    f._inverse = clone(inv);
    return f;
  }

  constructor() {
    this._direct = [
      [ 1.0, 0.0, 0.0, 0.0 ], // col 0
      [ 0.0, 1.0, 0.0, 0.0 ], // col 1
      [ 0.0, 0.0, 1.0, 0.0 ], // col 2
      [ 0.0, 0.0, 0.0, 1.0 ], // col 3
    ];
    this._inverse = clone(this._direct);
  }
  /**
   * Build a Frame throug an origin and 2 independent vector.
   * The first vector will be considered the Z direction
   * The second vector will point in the semi-space of x
   * @param o
   * @param v1
   * @param v2
   */
  static from2Vectors = (o: Point, v1: Vector, v2: Vector) => {
    const k = UnitVector.fromVector(v1);
    const j = UnitVector.crossProduct(k, UnitVector.fromVector(v2));
    const i = UnitVector.crossProduct(j,k);
    const direct: Matrix = [ i.coordinates, j.coordinates, k.coordinates, o.coordinates];
    const inverse = invertAffineOrtogonalMatrix(direct);
    return Frame.fromMatrices(direct, inverse);
  }

  get i(): Vector { return Vector.fromCoordinates(this._direct[0]); }
  get j(): Vector { return Vector.fromCoordinates(this._direct[1]); }
  get k(): Vector { return Vector.fromCoordinates(this._direct[2]); }

  get origin(): Point { return Point.fromCoordinates(this._direct[3]); }


  inverte(): Frame {
    return Frame.fromMatrices(this._inverse, this._direct);
  }

  /** Convert the given point to one that is relative to this Frame */
  mapPoint = (p: Point): Point => {
    const { _inverse } = this;
    return Point.fromCoordinates(matrixVectorMultiply(_inverse, p.coordinates));
  }

  /** Convert the given point to one that is relative to this Frame */
  mapVector = (v: Vector): Vector => {
    const { _inverse } = this;
    return Vector.fromCoordinates(matrixVectorMultiply(_inverse, v.coordinates));
  }

  /** Convert the given point to one that is relative to this Frame */
  mapUnitVector = (uv: UnitVector): UnitVector => {
    const { _inverse } = this;
    return UnitVector.fromCoordinates(matrixVectorMultiply(_inverse, uv.coordinates));
  }

}

