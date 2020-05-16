import { Transform, compose } from '../src';
import { matrixEqual } from '../src/math';

describe('compose', () => {
  test('compose no transformation get identity', () => {
    const id = new Transform();
    const cmp = compose();
    expect(matrixEqual(id.directMatrix, cmp.directMatrix)).toBe(true);
    expect(matrixEqual(id.inverseMatrix, cmp.inverseMatrix)).toBe(true);
  });
});
