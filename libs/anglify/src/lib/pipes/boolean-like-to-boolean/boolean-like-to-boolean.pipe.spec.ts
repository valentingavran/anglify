import { BooleanLikeToBooleanPipe } from './boolean-like-to-boolean.pipe';

describe('BooleanLikeToBooleanPipe', () => {
  it('create an instance', () => {
    const pipe = new BooleanLikeToBooleanPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert all values correctly', () => {
    const pipe = new BooleanLikeToBooleanPipe();
    expect(pipe.transform(true)).toBeTruthy();
    expect(pipe.transform('true')).toBeTruthy();
    expect(pipe.transform('')).toBeTruthy();
    expect(pipe.transform(false)).toBeFalsy();
    expect(pipe.transform('false')).toBeFalsy();

    // @ts-expect-error
    expect(pipe.transform(' ')).toBeFalsy();
    // @ts-expect-error
    expect(pipe.transform('a')).toBeFalsy();
  });
});
