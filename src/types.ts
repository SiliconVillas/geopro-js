/**
 * Homogeneus coordinates for transformable points or vector
 * @public
 */
export type HCoords = [number, number, number, number];

/**
 * Homogeneus coordinates for transformable points
 * @public
 */
export type PCoords = [number, number, number, 1.0];

/**
 * Homogeneus coordinates for transformable vectors
 * @public
 */
export type VCoords = [number, number, number, 0.0];

/**
 * Note: each HCoords is a column in the matrix
 * @public
 */
export type Matrix = [HCoords, HCoords, HCoords, HCoords];

/**
 * Possible row index of a Matrix
 * @public
 */
export type Row = 0 | 1 | 2 | 3;

/**
 * Possible column index of a Matrix
 * @public
 */
export type Col = 0 | 1 | 2 | 3;

/**
 * A transformable object must implement this interface
 * @public
 */
export interface HomogeneusCoords {
  coordinates: HCoords;
  readonly x: number;
  readonly y: number;
  readonly z: number;

  map(t: GeoMatrix): any;
}

/**
 * A transformation object must implement this interface
 * @public
 */
export interface GeoMatrix {
  readonly directMatrix: Matrix;
  direct(row: Row, col: Col): Number;
  composeWith(t: GeoMatrix): GeoMatrix;
}

/**
 * An invertable transformation object must implement this interface
 * @public
 */
export interface InvertableGroMatrix {
  readonly inverseMatrix: Matrix;
  inverse(row: Row, col: Col): Number;
  inverte(): GeoMatrix;
}

/**
 * Invertable transformation (affine trasnformation only)
 * @public
 */
export type AffineGeoMatrix = GeoMatrix & InvertableGroMatrix;
