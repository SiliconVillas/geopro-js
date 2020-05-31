import { curry, tail, head, reduce } from 'ramda';
import { HomogeneousCoords, GeoMatrix, AffineGeoMatrix } from './types';
import { Transform, Point, Vector } from '.';

export type Map = {
  <T extends HomogeneousCoords>(t: GeoMatrix, o: T): T;
  (t: GeoMatrix): <T extends HomogeneousCoords>(o: T) => T;
};

/**
 * Apply the transformation to a point.
 * p' = M*p
 * @param t - a transformation or a frame of reference
 * @param o - a transformable object (i.e an object derived from HomogeneousCoords)
 * @public
 */
export const map: Map = curry(
  <T extends HomogeneousCoords>(t: GeoMatrix, o: T): T => o.map(t)
) as Map;

/**
 * Compose transformations right to left (eg T2*T1)
 * @param tlist - a list of transformation to combine
 * @public
 */
export const compose = (...l: AffineGeoMatrix[]): AffineGeoMatrix => {
  const t = tail(l);
  const h = head(l) || new Transform();
  return reduce<AffineGeoMatrix, AffineGeoMatrix>(
    (accTrans: AffineGeoMatrix, trans: AffineGeoMatrix) =>
      accTrans.composeWith(trans) as AffineGeoMatrix,
    h
  )(t);
};

export type AddToPoint = {
  (p: Point, v: Vector, ...vs: Vector[]): Point;
  (p: Point): (v: Vector, ...vs: Vector[]) => Point;
};

/**
 * Add vectors to a point
 */
export const addToPoint: AddToPoint = (curry(
  (p: Point, v: Vector, ...vs: Vector[]) => Point.adds([v, ...vs], p)
) as unknown) as AddToPoint;

export type AddToVector = {
  (v1: Vector, v: Vector, ...vs: Vector[]): Vector;
  (v1: Vector): (v: Vector, ...vs: Vector[]) => Vector;
};

/**
 * Add vectors to a vector
 */
export const addToVector: AddToVector = (curry(
  (v1: Vector, v: Vector, ...vs: Vector[]) => Vector.adds(v1, v, ...vs)
) as unknown) as AddToVector;
