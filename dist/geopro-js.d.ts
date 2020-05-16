
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
    /**
     * Build a frame directly with 2 matrices
     * @param dir - Direct matrix
     * @param inv - its inverse
     * @internal
     */
    private static fromMatrices;
    /**
     * Build an Identity frame, center in the origin and aligned
     * along the main three axes.
     */
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
    /**
     * Retrive the matrix used to transform from this frame to
     * the global frame.
     */
    get directMatrix(): Matrix;
    /**
     * Retrieve the matrix used to transform from global frame
     * to this frame
     */
    get inverseMatrix(): Matrix;
    direct(row: Row, col: Col): Number;
    inverse(row: Row, col: Col): Number;
    /**
     * The i vector for this frame
     */
    get i(): Vector;
    /**
     * The j vector for this frame
     */
    get j(): Vector;
    /**
     * The k vector for this frame
     */
    get k(): Vector;
    /**
     * The origin of this frame
     */
    get origin(): Point;
    /**
     * Inverte the transformation defined for this frame.
     */
    inverte(): GeoMatrix;
    /**
     * Builds and returns the composition of t with the
     * transformation represented by this frame.
     * This can be use to transform a frame to another
     * by using simple trasnformations.
     * That is: resM = t.M · this.M
     * @param t - the transformation to compose with
     */
    composeWith(t: GeoMatrix): GeoMatrix;
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
    composeWith(t: GeoMatrix): GeoMatrix;
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
    readonly x: number;
    readonly y: number;
    readonly z: number;
    map(t: GeoMatrix): any;
}

/**
 * Apply the transformation to a point.
 * p' = M*p
 * @param t - a transformation or a frame of reference
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
    /**
     * Use a transformation M to return a new point p' = M·p
     * @param m - transformation matrix
     */
    map: (m: GeoMatrix) => Point;
    /**
     * Create a point given the coordinates relative to a frame
     * @param f - the frame of reference
     * @param c - the vector components
     */
    static relative: import("Function/Curry").Curry<(f: Frame, p: Point) => Point>;
    /**
     * Create a point adding the given vector to this point.
     */
    static add: import("Function/Curry").Curry<(v: Vector, p: Point) => Point>;
    /**
     * Create a point adding all the vectors to this point.
     */
    static adds: import("Function/Curry").Curry<(vs: Vector[], p: Point) => Point>;
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
     * Builds and returns the composition of t with this transformation
     * That is: resM = t.M · this.M
     * @param t - the transformation to compose with
     */
    composeWith(t: GeoMatrix): GeoMatrix;
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
    /**
     * Build a unit vector. (by default along the X axis).
     * @param x - x component
     * @param y - y component
     * @param z - z component
     */
    constructor(x?: number, y?: number, z?: number);
    /**
     * Build a new unit-vector given 3 components
     * @param x - X component
     * @param y - Y component
     * @param z - Z component
     */
    private static fromComponents;
    /**
     * Build a new unit-vector given vector components
     * @param c - components
     */
    static fromVCoords(c: VCoords): UnitVector;
    /**
     * return tru if the object is a UnitVector
     */
    get isUnitVector(): boolean;
    /**
     * Get component along the X axis
     */
    get x(): number;
    /**
     * Get component along the Y axis
     */
    get y(): number;
    /**
     * Get component along the Z axis
     */
    get z(): number;
    /**
     * Get the unit-vector components
     */
    get coordinates(): VCoords;
    /**
     * Retrieve the length of the vector: |v|
     * For unit-vector the length is always 1
     */
    get length(): number;
    /**
     * Return a new vector along the direction of this unit-vector and
     * of length s
     * @param s - the multiplier
     */
    multiplyBy(s: number): Vector;
    /**
     * Use a transformation M to return a new unit-vector u' = M·u
     * @param m - transformation matrix
     */
    map: (t: GeoMatrix) => UnitVector;
    /**
     * Use a transformation M to return a new unit-vector u' = M·u
     * @param m - transformation matrix
     */
    static relative: import("Function/Curry").Curry<(f: Frame, u: UnitVector) => UnitVector>;
    static equals: (v1: UnitVector, v2: UnitVector) => boolean;
    static notEquals: (v1: UnitVector, v2: UnitVector) => boolean;
    /**
     * Returns true if the two unit vectors are parallel
     * Note: vector can point in the same or opposite direction
     * @param v1 - a first unit-vector
     * @param v2 - a second unit-vector
     */
    static parallel: (v1: UnitVector, v2: UnitVector) => boolean;
    /**
     * Returns a new UnitVector computed as the cross-product
     * of the two unit-vector passed as parameter: u' = u1 x u2
     * @param v1 - a first unit-vector
     * @param v2 - a second unit-vector
     */
    static crossProduct: (v1: UnitVector, v2: UnitVector) => UnitVector;
    /**
     * Return the result of the dot-product of the two unit-vectors
     * Note: Uses the right-hand rule.
     * @param v1 - a first unit-vector
     * @param v2 - a second unit-vector
     */
    static dotProduct: (v1: UnitVector, v2: UnitVector) => number;
    /**
     * Return the angle between two unit-vectors.
     * Note: Uses the right-hand rule.
     * @param v1 - a first unit-vector
     * @param v2 - a second unit-vector
     */
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
    /**
     * Build a vector in space with the given components
     * @param x - X component
     * @param y - Y component
     * @param z - Z component
     */
    constructor(x: number, y: number, z: number);
    /**
     * Build a new vector given vector components
     * @param c - components
     */
    static fromVCoords: (vals: VCoords) => Vector;
    /**
     * Return true is the object is a Vector
     */
    get isVector(): boolean;
    /**
     * Get component along the X axis
     */
    get x(): number;
    /**
     * Get component along the Y axis
     */
    get y(): number;
    /**
     * Get component along the Z axis
     */
    get z(): number;
    /**
     * Get the vector components
     */
    get coordinates(): VCoords;
    /**
     * Retrieve the length of the vector: |v|
     */
    get length(): number;
    /**
     * Return a new vector by multiplying this one by a scalar
     * @param s - the multiplier
     */
    multiplyBy: (s: number) => Vector;
    /**
     * Use a transformation M to return a new vector v' = M·v
     * @param m - transformation matrix
     */
    map(m: GeoMatrix): Vector;
    /**
     * Create a vector given the coordinates relative to a frame
     * @param f - the frame of reference
     * @param c - the vector components
     */
    static relative: import("Function/Curry").Curry<(f: Frame, v: Vector) => Vector>;
    /**
     * Determine if two vectors are equals (within tollerance)
     * @param v1 -
     * @param v2 -
     */
    static equals: (v1: Vector, v2: Vector) => boolean;
    static notEquals: (v1: Vector, v2: Vector) => boolean;
    static parallel: (v1: Vector, v2: Vector) => boolean;
    static fromPoints: (p1: Point, p2: Point) => Vector;
    static adds: (...vs: Vector[]) => Vector;
    static crossProduct: (v1: Vector, v2: Vector) => Vector;
    static dotProduct: (v1: Vector, v2: Vector) => number;
}

export { }
