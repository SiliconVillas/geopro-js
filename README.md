# GeoPro

This is a simple library allowing intuitive and fast basic Geometric programming.


## Use

GeoPro-Js provides basic 3D primitives like points, vectors and unit-vectors and
operations for combining them.

```ts
const p0 = new Point(1,2,3);
const v0 = new Vector(1,1,1);
const uv = UnitVector.fromVector(new Vector(1,1,1));

const p1 = Point.add(v0, p1);   // Compute p1 = p + v
const v1 = Vector.fromPoints(p1, p) // Compute v1 = p1 - p
const pt = Point.along(0.5, uv, p); // Compute p(t) = p + t* uv
```

GeoPro-Js allows you to use functional style programming for manipulating points in 3D.



## Development

