import { curry, reduceRight, init, last, head, tail, reduce } from 'ramda';
import { HomogeneusCoords, GeoMatrix, AffineGeoMatrix } from './types';
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
// export const compose = (...l: AffineGeoMatrix[]): AffineGeoMatrix => {
//   const t = init(l);
//   const h = last(l) || new Transform();
//   return reduceRight<AffineGeoMatrix, AffineGeoMatrix>(
//     (accTrans: AffineGeoMatrix, trans: AffineGeoMatrix) =>
//       trans.composeWith(accTrans) as AffineGeoMatrix,
//     h
//   )(t);
// };

export const compose = (...l: AffineGeoMatrix[]): AffineGeoMatrix => {
  const t = tail(l);
  const h = head(l) || new Transform();
  return reduce<AffineGeoMatrix, AffineGeoMatrix>(
    (accTrans: AffineGeoMatrix, trans: AffineGeoMatrix) =>
      accTrans.composeWith(trans) as AffineGeoMatrix,
    h
  )(t);
};
