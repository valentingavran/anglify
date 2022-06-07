import { TestBed } from '@angular/core/testing';
import { BREAKPOINT_SETTINGS } from './breakpoint-observer.interface';
import { BreakpointObserverService } from './breakpoint-observer.service';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});
describe('BreakpointObserverService', () => {
  let service: BreakpointObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should have a breakpoints object with keys 'xs', 'sm', 'md', 'lg', 'xl' in descending order by default", () => {
    // @ts-expect-error
    expect(Object.keys(service.breakpoints)).toEqual(['xl', 'lg', 'md', 'sm', 'xs']);
  });

  test('that xs < sm < md < lg < xl', () => {
    // @ts-expect-error
    expect(service.breakpoints.xs < service.breakpoints.sm).toBe(true);
    // @ts-expect-error
    expect(service.breakpoints.sm < service.breakpoints.md).toBe(true);
    // @ts-expect-error
    expect(service.breakpoints.md < service.breakpoints.lg).toBe(true);
    // @ts-expect-error
    expect(service.breakpoints.lg < service.breakpoints.xl).toBe(true);
  });
});

describe('Advanced BreakpointObserverService tests', () => {
  it('should throw error if breakpoints not in descending order', () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BREAKPOINT_SETTINGS,
          useValue: {
            md: 500,
          },
        },
      ],
    });
    expect(() => {
      TestBed.inject(BreakpointObserverService);
    }).toThrowErrorMatchingSnapshot();
  });
});
