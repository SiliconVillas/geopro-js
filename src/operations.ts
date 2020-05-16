import { curry, reduceRight, init, last } from 'ramda';
import { HomogeneusCoords, GeoMatrix } from './types';
import { Transform } from './transform';

/**
 * Apply the transformation to a point.
 * p' = M*p
 * @param t - a transformation or a frame of reference
 * @param o - a transformable object (i.e an object derived from HomogeneusCoords)
 * @public
 */
export const map = curry(
  <T extends HomogeneusCoords>(t: GeoMatrix, o: T): T => o.map(t)
);

/**
 * Compose transformation right to left (eg T2*T1)
 * @param tlist - a list of transformation to combine
 * @public
 */
export const compose = (...l: GeoMatrix[]) => {
  const t = init(l);
  const h = last(l) || new Transform();
  return reduceRight(
    (accTrans: GeoMatrix, trans: GeoMatrix) => trans.composeWith(accTrans),
    h
  )(t);
};
