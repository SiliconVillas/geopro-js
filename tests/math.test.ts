import { Matrix } from '../src/types';
import { matrixEqual, round } from '../src/math';

describe('Math', () => {
  test('Two matrices are different', () => {
    const m1: Matrix = [
      [10, 0, 0, 1],
      [20, 1, 1, 9],
      [20, 1, 1, 9],
      [20, 1, 1, 9],
    ];
    const m2: Matrix = [
      [10, 0, 0, 1],
      [20, 1, 1, 9],
      [20, 1.02, 1, 9],
      [20, 1, 1, 9],
    ];
    expect(matrixEqual(m1, m2)).toBe(false);
  });

  test('rounding a number', () => {
    const round2 = round(2);
    expect(round2(0.004)).toBe(0.0);
    expect(round2(0.006)).toBe(0.01);
  });
});
