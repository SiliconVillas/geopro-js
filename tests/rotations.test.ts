import { Transform, map, Point } from '../src/index';

describe('Rotations',() => {

  test('Rotation maps a axes point to another axis using -90 degree (anticlockwise)', () => {
    const ang = - Math.PI / 2;
    const p1 = new Point(0.0, 0.0, 1.0);
    const rotX = map(Transform.fromRotationX(ang));
    const p2 = rotX(p1);
    const p2RotX = new Point(0.0, 1.0, 0.0);
    expect(p2).toEqual(p2RotX);
  });

  test('Rotation maps a axes point to another axis using -90 degree (anticlockwise)', () => {
    const ang = Math.PI / 2;
    const p1 = new Point(0.0, 0.0, 1.0);
    const rotX = map(Transform.fromRotationX(ang));
    const p2 = rotX(p1);
    const p2RotX = new Point(0.0, -1.0, 0.0);
    expect(p2).toEqual(p2RotX);
  });

  test('Inverse rotation maps a axes point to another axis using 90 degree (anticlockwise)', () => {
    const ang = Math.PI / 2;
    const p1 = new Point(0.0, 0.0, 1.0);
    const rotX = map(Transform.fromRotationX(ang).inverse());
    const p2 = rotX(p1);
    const p2RotX = new Point(0.0, 1.0, 0.0);
    expect(p2).toEqual(p2RotX);
  });

  test('Inverse rotation maps a axes point to another axis using -90 degree (anticlockwise)', () => {
    const ang = - Math.PI / 2;
    const p1 = new Point(0.0, 0.0, 1.0);
    const rotX = map(Transform.fromRotationX(ang).inverse());
    const p2 = rotX(p1);
    const p2RotX = new Point(0.0, -1.0, 0.0);
    expect(p2).toEqual(p2RotX);
  });

})