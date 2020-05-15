import { Vector, Frame, Point, map, UnitVector, Transform } from '../src';
import { pipe } from 'ramda';
import { matrixEqual, matrixMultiply } from '../src/math';

describe('Frame', () => {
  test('Frame on Origin: Check matrix and inverse are correct', () => {
    const ang = Math.PI / 4;
    const o = new Point(0.0, 0.0, 0.0);
    const v1 = new Vector(0.0, 0.0, 1.0);
    const v2 = new Vector(Math.sin(ang), Math.cos(ang), 0.0);
    const frame = Frame.from2Vectors(o, v1, v2);

    const identity = new Transform();
    const expId = matrixMultiply(frame.directMatrix, frame.inverseMatrix);
    expect(matrixEqual(expId, identity.directMatrix)).toBe(true);
  });

  test('Frame off Origin: Check matrix and inverse are correct', () => {
    const ang = Math.PI / 4;
    const o = new Point(1.0, 1.0, 1.0);
    const v1 = new Vector(0.0, 0.0, 1.0);
    const v2 = new Vector(Math.sin(ang), Math.cos(ang), 0.0);
    const frame = Frame.from2Vectors(o, v1, v2);

    const identity = new Transform();
    const expId = matrixMultiply(frame.directMatrix, frame.inverseMatrix);
    expect(matrixEqual(expId, identity.directMatrix)).toBe(true);
  });

  test('Building a frame on Origin aligned along the axis: transformation is Identity', () => {
    const o = new Point(0.0, 0.0, 0.0);
    const v1 = new Vector(0.0, 0.0, 1.0);
    const v2 = new Vector(1.0, 0.0, 0.0);
    const frame = Frame.from2Vectors(o, v1, v2);
    expect(Vector.equals(frame.k, v1)).toBe(true);
    expect(Point.equals(frame.origin, o)).toBe(true);
    const id = new Transform();
    expect(matrixEqual(id.directMatrix, frame.directMatrix)).toBe(true);
    expect(matrixEqual(id.inverseMatrix, frame.inverseMatrix)).toBe(true);
    expect(frame.direct(0, 0)).toEqual(1.0);
    expect(frame.inverse(0, 0)).toEqual(1.0);
  });

  test('Map a point into a Frame of reference', () => {
    const o = new Point(10.0, 10.0, 10.0);
    const p = new Point(11.0, 11.0, 11.0);
    const v1 = new Vector(0.0, 0.0, 1.0);
    const v2 = new Vector(1.0, 0.0, 0.0);
    const frame = Frame.from2Vectors(o, v1, v2);
    const p1 = map(frame, p) as Point;
    // p1 coordinates are p relative to the frame
    expect(Point.equals(p1, new Point(1, 1, 1))).toBe(true);
  });

  test('Map a point from a Frame of reference using its unit-vectors', () => {
    const origin = new Point(10.0, 10.0, 10.0);
    const v1 = new Vector(0.0, 0.0, 1.0);
    const v2 = new Vector(1.0, 0.0, 0.0);
    const frame = Frame.from2Vectors(origin, v1, v2);
    const p = new Point(1.0, 1.0, 1.0); // Relative to frame
    const p1 = pipe(
      Point.add(frame.i.multiplyBy(p.x)),
      Point.add(frame.j.multiplyBy(p.y)),
      Point.add(frame.k.multiplyBy(p.z))
    )(origin);

    const relativeToFrame = (f: Frame) =>
      Point.adds([
        f.i.multiplyBy(p.x),
        f.j.multiplyBy(p.y),
        f.k.multiplyBy(p.z),
      ]);
    const p2 = relativeToFrame(frame)(origin);

    const p3 = Point.relative(frame, p.coordinates);

    // p1 coordinates are p relative to the global frame
    const absP = new Point(11, 11, 11);
    expect(Point.equals(p1, absP)).toBe(true);
    expect(Point.equals(p2, absP)).toBe(true);
    expect(Point.equals(p3, absP)).toBe(true);
  });

  test('Map a point into a Frame of reference', () => {
    const o = new Point(10.0, 10.0, 10.0);
    const v1 = new Vector(0.0, 0.0, -1.0);
    const v2 = new Vector(-1.0, 0.0, 0.0);
    const frame = Frame.from2Vectors(o, v1, v2);

    const p = new Point(9.0, 9.0, 9.0);
    const p1 = map(frame, p) as Point;
    const expP1InFrame = new Point(1, -1, 1);
    // p1 coordinates are p relative to the frame
    expect(Point.equals(p1, expP1InFrame)).toBe(true);

    // get p2 as relative point in frame
    const p2 = Point.relative(frame, p1.coordinates);
    expect(Point.equals(p2, p)).toBe(true);
  });

  test('Map a vector Z into a Frame of reference Z = (0,0,-1)', () => {
    const o = new Point(10.0, 10.0, 10.0);
    const fz = new Vector(0.0, 0.0, -1.0);
    const fx = new Vector(1.0, 0.0, 0.0);
    const frame = Frame.from2Vectors(o, fz, fx);

    // Convert a vector v1 to the frame
    const v0 = new Vector(0, 0, 1);
    const expV1InFrame = new Vector(0, 0, -1);
    const v1 = map(frame, v0) as Vector;
    expect(Vector.equals(v1, expV1InFrame)).toBe(true);

    // Define v2 as v1 relative to the frame => expect back v0 !
    const v2 = Vector.relative(frame, v1.coordinates);
    expect(Vector.equals(v2, v0));
  });

  test('Map a vector Z into a Frame of reference Z = (1,0,0)', () => {
    const o = new Point(10.0, 10.0, 10.0);
    const fz = new Vector(1.0, 0.0, 0.0);
    const fx = new Vector(0.0, 0.0, -1.0);
    const frame = Frame.from2Vectors(o, fz, fx);

    // Convert a vector v1 to the frame
    const v0 = new Vector(0, 0, 1);

    const expV1InFrame = new Vector(-1, 0, 0);
    const v1 = map(frame, v0) as Vector;
    expect(Vector.equals(v1, expV1InFrame)).toBe(true);

    // Generate v2 relative to the frame
    const v2 = Vector.relative(frame, v1.coordinates);
    expect(Vector.equals(v2, v0)).toBe(true);
  });

  test('Map a unit-vector Z into a Frame of reference', () => {
    const o = new Point(10.0, 10.0, 10.0);
    const fz = new Vector(0.0, 0.0, -1.0);
    const fx = new Vector(1.0, 0.0, 0.0);
    const frame = Frame.from2Vectors(o, fz, fx);

    // Transform v1 into a vector relative to the frame
    const v0 = UnitVector.fromVCoords([0, 0, 1, 0]);
    const expectedV1InFrame = UnitVector.fromVCoords([0, 0, -1, 0]);
    const v1 = map(frame, v0) as UnitVector;
    expect(UnitVector.equals(v1, expectedV1InFrame)).toBe(true);

    // Generate v2 as relative to the frame
    const v2 = UnitVector.relative(frame, v1.coordinates);
    expect(UnitVector.equals(v2, v0)).toBe(true);
  });

  test('Map a unit-vector Z into a Frame of reference', () => {
    const o = new Point(10.0, 10.0, 10.0);
    const fz = new Vector(1.0, 0.0, 0.0);
    const fx = new Vector(0.0, 0.0, -1.0);
    const frame = Frame.from2Vectors(o, fz, fx);

    const v0 = new Vector(0, 0, -1);
    const expV1InFrame = new Vector(1, 0, 0);
    const v1 = map(frame, UnitVector.fromVector(v0)) as UnitVector;
    expect(UnitVector.equals(v1, UnitVector.fromVector(expV1InFrame))).toBe(
      true
    );

    // Generate v2 as relative to the frame
    const v2 = UnitVector.relative(frame, v1.coordinates);
    expect(UnitVector.equals(v2, UnitVector.fromVector(v0))).toBe(true);
  });
});
