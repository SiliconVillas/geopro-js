import { Transform, map, Point } from '../src/index';

describe('Translations', () => {
  test('Translate maps the origin point to another point moved by a know amount', () => {
    const translate = map(Transform.fromTranslation(10.0, 2.0, 3.0));
    const p1 = new Point(0.0, 0.0, 0.0);
    const p2 = translate(p1) as Point;
    expect(p2.x).toBe(p1.x + 10);
    expect(p2.y).toBe(p1.y + 2);
    expect(p2.z).toBe(p1.z + 3);

    const translation = Transform.fromTranslation(10.0, 2.0, 3.0);
    const p3 = p1.map(translation);

    expect(Point.equals(p2, p3)).toBe(true);
  });

  test('Translate maps a non Zero point to another point moved by a know amount', () => {
    const translate = map(Transform.fromTranslation(10.0, 2.0, 3.0));
    const p1 = new Point(10.0, 2.0, 3.0);
    const p2 = translate(p1);
    expect(p2.x).toBe(p1.x + 10);
    expect(p2.y).toBe(p1.y + 2);
    expect(p2.z).toBe(p1.z + 3);
  });
});
