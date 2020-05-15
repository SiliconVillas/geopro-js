import { curry } from 'ramda';
import { Matrix, HCoords, VCoords } from './types';

export const precision = 0.00001;

export const round = curry((p: number, n: number) => {
  const m = Math.pow(10, p);
  return Math.round(n * m) / m;
});

export const round4 = round(4);

export const matrixMultiply = (t1: Matrix, t2: Matrix): Matrix => {
  const res: Matrix = [
    [1.0, 0.0, 0.0, 0.0], // col 0
    [0.0, 1.0, 0.0, 0.0], // col 1
    [0.0, 0.0, 1.0, 0.0], // col 2
    [0.0, 0.0, 0.0, 1.0], // col 3
  ];

  let col, row;
  for (col = 0; col < 4; col++) {
    for (row = 0; row < 4; row++) {
      res[col][row] =
        t1[col][0] * t2[0][row] +
        t1[col][1] * t2[1][row] +
        t1[col][2] * t2[2][row] +
        t1[col][3] * t2[3][row];
    }
  }
  return res;
};

export const matrixEqual = (m1: Matrix, m2: Matrix): boolean => {
  let col, row;
  for (col = 0; col < 4; col++) {
    for (row = 0; row < 4; row++) {
      if (Math.abs(m1[col][row] - m2[col][row]) > precision) {
        return false;
      }
    }
  }
  return true;
};

export const matrixVectorMultiply = (t: Matrix, v: VCoords): VCoords => {
  return [
    t[0][0] * v[0] + t[1][0] * v[1] + t[2][0] * v[2] + t[3][0] * v[3],
    t[0][1] * v[0] + t[1][1] * v[1] + t[2][1] * v[2] + t[3][1] * v[3],
    t[0][2] * v[0] + t[1][2] * v[1] + t[2][2] * v[2] + t[3][2] * v[3],
    0,
  ];
};

export const matrixPointMultiply = (t: Matrix, v: HCoords): HCoords => {
  return [
    t[0][0] * v[0] + t[1][0] * v[1] + t[2][0] * v[2] + t[3][0] * v[3],
    t[0][1] * v[0] + t[1][1] * v[1] + t[2][1] * v[2] + t[3][1] * v[3],
    t[0][2] * v[0] + t[1][2] * v[1] + t[2][2] * v[2] + t[3][2] * v[3],
    t[0][3] * v[0] + t[1][3] * v[1] + t[2][3] * v[2] + t[3][3] * v[3],
  ];
};

export const invertAffineOrtogonalMatrix = (t: Matrix): Matrix => {
  const x = -t[3][0];
  const y = -t[3][1];
  const z = -t[3][2];
  const tx = x * t[0][0] + y * t[0][1] + z * t[0][2];
  const ty = x * t[1][0] + y * t[1][1] + z * t[1][2];
  const tz = x * t[2][0] + y * t[2][1] + z * t[2][2];

  return [
    [t[0][0], t[1][0], t[2][0], 0], // col 0
    [t[0][1], t[1][1], t[2][1], 0], // col 1
    [t[0][2], t[1][2], t[2][2], 0], // col 2
    [tx, ty, tz, 1], // col 3
  ];
};
