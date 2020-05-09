import { Vector, Frame, Point, map, UnitVector } from "../src";
import { pipe } from "ramda";

describe('Frame',() => {

  test('Building a frame on Origin', () => {
    const o = new Point(0.0, 0.0, 0.0);
    const v1 = new Vector(0.0, 0.0, 1.0);
    const v2 = new Vector(1.0, 0.0, 0.0);
    const frame = Frame.from2Vectors(o, v1, v2);
    expect(Vector.equals(frame.k, v1)).toBe(true);
  });

  test('Map a point into a Frame of reference', () => {
    const o = new Point(10.0, 10.0, 10.0);
    const p = new Point(11.0, 11.0, 11.0);
    const v1 = new Vector(0.0, 0.0, 1.0);
    const v2 = new Vector(1.0, 0.0, 0.0);
    const frame = Frame.from2Vectors(o, v1, v2);
    const p1 = map(frame,p);
    // p1 coordinates are p relative to the frame
    expect(Point.equals(p1, new Point(1,1,1))).toBe(true);
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
      Point.add(frame.k.multiplyBy(p.z)),
    )(origin);

    const relativeToFrame = (f: Frame) => Point.adds([f.i.multiplyBy(p.x), f.j.multiplyBy(p.y), f.k.multiplyBy(p.z) ]);
    const p2 = relativeToFrame(frame)(origin);

    const p3 = Point.relative(frame, 1.0, 1.0, 1.0);

    // p1 coordinates are p relative to the global frame
    const absP = new Point(11,11,11);
    expect(Point.equals(p1, absP)).toBe(true);
    expect(Point.equals(p2, absP)).toBe(true);
    expect(Point.equals(p3, absP)).toBe(true);
  });

  test('Map a point into a Frame of reference', () => {
    const o = new Point(10.0, 10.0, 10.0);
    const p = new Point(9.0, 9.0, 9.0);
    const v1 = new Vector(0.0, 0.0, -1.0);
    const v2 = new Vector(-1.0, 0.0, 0.0);
    const frame = Frame.from2Vectors(o, v1, v2);
    const p1 = map(frame,p);
    // p1 coordinates are p relative to the frame
    expect(Point.equals(p1, new Point(1,-1,1))).toBe(true);
  });

  test('Map a vector Z into a Frame of reference', () => {
    const o = new Point(10.0, 10.0, 10.0);
    const fz = new Vector(0.0, 0.0, -1.0);
    const fx = new Vector(1.0, 0.0, 0.0);
    const frame = Frame.from2Vectors(o, fz, fx);
    const fv = map(frame, new Vector(0,0,1));
    expect(Vector.equals(fv, new Vector(0,0,-1))).toBe(true);
  });

  test('Map a vector Z into a Frame of reference', () => {
    const o = new Point(10.0, 10.0, 10.0);
    const fz = new Vector(1.0, 0.0, 0.0);
    const fx = new Vector(0.0, 0.0, -1.0);
    const frame = Frame.from2Vectors(o, fz, fx);
    const fv = map(frame, new Vector(0,0,1));
    expect(Vector.equals(fv, new Vector(1,0,0))).toBe(true);
  });

  test('Map a unit-vector Z into a Frame of reference', () => {
    const o = new Point(10.0, 10.0, 10.0);
    const fz = new Vector(0.0, 0.0, -1.0);
    const fx = new Vector(1.0, 0.0, 0.0);
    const frame = Frame.from2Vectors(o, fz, fx);
    const fv = map(frame, UnitVector.fromVector(new Vector(0,0,1)));
    expect(UnitVector.equals(fv, UnitVector.fromVector(new Vector(0,0,-1)))).toBe(true);
  });

  test('Map a unit-vector Z into a Frame of reference', () => {
    const o = new Point(10.0, 10.0, 10.0);
    const fz = new Vector(1.0, 0.0, 0.0);
    const fx = new Vector(0.0, 0.0, -1.0);
    const frame = Frame.from2Vectors(o, fz, fx);
    const fv = map(frame, UnitVector.fromVector(new Vector(0,0,1)));
    expect(UnitVector.equals(fv, UnitVector.fromVector(new Vector(1,0,0)))).toBe(true);
  });

});
