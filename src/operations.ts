import { curry, reduce, cond } from 'ramda';
import { HomogeneusCoords, GeoMapper } from './types';
import { Transform } from '.';
import { isPoint } from './point';
import { isVector } from './vector';
import { isUnitVector } from './unitvector';

/**
 * Apply the transformation to a point.
 * p' = M*p
 */
export const map = curry(<T extends HomogeneusCoords>(t: GeoMapper, o: T) =>
  cond([
    [ isPoint, t.mapPoint ],
    [ isVector, t.mapVector ],
    [ isUnitVector, t.mapUnitVector ]
  ])(o)
);

/**
 * Compose transformation right to left (eg T2*T1)
 * @param tlist a list of transformation to combine
 */
export const compose = ( ...tlist: Transform[]) =>
  reduce(
    (accTrans: Transform, trans: Transform ) => accTrans.composeWith(trans),
    new Transform(),
  )(tlist);
