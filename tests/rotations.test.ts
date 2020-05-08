import { Transform, map, Point } from '../src/index';

describe('Rotations X',() => {

  test('Rotation around X maps of -90 degrees maps a point on Z to another point on Y (clockwise)', () => {
    const ang = - Math.PI / 2;
    const p1 = new Point(0.0, 0.0, 1.0);
    const rotX = map(Transform.fromRotationX(ang));
    const p2 = rotX(p1);
    const p2RotX = new Point(0.0, 1.0, 0.0);
    expect(Point.equals(p2,p2RotX)).toBe(true);
  });

  test('Rotation around X of 90 degrees maps a point on Z to another point on -Y (anticlockwise)', () => {
    const ang = Math.PI / 2;
    const p1 = new Point(0.0, 0.0, 1.0);
    const rotX = map(Transform.fromRotationX(ang));
    const p2 = rotX(p1);
    const p2RotX = new Point(0.0, -1.0, 0.0);
    expect(Point.equals(p2,p2RotX)).toBe(true);
  });

  test('Inverse rotation around X of 90 degrees maps a point on Z to another point on Y (anticlockwise)', () => {
    const ang = Math.PI / 2;
    const p1 = new Point(0.0, 0.0, 1.0);
    const rotX = map(Transform.fromRotationX(ang).inverse());
    const p2 = rotX(p1);
    const p2RotX = new Point(0.0, 1.0, 0.0);
    expect(Point.equals(p2,p2RotX)).toBe(true);
  });

  test('Inverse rotation around X of -90 degrees maps a point on Z to another point on -Y (clockwise)', () => {
    const ang = - Math.PI / 2;
    const p1 = new Point(0.0, 0.0, 1.0);
    const rotX = map(Transform.fromRotationX(ang).inverse());
    const p2 = rotX(p1);
    const p2RotX = new Point(0.0, -1.0, 0.0);
    expect(Point.equals(p2,p2RotX)).toBe(true);
  });

});

describe('Rotations Y',() => {

  test('Rotation around Y maps of -90 degrees maps a point on X to another point on Z (anticlockwise)', () => {
    const ang = - Math.PI / 2;
    const p1 = new Point(1.0, 0.0, 0.0);
    const rotX = map(Transform.fromRotationY(ang));
    const p2 = rotX(p1);
    const p2RotX = new Point(0.0, 0.0, 1.0);
    expect(Point.equals(p2,p2RotX)).toBe(true);
  });

  test('Inverse rotation around X of -90 degrees maps a point on X to another point on -Z (anticlockwise)', () => {
    const ang = - Math.PI / 2;
    const p1 = new Point(1.0, 0.0, 0.0);
    const rotX = map(Transform.fromRotationY(ang).inverse());
    const p2 = rotX(p1);
    const p2RotX = new Point(0.0, 0.0, -1.0);
    expect(Point.equals(p2,p2RotX)).toBe(true);
  });


  test('Rotation around Y of 90 degrees maps a point on X to another point on -Z (clockwise)', () => {
    const ang = Math.PI / 2;
    const p1 = new Point(1.0, 0.0, -.0);
    const rotX = map(Transform.fromRotationY(ang));
    const p2 = rotX(p1);
    const p2RotX = new Point(0.0, 0.0, -1.0);
    expect(Point.equals(p2,p2RotX)).toBe(true);
  });

  test('Inverse rotation around Y of 90 degrees maps a point on Z to another point on Z (clockwise)', () => {
    const ang = Math.PI / 2;
    const p1 = new Point(1.0, 0.0, 0.0);
    const rotX = map(Transform.fromRotationY(ang).inverse());
    const p2 = rotX(p1);
    const p2RotX = new Point(0.0, 0.0, 1.0);
    expect(Point.equals(p2,p2RotX)).toBe(true);
  });


});
