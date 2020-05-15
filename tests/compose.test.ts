import { Transform, map, Point, compose } from '../src/index';

describe('Compose', () => {
  test('Composing translations brings the correct result', () => {
    const p1 = new Point(0.0, 0.0, 0.0);
    const trans1 = Transform.fromTranslation(0.0, 0.0, 1.0);
    const trans2 = Transform.fromTranslation(0.0, 1.0, 0.0);
    const translate = compose(trans2, trans1);
    const p2 = map(translate, p1) as Point;
    const expP2 = new Point(0.0, 1.0, 1.0);
    expect(Point.equals(p2, expP2)).toBe(true);
  });

  test('Composing translations and invert brings the correct result', () => {
    const p1 = new Point(0.0, 1.0, 1.0);
    const trans1 = Transform.fromTranslation(0.0, 0.0, 1.0);
    const trans2 = Transform.fromTranslation(0.0, 1.0, 0.0);
    const translate = compose(trans2, trans1).inverte();
    const p2 = map(translate, p1) as Point;
    const expP2 = new Point(0.0, 0.0, 0.0);
    expect(Point.equals(p2, expP2)).toBe(true);
  });

  test('Composing rotations brings the correct result', () => {
    const ang = Math.PI / 4;
    const p1 = new Point(0.0, 0.0, 1.0);
    const rotX = compose(
      Transform.fromRotationX(ang),
      Transform.fromRotationX(ang)
    );
    const p2 = map(rotX, p1) as Point;
    const p2RotX = new Point(0.0, -1.0, 0.0);
    expect(Point.equals(p2, p2RotX)).toBe(true);
  });

  test('Composing rotations and invert brings the correct result', () => {
    const ang = Math.PI / 4;
    const p1 = new Point(0.0, 0.0, 1.0);
    const rotX = compose(
      Transform.fromRotationX(ang),
      Transform.fromRotationX(ang)
    ).inverte();
    const p2 = map(rotX, p1) as Point;
    const p2RotX = new Point(0.0, 1.0, 0.0);
    expect(Point.equals(p2, p2RotX)).toBe(true);
  });

  test('Composing translation and rotation brings the correct result', () => {
    const ang = Math.PI / 2;
    const rotX = Transform.fromRotationX(ang);
    const trnZ = Transform.fromTranslation(0, 0, 1);
    const p1 = new Point(0.0, 0.0, 0.0);
    const transRotation = compose(rotX, trnZ);
    const p2a = map(transRotation, p1) as Point;
    const p2b = map(rotX, map(trnZ, p1)) as Point;
    expect(Point.equals(p2a, p2b)).toBe(true);
  });
});
