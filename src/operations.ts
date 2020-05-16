import { curry, reduce } from 'ramda';
import { HomogeneusCoords, GeoMatrix } from './types';
import { Transform } from '.';

/**
 * Apply the transformation to a point.
 * p' = M*p
 * @param t - a transformation
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
export const compose = (...tlist: Transform[]) =>
  reduce(
    (accTrans: Transform, trans: Transform) => accTrans.composeWith(trans),
    new Transform()
  )(tlist);
