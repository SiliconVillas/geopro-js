import { Transform, map, Point, Vector, UnitVector } from '../src/index';
import { isPoint } from '../src/point';

describe('Basic Points and Transformations', () => {
  test('Build a point with 3 coordinates', () => {
    const p = new Point(1.0, 3.4, 5.6);
    expect(p.x).toBe(1.0);
    expect(p.y).toBe(3.4);
    expect(p.z).toBe(5.6);
    expect(p.isPoint).toBe(true);
    expect(isPoint(p)).toBe(true);
  });

  test('Build a point and get its coordinates', () => {
    const p = new Point(1.0, 3.4, 5.6);
    expect(p.coordinates).toEqual([1.0, 3.4, 5.6, 1.0]);
  });

  test('Build two vectors check if they are equals', () => {
    const p1 = new Point(1.0, 3.4, 5.6);
    const p2 = new Point(1.000001, 3.4000001, 5.59999999);
    expect(Point.equals(p1, p2)).toBe(true);
    expect(Point.notEquals(p1, p2)).toBe(false);
  });

  test('Build a vector and get its coordinates', () => {
    const p1 = new Point(1.0, 3.4, 5.6);
    const p2 = new Point(1.001, 3.4000001, 5.59999999);
    expect(Point.equals(p1, p2)).toBe(false);
    expect(Point.notEquals(p1, p2)).toBe(true);
  });

  test('Add a vector to a point to get a new point', () => {
    const p1 = new Point(10, 10, 10);
    const v1 = new Vector(3, 6, 2);
    const p2 = Point.add(v1, p1);
    expect(p2.x).toEqual(10 + 3);
    expect(p2.y).toEqual(10 + 6);
    expect(p2.z).toEqual(10 + 2);
  });

  test('Identity transformation keeps point positions', () => {
    const p = new Point(1.0, 3.4, 5.6);
    const t = new Transform();
    const p1 = map(t, p);
    expect(p1.x).toEqual(p.x);
    expect(p1.y).toEqual(p.y);
    expect(p1.z).toEqual(p.z);
  });

  test('Identity inverse keeps point position', () => {
    const p = new Point(1.0, 3.4, 5.6);
    const t = Transform.byInverting(new Transform());
    const p1 = map(t, p);
    expect(p1.x).toEqual(p.x);
    expect(p1.y).toEqual(p.y);
    expect(p1.z).toEqual(p.z);
  });

  test('Inverting Identity keeps point position', () => {
    const p = new Point(1.0, 3.4, 5.6);
    const t = new Transform();
    const p1 = map(t.inverte(), p);
    expect(p1.x).toEqual(p.x);
    expect(p1.y).toEqual(p.y);
    expect(p1.z).toEqual(p.z);
  });
});

describe('Point operations', () => {
  test('Compute a point along a direction', () => {
    const start = new Point(1, 1, 1);
    const dir = UnitVector.fromVector(new Vector(0, 0, 1));
    const t = 10;
    const p = Point.along(t, dir, start);

    const v = dir.multiplyBy(t);
    const p2 = Point.add(v, start);
    const expP = new Point(1, 1, 11);
    expect(Point.equals(p, expP)).toBe(true);
    expect(Point.equals(p, p2)).toBe(true);
  });

  test('Compute a point along a direction', () => {
    const p0 = new Point(1, 1, 1);
    const v0 = new Vector(1, 2, 3);
    const v1 = new Vector(3, 2, 1);
    const uv = UnitVector.fromVector(new Vector(1, 1, 1));

    const p1 = Point.add(v0, p0); // Compute p1 = p + v
    const p2 = Point.add(v1, p1); // Compute p2 = p1 + v
    const v = Vector.fromPoints(p2, p0); // Compute v1 = p2 - p
    const pt = Point.add(v.multiplyBy(0.5), p0); // Compute p(t) = p + t * v

    const expPt = new Point(1 + 4 / 2, 1 + 4 / 2, 1 + 4 / 2);

    expect(Point.equals(pt, expPt)).toBe(true);
  });
});
