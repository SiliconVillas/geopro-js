import { Vector, Point, map, Transform } from '../src/index';

describe('Basic Vector', () => {

  test('Build a vector with 3 coordinates', () => {
    const v = new Vector(1.0, 3.4, 5.6);
    expect(v.x).toBe(1.0);
    expect(v.y).toBe(3.4);
    expect(v.z).toBe(5.6);
  });

  test('Build a vector and get its coordinates', () => {
    const v = new Vector(1.0, 3.4, 5.6);
    expect(v.coordinates).toEqual([1.0, 3.4, 5.6, 0.0]);
  });

  test('Build two vectors check if they are equals', () => {
    const v1 = new Vector(1.0, 3.4, 5.6);
    const v2 = new Vector(1.000001, 3.4000001, 5.59999999);
    expect(Vector.equals(v1,v2)).toBe(true);
    expect(Vector.notEquals(v1,v2)).toBe(false);
  });

  test('Build a vector and get its coordinates', () => {
    const v1 = new Vector(1.0, 3.4, 5.6);
    const v2 = new Vector(1.001, 3.4000001, 5.59999999);
    expect(Vector.equals(v1,v2)).toBe(false);
    expect(Vector.notEquals(v1,v2)).toBe(true);
  });

  test('Build a vector and get its length', () => {
    const v = new Vector(2.0* Math.cos(Math.PI /4), 2.0* Math.sin(Math.PI /4), 0);
    expect(v.length).toEqual(2.0);
  });

  test('Build a vector from 2 points', () => {
    const p1 = new Point(10,12,15);
    const p2 = new Point(5,2,10);
    const v = Vector.fromPoints(p1,p2);
    expect(v.x).toBe(5);
    expect(v.y).toBe(10);
    expect(v.z).toBe(5);
  });

  test('Multiple a vector by a scalar', () => {
    const v1 = new Vector(10,1,2);
    const v2 = v1.multiplyBy(10);
    expect(v2.x).toBe(100);
    expect(v2.y).toBe(10);
    expect(v2.z).toBe(20);
  });

  test('Build a vector adding 4 vectors', () => {
    const v1 = new Vector(10,10,10);
    const v2 = new Vector(-10,0,0);
    const v3 = new Vector(0,-10,0);
    const v4 = new Vector(0,0,-10);
    const vres = Vector.add(v1,v2,v3,v4)
    expect(vres.x).toBe(0);
    expect(vres.y).toBe(0);
    expect(vres.z).toBe(0);
  });

  test('Check if two parallel vectors are parallel',() => {
    const v1 = new Vector(10,10,10);
    const v2 = new Vector(-100,-100,-100);
    expect(Vector.parallel(v1, v2)).toBe(true);
  });

  test('Check if two non parallel vectors are parallel',() => {
    const v1 = new Vector(10,10,10);
    const v2 = new Vector(-101,-102,-100);
    expect(Vector.parallel(v1, v2)).toBe(false);
  });

  test('Check cross product between 2 vectors',() => {
    const v1 = new Vector(1,0,0);
    const v2 = new Vector(0,1,0);
    const v3 = Vector.crossProduct(v1, v2);
    const expV3 = new Vector(0,0,1);
    expect(Vector.equals(v3, expV3)).toBe(true);
  });

  test('Check dot product between 2 vectors',() => {
    const v1 = new Vector(1,0,0);
    const v2 = new Vector(0,1,0);
    const v3 = new Vector(0,0,1);
    const res1 = Vector.dotProduct(v1, v2);
    const res2 = Vector.dotProduct(v1, v3);
    const res3 = Vector.dotProduct(v2, v3);
    expect(res1).toBe(0.0);
    expect(res2).toBe(0.0);
    expect(res3).toBe(0.0);
  });

});


describe('Vector transformations', () => {

  test('Translating a Vector has no effect', () => {
    const translate = map(Transform.fromTranslation(2.0, 2.0, 2.0));
    const v1 = new Vector(12, 17, 22);
    const v2 = translate(v1);
    expect(Vector.equals(v1, v2)).toBe(true);
  });

  test('Rotation around X of -90 degrees maps a vector Z to another vector on Y (clockwise)', () => {
    const ang = - Math.PI / 2;
    const v1 = new Vector(0.0, 0.0, 1.0);
    const rotX = map(Transform.fromRotationX(ang));
    const v2 = rotX(v1);
    const v2RotX = new Vector(0.0, 1.0, 0.0);
    expect(Vector.equals(v2, v2RotX)).toBe(true);
  });

  test('Rotation around X of 90 degrees maps a vector Z to another vector on -Y (anticlockwise)', () => {
    const ang = Math.PI / 2;
    const v1 = new Vector(0.0, 0.0, 1.0);
    const rotX = map(Transform.fromRotationX(ang));
    const v2 = rotX(v1);
    const p2RotX = new Vector(0.0, -1.0, 0.0);
    expect(Vector.equals(v2, p2RotX)).toBe(true);
  });


});

