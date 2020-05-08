
import { Transform, map, Point } from '../src/index';

describe('Basic Points and Transformations', () => {

  test('Build a point with 3 coordinates', () => {
    const p = new Point(1.0, 3.4, 5.6);
    expect(p.x).toBe(1.0);
    expect(p.y).toBe(3.4);
    expect(p.z).toBe(5.6);
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
    const p1 = map(t.inverse(),p);
    expect(p1.x).toEqual(p.x);
    expect(p1.y).toEqual(p.y);
    expect(p1.z).toEqual(p.z);
  });
});
