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
    const translate = compose(trans2, trans1).invert();
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
    ).invert();
    const p2 = map(rotX, p1) as Point;
    const p2RotX = new Point(0.0, 1.0, 0.0);
    expect(Point.equals(p2, p2RotX)).toBe(true);
  });

  test('Composing translation and rotation brings the correct result', () => {
    const ang = Math.PI / 2;
    const rotX = Transform.fromRotationX(ang);
    const rotY = Transform.fromRotationY(-ang);
    const trnZ = Transform.fromTranslation(0, 0, 1);
    const p1 = new Point(0.0, 0.0, 0.0);
    const transRot = compose(
      trnZ.invert(),
      rotX.invert(),
      rotY.invert(),
      rotY,
      rotX,
      trnZ
    );

    const applyTransRot = map(transRot);

    const p2 = applyTransRot(p1) as Point;

    const p3 = map(rotY, map(rotX, p1.map(trnZ))) as Point;
    const p4 = map(
      trnZ.invert(),
      map(rotX.invert(), p3.map(rotY.invert()))
    ) as Point;
    expect(Point.equals(p2, p4)).toBe(true);
  });

  test('Composing transformations brings the correct result', () => {
    const ang = Math.PI / 4;
    const rotX = Transform.fromRotationX(ang);
    const rotY = Transform.fromRotationY(ang);
    const rotZ = Transform.fromRotationZ(ang);
    const trn = Transform.fromTranslation(12, 15, 120);
    const scl = Transform.fromScale(12, 5, 20);
    const transRotDir = map(compose(rotZ, rotY, rotX, scl, trn));
    const transRotDirInv = map(compose(rotZ, rotY, rotX, scl, trn).invert());
    const transRotInv = map(
      compose(
        trn.invert(),
        scl.invert(),
        rotX.invert(),
        rotY.invert(),
        rotZ.invert()
      )
    );
    const p1 = new Point(10.0, 20.0, 30.0);

    const p2 = transRotInv(transRotDir(p1)) as Point;
    const p3 = transRotDirInv(transRotDir(p1)) as Point;
    expect(Point.equals(p1, p2)).toBe(true);
    expect(Point.equals(p1, p3)).toBe(true);
  });
});
