## API Report File for "geopro-js"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export type AffineGeoMatrix = GeoMatrix & InvertableGroMatrix;

// @public
export type Col = 0 | 1 | 2 | 3;

// @public
export const compose: (...l: GeoMatrix[]) => GeoMatrix;

// @public
export class Frame implements GeoMatrix, InvertableGroMatrix {
    constructor();
    composeWith(t: AffineGeoMatrix): AffineGeoMatrix;
    // (undocumented)
    direct(row: Row, col: Col): Number;
    get directMatrix(): Matrix;
    static from2Vectors: (o: Point, v1: Vector, v2: Vector) => Frame;
    get i(): Vector;
    // (undocumented)
    inverse(row: Row, col: Col): Number;
    get inverseMatrix(): Matrix;
    inverte(): GeoMatrix;
    get j(): Vector;
    get k(): Vector;
    get origin(): Point;
}

// @public
export interface GeoMatrix {
    // (undocumented)
    composeWith(t: GeoMatrix): GeoMatrix;
    // (undocumented)
    direct(row: Row, col: Col): Number;
    // (undocumented)
    readonly directMatrix: Matrix;
}

// @public
export type HCoords = [number, number, number, number];

// @public
export interface HomogeneusCoords {
    // (undocumented)
    coordinates: HCoords;
    // (undocumented)
    map(t: GeoMatrix): any;
    // (undocumented)
    readonly x: number;
    // (undocumented)
    readonly y: number;
    // (undocumented)
    readonly z: number;
}

// @public
export interface InvertableGroMatrix {
    // (undocumented)
    inverse(row: Row, col: Col): Number;
    // (undocumented)
    readonly inverseMatrix: Matrix;
    // (undocumented)
    inverte(): GeoMatrix;
}

// @public
export const map: import("Function/Curry").Curry<(<T extends HomogeneusCoords>(t: GeoMatrix, o: T) => T)>;

// @public
export type Matrix = [HCoords, HCoords, HCoords, HCoords];

// @public (undocumented)
export const matrixMultiply: (t1: Matrix, t2: Matrix) => Matrix;

// @public
export type PCoords = [number, number, number, 1.0];

// @public
export class Point implements HomogeneusCoords {
    constructor(x: number, y: number, z: number, w?: number);
    static add: import("Function/Curry").Curry<(v: Vector, p: Point) => Point>;
    static adds: import("Function/Curry").Curry<(vs: Vector[], p: Point) => Point>;
    // (undocumented)
    static along: import("Function/Curry").Curry<(t: number, dir: UnitVector, start: Point) => Point>;
    // (undocumented)
    get coordinates(): HCoords;
    static equals: (p1: Point, p2: Point) => boolean;
    static fromHCoords: (vals: number[]) => Point;
    // (undocumented)
    get isPoint(): boolean;
    map: (m: GeoMatrix) => Point;
    static notEquals: (p1: Point, p2: Point) => boolean;
    static relative: import("Function/Curry").Curry<(f: Frame, p: Point) => Point>;
    // (undocumented)
    get x(): number;
    // (undocumented)
    get y(): number;
    // (undocumented)
    get z(): number;
}

// @public
export class Project implements GeoMatrix {
    constructor(fov?: number);
    composeWith(t: GeoMatrix): Project;
    // (undocumented)
    direct(row: Row, col: Col): Number;
    // (undocumented)
    get directMatrix(): Matrix;
    // (undocumented)
    static fovScale(fov: number): number;
    // (undocumented)
    static fromProjectOnXY(viewDist: number, fov: number): Project;
    // (undocumented)
    static fromProjectOnXZ(viewDist: number, fov: number): Project;
    // (undocumented)
    static fromProjectOnYZ(viewDist: number, fov: number): Project;
}

// @public (undocumented)
export const round1: import("Function/Curry").Curry<(n: number) => number> & ((n: number) => number);

// @public (undocumented)
export const round2: import("Function/Curry").Curry<(n: number) => number> & ((n: number) => number);

// @public (undocumented)
export const round3: import("Function/Curry").Curry<(n: number) => number> & ((n: number) => number);

// @public (undocumented)
export const round4: import("Function/Curry").Curry<(n: number) => number> & ((n: number) => number);

// @public
export type Row = 0 | 1 | 2 | 3;

// @public
export class Transform implements GeoMatrix, InvertableGroMatrix {
    constructor();
    // (undocumented)
    static byInverting(t: Transform): Transform;
    composeWith(t: AffineGeoMatrix): AffineGeoMatrix;
    // (undocumented)
    direct(row: Row, col: Col): Number;
    // (undocumented)
    get directMatrix(): Matrix;
    // (undocumented)
    static fromRotationX(a: number): Transform;
    // (undocumented)
    static fromRotationY(a: number): Transform;
    // (undocumented)
    static fromRotationZ(a: number): Transform;
    // (undocumented)
    static fromScale(tx: number, ty: number, tz: number): Transform;
    // (undocumented)
    static fromTranslation(tx: number, ty: number, tz: number): Transform;
    // (undocumented)
    inverse(row: Row, col: Col): Number;
    // (undocumented)
    get inverseMatrix(): Matrix;
    // (undocumented)
    inverte(): Transform;
}

// @public
export class UnitVector implements HomogeneusCoords {
    constructor(x?: number, y?: number, z?: number);
    static angleBetween: (v1: UnitVector, v2: UnitVector) => number;
    get coordinates(): VCoords;
    static crossProduct: (v1: UnitVector, v2: UnitVector) => UnitVector;
    static dotProduct: (v1: UnitVector, v2: UnitVector) => number;
    // (undocumented)
    static equals: (v1: UnitVector, v2: UnitVector) => boolean;
    static fromPoints: (p1: Point, p2: Point) => UnitVector;
    static fromVCoords(c: VCoords): UnitVector;
    // (undocumented)
    static fromVector(v: Vector): UnitVector;
    get isUnitVector(): boolean;
    get length(): number;
    map: (t: GeoMatrix) => UnitVector;
    multiplyBy(s: number): Vector;
    // (undocumented)
    static notEquals: (v1: UnitVector, v2: UnitVector) => boolean;
    static parallel: (v1: UnitVector, v2: UnitVector) => boolean;
    static relative: import("Function/Curry").Curry<(f: Frame, u: UnitVector) => UnitVector>;
    get x(): number;
    get y(): number;
    get z(): number;
}

// @public
export type VCoords = [number, number, number, 0.0];

// @public
export class Vector implements HomogeneusCoords {
    constructor(x: number, y: number, z: number);
    // (undocumented)
    static adds: (...vs: Vector[]) => Vector;
    get coordinates(): VCoords;
    // (undocumented)
    static crossProduct: (v1: Vector, v2: Vector) => Vector;
    // (undocumented)
    static dotProduct: (v1: Vector, v2: Vector) => number;
    static equals: (v1: Vector, v2: Vector) => boolean;
    // (undocumented)
    static fromPoints: (p1: Point, p2: Point) => Vector;
    static fromVCoords: (vals: VCoords) => Vector;
    get isVector(): boolean;
    get length(): number;
    map(m: GeoMatrix): Vector;
    multiplyBy: (s: number) => Vector;
    // (undocumented)
    static notEquals: (v1: Vector, v2: Vector) => boolean;
    // (undocumented)
    static parallel: (v1: Vector, v2: Vector) => boolean;
    static relative: import("Function/Curry").Curry<(f: Frame, v: Vector) => Vector>;
    get x(): number;
    get y(): number;
    get z(): number;
}


// (No @packageDocumentation comment for this package)

```
