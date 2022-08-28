import { PercentPipe } from './percent.pipe';

describe('PercentPipe', () => {
  it('create an instance', () => {
    const pipe = new PercentPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return value with percent at the end', () => {
    const pipe = new PercentPipe();
    expect(pipe.transform(-10)).toBe('-10%');
    expect(pipe.transform(10)).toBe('10%');
    expect(pipe.transform(0)).toBe('0%');
    expect(pipe.transform(10.54)).toBe('10.54%');
    expect(pipe.transform('10.54')).toBe('10.54%');
  });
});
