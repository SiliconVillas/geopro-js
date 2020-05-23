import { Project, map, Point } from '../src/index';

describe('Project', () => {
  test('Create a basic Projection transformation', () => {
    const prj = map(new Project(Math.PI / 2));
    const p = new Point(0, 2, 2);
    const o = new Point(0, 20, 20);
    const p1 = prj(p) as Point;
    const o1 = prj(o) as Point;
    expect(Point.equals(p1, o1)).toBe(true);
  });
});
