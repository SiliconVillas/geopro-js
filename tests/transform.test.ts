import { Transform } from '../src/index';


describe('Transformation',() => {

  test('Creates a identity transformation', () => {
    const identity = new Transform();
    expect(identity.direct(0,0)).toBe(1);
    expect(identity.direct(0,1)).toBe(0);
    expect(identity.direct(0,2)).toBe(0);
    expect(identity.direct(0,3)).toBe(0);

    expect(identity.direct(1,0)).toBe(0);
    expect(identity.direct(1,1)).toBe(1);
    expect(identity.direct(1,2)).toBe(0);
    expect(identity.direct(1,3)).toBe(0);

    expect(identity.direct(2,0)).toBe(0);
    expect(identity.direct(2,1)).toBe(0);
    expect(identity.direct(2,2)).toBe(1);
    expect(identity.direct(2,3)).toBe(0);

    expect(identity.direct(3,0)).toBe(0);
    expect(identity.direct(3,1)).toBe(0);
    expect(identity.direct(3,2)).toBe(0);
    expect(identity.direct(3,3)).toBe(1);

    // --

    expect(identity.inverse(0,0)).toBe(1);
    expect(identity.inverse(0,1)).toBe(0);
    expect(identity.inverse(0,2)).toBe(0);
    expect(identity.inverse(0,3)).toBe(0);

    expect(identity.inverse(1,0)).toBe(0);
    expect(identity.inverse(1,1)).toBe(1);
    expect(identity.inverse(1,2)).toBe(0);
    expect(identity.inverse(1,3)).toBe(0);

    expect(identity.inverse(2,0)).toBe(0);
    expect(identity.inverse(2,1)).toBe(0);
    expect(identity.inverse(2,2)).toBe(1);
    expect(identity.inverse(2,3)).toBe(0);

    expect(identity.inverse(3,0)).toBe(0);
    expect(identity.inverse(3,1)).toBe(0);
    expect(identity.inverse(3,2)).toBe(0);
    expect(identity.inverse(3,3)).toBe(1);

  });
});
