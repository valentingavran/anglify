import { ClampPipe } from './clamp.pipe';

describe('ClampPipe', () => {
  it('create an instance', () => {
    const pipe = new ClampPipe();
    expect(pipe).toBeTruthy();
  });

  it('should work as expected', () => {
    const pipe = new ClampPipe();
    expect(pipe.transform(-100, 0, 100)).toBe(0);
    expect(pipe.transform(-1, 0, 100)).toBe(0);
    expect(pipe.transform(0, 0, 100)).toBe(0);
    expect(pipe.transform(1, 0, 100)).toBe(1);
    expect(pipe.transform(50, 0, 100)).toBe(50);
    expect(pipe.transform(99, 0, 100)).toBe(99);
    expect(pipe.transform(100, 0, 100)).toBe(100);
    expect(pipe.transform(101, 0, 100)).toBe(100);
    expect(pipe.transform(500, 0, 100)).toBe(100);
  });
});
