
import { Transform, map, Point, Vector } from '../src/index';

describe('Basic Points and Transformations', () => {

  test('Build a point with 3 coordinates', () => {
    const p = new Point(1.0, 3.4, 5.6);
    expect(p.x).toBe(1.0);
    expect(p.y).toBe(3.4);
    expect(p.z).toBe(5.6);
  });

  test('Build a point and get its coordinates', () => {
    const p = new Point(1.0, 3.4, 5.6);
    expect(p.coordinates).toEqual([1.0, 3.4, 5.6, 1.0]);
  });

  test('Build two vectors check if they are equals', () => {
    const p1 = new Point(1.0, 3.4, 5.6);
    const p2 = new Point(1.000001, 3.4000001, 5.59999999);
    expect(Point.equals(p1,p2)).toBe(true);
    expect(Point.notEquals(p1,p2)).toBe(false);
  });

  test('Build a vector and get its coordinates', () => {
    const p1 = new Point(1.0, 3.4, 5.6);
    const p2 = new Point(1.001, 3.4000001, 5.59999999);
    expect(Point.equals(p1,p2)).toBe(false);
    expect(Point.notEquals(p1,p2)).toBe(true);
  });

  test('Add a vector to a point to get a new point', () => {
    const p1 = new Point(10,10,10);
    const v1 = new Vector(3,6,2);
    const p2 = Point.add(v1, p1);
    expect(p2.x).toEqual(10+3);
    expect(p2.y).toEqual(10+6);
    expect(p2.z).toEqual(10+2);
  });

  test('Identity transformation keeps point positions', () => {
    const p = new Point(1.0, 3.4, 5.6);
    const t = new Transform();
    const p1 = map(t,p);
    expect(p1.x).toEqual(p.x);
    expect(p1.y).toEqual(p.y);
    expect(p1.z).toEqual(p.z);
  });

  test('Identity inverse keeps point position', () => {
    const p = new Point(1.0, 3.4, 5.6);
    const t = Transform.byInverting(new Transform());
    const p1 = map(t,p);
    expect(p1.x).toEqual(p.x);
    expect(p1.y).toEqual(p.y);
    expect(p1.z).toEqual(p.z);
  });

  test('Inverting Identity keeps point position', () => {
    const p = new Point(1.0, 3.4, 5.6);
    const t = new Transform();
    const p1 = map(t.inverte(),p);
    expect(p1.x).toEqual(p.x);
    expect(p1.y).toEqual(p.y);
    expect(p1.z).toEqual(p.z);
  });
});
