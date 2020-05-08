import { Transform, map, Point, compose } from '../src/index';

describe('Compose',() => {

  test('Composing translations brings the correct result', () => {
    const p1 = new Point(0.0, 0.0, 0.0);
    const trans1 = Transform.fromTranslation(0.0, 0.0, 1.0);
    const trans2 = Transform.fromTranslation(0.0, 1.0, 0.0);
    const translate = compose(trans2,trans1);
    const p2 = map(translate,p1);
    const expP2 = new Point(0.0, 1.0, 1.0);
    expect(p2).toEqual(expP2);
  });

  test('Composing translations and invert brings the correct result', () => {
    const p1 = new Point(0.0, 1.0, 1.0);
    const trans1 = Transform.fromTranslation(0.0, 0.0, 1.0);
    const trans2 = Transform.fromTranslation(0.0, 1.0, 0.0);
    const translate = compose(trans2,trans1).inverse();
    const p2 = map(translate,p1);
    const expP2 = new Point(0.0, 0.0, 0.0);
    expect(p2).toEqual(expP2);
  });

  test('Composing rotations brings the correct result', () => {
    const ang = Math.PI / 4;
    const p1 = new Point(0.0, 0.0, 1.0);
    const rotX = compose(Transform.fromRotationX(ang), Transform.fromRotationX(ang));
    const p2 = map(rotX,p1);
    const p2RotX = new Point(0.0, -1.0, 0.0);
    expect(p2).toEqual(p2RotX);
  });

  test('Composing rotations and invert brings the correct result', () => {
    const ang = Math.PI / 4;
    const p1 = new Point(0.0, 0.0, 1.0);
    const rotX = compose(Transform.fromRotationX(ang), Transform.fromRotationX(ang)).inverse();
    const p2 = map(rotX,p1);
    const p2RotX = new Point(0.0, 1.0, 0.0);
    expect(p2).toEqual(p2RotX);
  });

  test('Composing translation and rotation brings the correct result', () => {
    const ang = Math.PI / 2;
    const rotX = Transform.fromRotationX(ang);
    const trnZ = Transform.fromTranslation(0,0,1);
    const p1 = new Point(0.0, 0.0, 0.0);
    const transRotation = compose(rotX, trnZ);
    const p2a = map(transRotation,p1);
    const p2b = map(rotX, map(trnZ, p1));
    expect(p2a).toEqual(p2b);
  });

});
