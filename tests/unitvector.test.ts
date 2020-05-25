import { UnitVector, isUnitVector } from '../src/unitvector';
import { Vector, map, Transform } from '../src';

describe('Basic UnitVector', () => {
  test('Build a UnitVector with 3 coordinates', () => {
    const v1 = new Vector(1.0, 0.0, 0.0);
    const v2 = new Vector(0.0, 0.0, 100.0);
    const uv1 = UnitVector.fromVector(v1);
    const uv2 = UnitVector.fromVector(v2);
    expect(uv1.x).toBe(1.0);
    expect(uv1.y).toBe(0.0);
    expect(uv1.z).toBe(0.0);
    expect(uv2.x).toBe(0.0);
    expect(uv2.y).toBe(0.0);
    expect(uv2.z).toBe(1.0);
    expect(uv1.length).toBe(1.0);
    expect(uv1.isUnitVector).toBe(true);
    expect(isUnitVector(uv1)).toBe(true);
  });

  test('Build a UnitVector and get its coordinates', () => {
    const v = UnitVector.fromVector(new Vector(12345.0, 0.0, 0.0));
    expect(v.coordinates).toEqual([1.0, 0.0, 0.0, 0.0]);
  });

  test('Build two UnitVectors check if they are equals', () => {
    const v1 = UnitVector.fromVector(new Vector(1.0, 1.0, 1.0));
    const v2 = UnitVector.fromVector(new Vector(10984.0, 10984.0, 10984.0));
    expect(UnitVector.equals(v1, v2)).toBe(true);
    expect(UnitVector.notEquals(v1, v2)).toBe(false);
  });

  test('Build two UnitVectors check if they are equals', () => {
    const v1 = UnitVector.fromVector(new Vector(1.0, 1.0001, 1.0));
    const v2 = UnitVector.fromVector(new Vector(1.0, 1.0, 1.0));
    expect(UnitVector.equals(v1, v2)).toBe(false);
    expect(UnitVector.notEquals(v1, v2)).toBe(true);
  });

  test('Check cross product between 2 vectors', () => {
    const v1 = UnitVector.fromVector(new Vector(1, 0, 0));
    const v2 = UnitVector.fromVector(new Vector(0, 1, 0));
    const v3 = UnitVector.crossProduct(v1, v2);
    const expV3 = UnitVector.fromVector(new Vector(0, 0, 1));
    expect(UnitVector.equals(v3, expV3)).toBe(true);
  });

  test('Check dot product between 2 vectors', () => {
    const v1 = UnitVector.fromVector(new Vector(1, 0, 0));
    const v2 = UnitVector.fromVector(new Vector(0, 1, 0));
    const v3 = UnitVector.fromVector(new Vector(0, 0, 1));
    const res1 = UnitVector.dotProduct(v1, v2);
    const res2 = UnitVector.dotProduct(v1, v3);
    const res3 = UnitVector.dotProduct(v2, v3);
    expect(res1).toBe(0.0);
    expect(res2).toBe(0.0);
    expect(res3).toBe(0.0);
  });

  test('Angle between unit vectors', () => {
    const v1 = UnitVector.fromVector(new Vector(1, 0, 0));
    const v2 = UnitVector.fromVector(new Vector(0, 1, 0));
    const rad = UnitVector.angleBetween(v1, v2);
    expect(rad).toBe(Math.PI / 2);
  });
});

describe('InitVector transformations', () => {
  test('Translating a UnitVector has no effect', () => {
    const translate = map(Transform.fromTranslation(2.0, 2.0, 2.0));
    const v1 = UnitVector.fromVector(new Vector(12, 17, 22));
    const v2 = translate(v1) as UnitVector;
    expect(UnitVector.equals(v1, v2)).toBe(true);
  });

  test('Rotation around X of -90 degrees maps a unit-vector Z to another unit-vector on Y (clockwise)', () => {
    const ang = -Math.PI / 2;
    const v1 = UnitVector.fromVector(new Vector(0.0, 0.0, 1.0));
    const rotX = map(Transform.fromRotationX(ang));
    const v2 = rotX(v1) as UnitVector;
    const v2RotX = UnitVector.fromVector(new Vector(0.0, 1.0, 0.0));
    expect(UnitVector.equals(v2, v2RotX)).toBe(true);
  });

  test('Rotation around X of 90 degrees maps a unit-vector Z to another unit-vector on -Y (anticlockwise)', () => {
    const ang = Math.PI / 2;
    const v1 = UnitVector.fromVector(new Vector(0.0, 0.0, 1.0));
    const rotX = map(Transform.fromRotationX(ang));
    const v2 = rotX(v1) as UnitVector;
    const p2RotX = UnitVector.fromVector(new Vector(0.0, -1.0, 0.0));
    expect(UnitVector.equals(v2, p2RotX)).toBe(true);
  });
});
