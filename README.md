# GeoPro

This is a simple library allowing intuitive and fast basic Geometric programming.

## Use

GeoPro-Js use functional style programming for manipulating points in 3D.
It provides basic 3D primitives like points, vectors and unit-vectors and
operations for combining them.

### Example 1: Adding vectors to a point

```ts
const p0 = new Point(1, 1, 1);
const v0 = new Vector(1, 2, 3);
const v1 = new Vector(3, 2, 1);
const uv = UnitVector.fromVector(new Vector(1, 1, 1));

const p1 = Point.add(v0, p0); // Compute p1 = p + v
const p2 = Point.add(v1, p1); // Compute p2 = p1 + v
const v = Vector.fromPoints(p2, p0); // Compute v1 = p2 - p
const pt = Point.add(v.multiplyBy(0.5), p0); // Compute p(t) = p + t * v
```

### Example 2: Adding multiple vectors

```ts
const v1 = new Vector(10, 10, 10);
const v2 = new Vector(-10, 0, 0);
const v3 = new Vector(0, -10, 0);
const v4 = new Vector(0, 0, -10);
const vres = Vector.adds(v1, v2, v3, v4);
```

### Example: Compute a point along a line

```ts
const start = new Point(1, 1, 1);
const dir = UnitVector.fromVector(new Vector(0, 0, 1));
const t = 10;
const p = Point.along(t, dir, start);
```

### Example: Create a translation and apply to a point using `map()`

```ts
const translation = Transform.fromTranslation(10.0, 2.0, 3.0);
const p1 = new Point(0.0, 0.0, 0.0);
const p2 = p1.map(translation);
```

or by using the curried `map()` function we can create a translate function:

```ts
const translate = map(Transform.fromTranslation(10.0, 2.0, 3.0));
const p1 = new Point(0.0, 0.0, 0.0);
const p2 = translate(p1) as Point;
```

### Example: Create a composition of multiple transformations

By using the `compose()` function we can compute a complex transformation by assemblying
multiple basic transformation into one. Using `map()` we can then create a function that
can apply the transformation to points:

```ts
const ang = Math.PI / 4;
const rotX = Transform.fromRotationX(ang);
const rotY = Transform.fromRotationY(-ang);
const rotZ = Transform.fromRotationZ(ang);
const trn = Transform.fromTranslation(12, 15, 120);
const scl = Transform.fromScale(12, 5, 20);
const trans = map(compose(rotZ, rotY, rotX, scl, trn));
const p0 = new Point(10, 20, 11);
const p1 = trans(p0) as Point;
```

### Example: Create a frame of reference

A reference frame (`Frame`) represents a orthogonal coordinate system in 3D:

```ts
```

## Development

This library is written in TypeScript and can be compiled to JavaScript using the TypeScript compiler.

The package manager is `yarn` and the build system is `rollup` to bundle the file into the `dist` folder.

```
yarn install
yarn run build
yarn run test
```
