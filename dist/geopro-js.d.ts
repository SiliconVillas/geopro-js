
/**
 * Possible column index of a Matrix
 * @public
 */
export declare type Col = 0 | 1 | 2 | 3;

/**
 * Compose transformation right to left (eg T2*T1)
 * @param tlist - a list of transformation to combine
 * @public
 */
export declare const compose: (...tlist: Transform[]) => Transform;

/**
 * A frame of reference
 * @public
 */
export declare class Frame implements GeoMatrix {
    private _direct;
    private _inverse;
    private static fromMatrices;
    get directMatrix(): Matrix;
    get inverseMatrix(): Matrix;
    direct(row: Row, col: Col): Number;
    inverse(row: Row, col: Col): Number;
    constructor();
    /**
     * Build a Frame throug an origin and 2 independent vector.
     * The first vector will be considered the Z direction
     * The second vector will point in the semi-space of x
     * @param o - origin point
     * @param v1 - a vector indicating the Z of the new frame
     * @param v2 - a vector in the XY plane of the new frame
     */
    static from2Vectors: (o: Point, v1: Vector, v2: Vector) => Frame;
    get i(): Vector;
    get j(): Vector;
    get k(): Vector;
    get origin(): Point;
    inverte(): GeoMatrix;
}

/**
 * A transformation object must implement this interface
 * @public
 */
export declare interface GeoMatrix {
    readonly directMatrix: Matrix;
    readonly inverseMatrix: Matrix;
    direct(row: Row, col: Col): Number;
    inverse(row: Row, col: Col): Number;
    inverte(): GeoMatrix;
}

/**
 * Homogeneus coordinates for transformable points or vector
 * @public
 */
export declare type HCoords = [number, number, number, number];

/**
 * A transformable object must implement this interface
 * @public
 */
export declare interface HomogeneusCoords {
    coordinates: HCoords;
    x: number;
    y: number;
    z: number;
    map(t: GeoMatrix): any;
}

/**
 * Apply the transformation to a point.
 * p' = M*p
 * @param t - a transformation
 * @param o - a transformable object (i.e an object derived from HomogeneusCoords)
 * @public
 */
export declare const map: import("Function/Curry").Curry<(<T extends HomogeneusCoords>(t: GeoMatrix, o: T) => T)>;

/**
 * Note: each HCoords is a column in the matrix
 * @public
 */
export declare type Matrix = [HCoords, HCoords, HCoords, HCoords];

/**
 * Homogeneus coordinates for transformable points
 * @public
 */
export declare type PCoords = [number, number, number, 1.0];

/**
 * A 3D point
 * @public
 */
export declare class Point implements HomogeneusCoords {
    private _coord;
    constructor(x: number, y: number, z: number, w?: number);
    get isPoint(): boolean;
    get x(): number;
    get y(): number;
    get z(): number;
    get coordinates(): HCoords;
    map: (t: GeoMatrix) => Point;
    /**
     * Create a point adding the given vector to this point.
     */
    static add: import("Function/Curry").Curry<(v: Vector, p: Point) => Point>;
    /**
     * Create a point adding all the vectors to this point.
     */
    static adds: import("Function/Curry").Curry<(vs: Vector[], p: Point) => Point>;
    /**
     * Create a point given the coordinates relative to a frame
     */
    static relative: (f: Frame, c: HCoords) => Point;
    /**
     * Create a point given an array of coordinates (must be 4 long)
     */
    static fromHCoords: (vals: number[]) => Point;
    static along: import("Function/Curry").Curry<(t: number, dir: UnitVector, start: Point) => Point>;
    /**
     * Returns true if the point are in the same location within tollerance
     */
    static equals: (p1: Point, p2: Point) => boolean;
    /**
     * Returns true if the point are NOT in the same location within tollerance
     */
    static notEquals: (p1: Point, p2: Point) => boolean;
}

/**
 * Possible row index of a Matrix
 * @public
 */
export declare type Row = 0 | 1 | 2 | 3;

/**
 * A 3D transformation
 * @public
 */
export declare class Transform implements GeoMatrix {
    private _direct;
    private _inverse;
    constructor();
    get directMatrix(): Matrix;
    get inverseMatrix(): Matrix;
    direct(row: Row, col: Col): Number;
    inverse(row: Row, col: Col): Number;
    inverte(): Transform;
    /**
     * return the composition of t with this transformation
     * That is: resM = t.M * this.M
     * @param t - the transformation to compose with
     */
    composeWith(t: Transform): Transform;
    private static fromMatrices;
    static byInverting(t: Transform): Transform;
    static fromTranslation(tx: number, ty: number, tz: number): Transform;
    static fromRotationX(a: number): Transform;
    static fromRotationY(a: number): Transform;
    static fromRotationZ(a: number): Transform;
    static fromScale(tx: number, ty: number, tz: number): Transform;
}

/**
 * A 3D unit-vector
 * @public
 */
export declare class UnitVector implements HomogeneusCoords {
    private _coord;
    static fromVector(v: Vector): UnitVector;
    private constructor();
    private static fromComponents;
    static fromVCoords(c: VCoords): UnitVector;
    get isUnitVector(): boolean;
    get x(): number;
    get y(): number;
    get z(): number;
    get coordinates(): VCoords;
    get length(): number;
    map: (t: GeoMatrix) => UnitVector;
    multiplyBy(s: number): Vector;
    static relative: (f: Frame, c: VCoords) => UnitVector;
    static equals: (v1: UnitVector, v2: UnitVector) => boolean;
    static notEquals: (v1: UnitVector, v2: UnitVector) => boolean;
    /**
     * Returns true if the two unit vector are parallel
     * Same or opposite direction
     */
    static parallel: (v1: UnitVector, v2: UnitVector) => boolean;
    static crossProduct: (v1: UnitVector, v2: UnitVector) => UnitVector;
    static dotProduct: (v1: UnitVector, v2: UnitVector) => number;
    static angleBetween: (v1: UnitVector, v2: UnitVector) => number;
}

/**
 * Homogeneus coordinates for transformable vectors
 * @public
 */
export declare type VCoords = [number, number, number, 0.0];

/**
 * A 3D vector
 * @public
 */
export declare class Vector implements HomogeneusCoords {
    private _coord;
    constructor(x: number, y: number, z: number);
    get isVector(): boolean;
    get x(): number;
    get y(): number;
    get z(): number;
    get coordinates(): VCoords;
    get length(): number;
    multiplyBy: (s: number) => Vector;
    map(t: GeoMatrix): Vector;
    static relative: (f: Frame, c: VCoords) => Vector;
    static fromVCoords: (vals: VCoords) => Vector;
    static equals: (v1: Vector, v2: Vector) => boolean;
    static notEquals: (v1: Vector, v2: Vector) => boolean;
    static parallel: (v1: Vector, v2: Vector) => boolean;
    static fromPoints: (p1: Point, p2: Point) => Vector;
    static adds: (...vs: Vector[]) => Vector;
    static crossProduct: (v1: Vector, v2: Vector) => Vector;
    static dotProduct: (v1: Vector, v2: Vector) => number;
}

export { }
