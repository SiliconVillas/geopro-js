
export type HCoords = [ number, number, number, number ];

// Each Hcoords is a column in the matrix
export type Matrix = [ HCoords, HCoords, HCoords, HCoords ];

export type Row = 0 | 1 | 2 | 3;
export type Col = 0 | 1 | 2 | 3;

export type VCoords = [ number, number, number, 0.0 ];
export type PCoords = [ number, number, number, 1.0 ];

export interface HomogeneusCoords {
  coordinates: HCoords;
  x: number;
  y: number;
  z: number;

  map(t: GeoMatrix): any;
}

export interface GeoMatrix {
  readonly directMatrix: Matrix;
  readonly inverseMatrix: Matrix;
  direct(row: Row, col: Col): Number;
  inverse(row: Row, col: Col): Number;
  inverte(): GeoMatrix;
}

  // mapPoint(p: Point): Point;
  // mapVector(v: Vector): Vector;
  // mapUnitVector(uv: UnitVector): UnitVector;

