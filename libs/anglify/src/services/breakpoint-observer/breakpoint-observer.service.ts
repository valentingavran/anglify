import { Inject, Injectable, Optional } from '@angular/core';
import { distinctUntilChanged, fromEvent, map, shareReplay, startWith } from 'rxjs';
import { Breakpoint, BreakpointSettings, BREAKPOINT_SETTINGS } from './breakpoint-observer.interface';

@Injectable({ providedIn: 'root' })
export class BreakpointObserverService {
  private readonly breakpoints: BreakpointSettings = {
    xl: 1920,
    lg: 1280,
    md: 960,
    sm: 600,
    xs: 0,
  };

  public constructor(@Optional() @Inject(BREAKPOINT_SETTINGS) private readonly settings?: Partial<BreakpointSettings>) {
    this.breakpoints = { ...this.breakpoints, ...this.settings };
    this.checkForCorrectConfiguration();
  }

  public readonly size$ = fromEvent(window, 'resize').pipe(
    startWith(this.computeScreenSize()),
    map(() => this.computeScreenSize()),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public readonly smAndDown$ = this.size$.pipe(map(size => size === 'xs' || size === 'sm'));
  public readonly sm$ = this.size$.pipe(map(size => size === 'sm'));
  public readonly smAndUp$ = this.size$.pipe(map(size => size !== 'xs'));
  public readonly mdAndDown$ = this.size$.pipe(map(size => size === 'xs' || size === 'sm' || size === 'md'));
  public readonly md$ = this.size$.pipe(map(size => size === 'md'));
  public readonly mdAndUp$ = this.size$.pipe(map(size => size !== 'xs' && size !== 'sm'));
  public readonly lgAndDown$ = this.size$.pipe(map(size => size !== 'xl'));
  public readonly lg$ = this.size$.pipe(map(size => size === 'lg'));
  public readonly lgAndUp$ = this.size$.pipe(map(size => size === 'lg' || size === 'xl'));

  private computeScreenSize(): Breakpoint {
    const matched = Object.entries(this.breakpoints).find(([, value]) => window.matchMedia(`(min-width: ${value}px)`).matches) as
      | [Breakpoint, number]
      | undefined;
    return matched ? matched[0] : 'xs';
  }

  private checkForCorrectConfiguration(): void {
    if (
      this.breakpoints.xs < this.breakpoints.sm &&
      this.breakpoints.sm < this.breakpoints.md &&
      this.breakpoints.md < this.breakpoints.lg &&
      this.breakpoints.lg < this.breakpoints.xl
    ) {
    } else {
      throw new Error(
        'Breakpoint configuration is not correct. xs must be smaller than sm, sm must be smaller than md, md must be smaller than lg, lg must be smaller than xl'
      );
    }
  }
}
