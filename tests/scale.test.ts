import { Transform, map, Point } from '../src/index';

describe('Rotations',() => {

  test('The scale transform multiply the point coordinates', () => {
    const p1 = new Point(1.0, 2.0, 4.0);
    const scale = map(Transform.fromScale(2.0, 2.0, 2.0));
    const p2 = scale(p1);
    const testP2 = new Point(2.0, 4.0, 8.0);
    expect(Point.equals(p2,testP2)).toBe(true);
 });

 test('The inverse scale transform divides the point coordinates', () => {
    const p1 = new Point(1.0, 2.0, 4.0);
    const scale = map(Transform.fromScale(2.0, 2.0, 2.0).inverte());
    const p2 = scale(p1);
    const testP2 = new Point(0.5, 1.0, 2.0);
    expect(Point.equals(p2,testP2)).toBe(true);
 });

});