import { NgIf } from '@angular/common';
import type { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Injectable, Input, Output, ViewChild } from '@angular/core';
import { HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DIRECTION_ALL, type MouseInput } from 'hammerjs';
import { BehaviorSubject, fromEvent, map } from 'rxjs';
import { bindStyleValueToNativeElement } from '../../utils/functions';

@Injectable({ providedIn: 'root' })
export class MyHammerConfig extends HammerGestureConfig {
  public override overrides = {
    pan: { direction: DIRECTION_ALL, threshold: 1 },
  };
}

@UntilDestroy()
@Component({
  selector: 'anglify-bottom-sheet',
  standalone: true,
  imports: [NgIf, HammerModule],
  providers: [
    {
      provide: HammerGestureConfig,
      useClass: MyHammerConfig,
    },
  ],
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetComponent implements AfterViewInit {
  @ViewChild('sheet', { static: true }) private readonly sheet!: ElementRef<HTMLDivElement>;

  @ViewChild('content', { static: true }) private readonly content!: ElementRef<HTMLDivElement>;

  public get breakpoint() {
    return this.breakpoint$.value;
  }

  /**
   * A decimal value between 0 and 100 that indicates the
   * initial point the BottomSheet will open at.
   * This value must also be listed in the `breakpoints` array.
   */
  @Input() public set breakpoint(value: number) {
    this.breakpoint$.next(value);
  }

  /**
   * The horizontal line that displays at the top of a bottom sheet.
   */
  @Input() public hasHandle = true;

  /**
   * The breakpoints to use when creating a BottomSheet. Each value in the
   * array must be a decimal between 0 and 100 where 0 indicates the BottomSheet is fully
   * closed and 100 indicates fully open. Values are relative
   * to the height of the BottomSheet, not the height of the screen. One of the values in this
   * array must be the value of the `initialBreakpoint` property.
   * For example: [0, 25, 50, 10]
   */
  @Input() public breakpoints: number[] = [5, 30, 90];

  @Input() public backdropDismiss = true;

  @Output() public readonly breakpointChange = new EventEmitter<number>();

  private breakpointsInPixel: number[] = [];

  private readonly deltaY$ = new BehaviorSubject(0);

  private readonly breakpoint$ = new BehaviorSubject(90);

  private readonly scrollTop$ = new BehaviorSubject(0);

  public constructor(private readonly elementRef: ElementRef<HTMLElement>, private readonly config: HammerGestureConfig) {
    bindStyleValueToNativeElement(this, this.breakpoint$.pipe(map(b => `${b}%`)), this.elementRef.nativeElement, '--position');
    bindStyleValueToNativeElement(this, this.deltaY$.pipe(map(deltaY => `${deltaY}px`)), this.elementRef.nativeElement, '--active-offset');

    const hammer = this.config.buildHammer(this.elementRef.nativeElement);
    fromEvent(hammer, 'panstart')
      .pipe(untilDestroyed(this))
      .subscribe(() => this.onPanStart());
    fromEvent(hammer, 'pan')
      .pipe(untilDestroyed(this))
      .subscribe(event => this.onPan(event as typeof MouseInput));
    fromEvent(hammer, 'panend')
      .pipe(untilDestroyed(this))
      .subscribe(event => this.onPanEnd(event as typeof MouseInput));
  }

  public ngAfterViewInit() {
    const ratio = (this.height - this.deltaY$.value) / this.breakpoint$.value;
    this.breakpointsInPixel = this.breakpoints.map(breakpoint => breakpoint * ratio);
  }

  private get height() {
    return this.sheet.nativeElement.clientHeight;
  }

  protected onPanStart() {
    if (this.scrollTop$.value > 0) return;
    this.elementRef.nativeElement.classList.remove('anglify-bottom-sheet-animate');
  }

  protected onPan(event: typeof MouseInput) {
    if ((this.isLastBreakpoint() && this.scrollTop$.value === 0) || this.scrollTop$.value > 0) {
      this.content.nativeElement.scrollTop = this.scrollTop$.value - event.deltaY;
      return;
    }

    this.deltaY$.next(-event.deltaY);
  }

  private onPanEnd(event: typeof MouseInput) {
    if (this.scrollTop$.value > 0 && this.content.nativeElement.scrollTop === 0) {
      this.scrollTop$.next(this.content.nativeElement.scrollTop);
      return;
    }

    this.scrollTop$.next(this.content.nativeElement.scrollTop);
    if (this.scrollTop$.value > 0) return;
    this.elementRef.nativeElement.classList.add('anglify-bottom-sheet-animate');
    const velocity = event.overallVelocityY;
    if (velocity < -1) {
      this.goToLastBreakpoint();
    } else if (velocity < -0.15) {
      this.goToNextBreakpoint();
    } else if (velocity > 1) {
      this.goToFirstBreakpoint();
    } else if (velocity > 0.15) {
      this.goToPreviousBreakpoint();
    } else {
      const nearest = this.getNearestBreakpoint(this.breakpointsInPixel, this.height);
      const index = this.breakpointsInPixel.indexOf(nearest);
      const breakpoint = this.breakpoints[index];
      this.breakpoint$.next(breakpoint);
      this.breakpointChange.emit(breakpoint);
    }

    this.deltaY$.next(0);
  }

  private goToNextBreakpoint() {
    const index = this.breakpoints.indexOf(this.breakpoint$.value);
    if (index === -1) return;
    const nextIndex = index + 1;
    if (nextIndex >= this.breakpoints.length) return;
    this.breakpoint$.next(this.breakpoints[nextIndex]);
    this.breakpointChange.emit(this.breakpoint$.value);
  }

  private goToLastBreakpoint() {
    this.breakpoint$.next(this.breakpoints[this.breakpoints.length - 1]);
    this.breakpointChange.emit(this.breakpoint$.value);
  }

  private goToPreviousBreakpoint() {
    const index = this.breakpoints.indexOf(this.breakpoint$.value);
    if (index === -1) return;
    const previousIndex = index - 1;
    if (previousIndex < 0) {
      this.goToNextBreakpoint();
      return;
    }

    this.breakpoint$.next(this.breakpoints[previousIndex]);
    this.breakpointChange.emit(this.breakpoint$.value);
  }

  private goToFirstBreakpoint() {
    this.breakpoint$.next(this.breakpoints[0]);
    this.breakpointChange.emit(this.breakpoint$.value);
  }

  private getNearestBreakpoint(array: number[], position: number) {
    return array.reduce((prev, curr) => (Math.abs(curr - position) < Math.abs(prev - position) ? curr : prev));
  }

  private isLastBreakpoint() {
    return this.breakpoint$.value === this.breakpoints[this.breakpoints.length - 1];
  }
}
