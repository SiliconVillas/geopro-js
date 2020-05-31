import { Project, map, Point } from '../src/index';

describe('Project', () => {
  test('Create a basic Projection transformation', () => {
    const prj = map(new Project(Math.PI / 2));
    const p = new Point(0, 2, 2);
    const o = new Point(0, 20, 20);
    const p1 = prj(p);
    const o1 = prj(o);
    expect(Point.equals(p1, o1)).toBe(true);
  });

  test('Create a basic Projection transformation on XY', () => {
    const prj = map(Project.fromPerspectiveOnXY(1, Math.PI / 2));
    const p = new Point(5, 2, 2);
    const o = new Point(50, 20, 20);
    const p1 = prj(p);
    const o1 = prj(o);
    expect(Point.equals(p1, o1)).toBe(true);
  });

  test('Create a basic Orthographic transformation on XY', () => {
    const ortho1 = map(Project.fromOrthographicOnXY(1, Math.PI / 2));
    const ortho2 = map(Project.fromOrthographicOnXY(2, Math.PI / 2));
    const p = new Point(24, 23, 120);
    const o1 = new Point(24, 23, 1);
    const o2 = new Point(24 / 2, 23 / 2, 2);
    const p1 = ortho1(p);
    const p2 = ortho2(p);
    expect(Point.equals(p1, o1)).toBe(true);
    expect(Point.equals(p2, o2)).toBe(true);
  });

  test('Create a basic Orthographic transformation on XZ', () => {
    const ortho1 = map(Project.fromOrthographicOnXZ(1, Math.PI / 2));
    const ortho2 = map(Project.fromOrthographicOnXZ(0.5, Math.PI / 2));
    const p = new Point(24, 123, 23);
    const o1 = new Point(24, 1, 23);
    const o2 = new Point(24 / 0.5, 0.5, 23 / 0.5);
    const p1 = ortho1(p);
    const p2 = ortho2(p);
    expect(Point.equals(p1, o1)).toBe(true);
    expect(Point.equals(p2, o2)).toBe(true);
  });

  test('Create a basic Orthographic transformation on YZ', () => {
    const ortho1 = map(Project.fromOrthographicOnYZ(1, Math.PI / 2));
    const ortho2 = map(Project.fromOrthographicOnYZ(100, Math.PI / 2));
    const p = new Point(24, 123, 23);
    const o1 = new Point(1, 123, 23);
    const o2 = new Point(100, 123 / 100, 23 / 100);
    const p1 = ortho1(p);
    const p2 = ortho2(p);
    expect(Point.equals(p1, o1)).toBe(true);
    expect(Point.equals(p2, o2)).toBe(true);
  });
});
