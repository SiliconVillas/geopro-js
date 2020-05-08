import { UnitVector } from "../src/unitvector";
import { Vector } from "../src";

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
  });

  test('Build a UnitVector and get its coordinates', () => {
    const v = UnitVector.fromVector(new Vector(1.0, 0.0, 0.0));
    expect(v.coordinates).toEqual([1.0, 0.0, 0.0, 0.0]);
  });

  test('Build two UnitVectors check if they are equals', () => {
    const v1 = UnitVector.fromVector(new Vector(1.0, 1.0, 1.0));
    const v2 = UnitVector.fromVector(new Vector(10984.0, 10984.0, 10984.0));
    expect(UnitVector.equals(v1,v2)).toBe(true);
    expect(UnitVector.notEquals(v1,v2)).toBe(false);
  });

  test('Build two UnitVectors check if they are equals', () => {
    const v1 = UnitVector.fromVector(new Vector(1.0, 1.0001, 1.0));
    const v2 = UnitVector.fromVector(new Vector(1.0, 1.0, 1.0));
    expect(UnitVector.equals(v1,v2)).toBe(false);
    expect(UnitVector.notEquals(v1,v2)).toBe(true);
  });
});