import { AsyncPipe } from '@angular/common';
import type { AfterViewInit } from '@angular/core';
import { HostBinding, ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Self, ViewChild } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, fromEvent, map, merge, tap } from 'rxjs';
import { InteractionStateDirective } from '../../directives/interaction-state/interaction-state.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { bindClassToNativeElement } from '../../utils/functions';
import { TooltipDirective } from '../tooltip/tooltip.directive';
import type { TooltipSettings } from '../tooltip/tooltip.interface';
import { DEFAULT_SLIDER_SETTINGS, SLIDER_SETTINGS } from './slider-settings.token';
import { EntireSliderSettings } from './slider.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-slider',
  standalone: true,
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireSliderSettings>('anglifySliderSettings', DEFAULT_SLIDER_SETTINGS, SLIDER_SETTINGS)],
  imports: [InteractionStateDirective, TooltipDirective, AsyncPipe],
})
export class SliderComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('slider') private readonly slider!: ElementRef<HTMLElement>;

  @ViewChild('thumbContainer') private readonly sliderThumbContainer!: ElementRef<HTMLElement>;

  @ViewChild('thumb') private readonly sliderThumb!: TooltipDirective;

  @Input() public min = this.settings.min;

  @Input() public max = this.settings.max;

  @Input() public ticks: boolean = this.settings.ticks;

  @Input() public ripple: boolean = this.settings.ripple;

  @Input() public state: boolean = this.settings.state;

  public get step() {
    return this.step$.value;
  }

  @Input() public set step(value: number) {
    this.step$.next(value);
  }

  public get value() {
    return this.value$.value;
  }

  @Input() public set value(value: number) {
    this.value$.next(value);
  }

  public get disabled() {
    return this.disabled$.value;
  }

  /**
   * Disable the input.
   */
  @HostBinding('attr.aria-disabled')
  @Input()
  public set disabled(value: boolean) {
    this.disabled$.next(value);
  }

  private readonly disabled$ = new BehaviorSubject(this.settings.disabled);

  private readonly step$ = new BehaviorSubject(this.settings.step);

  public ticksArray$ = this.step$.pipe(map(step => [this.max / step + 1]));

  public readonly value$ = new BehaviorSubject(this.settings.value);

  private locked = true;

  private startX = 0;

  private endX = 0;

  private translateX = 0;

  public tooltipConfig: TooltipSettings = {
    position: 'top',
  };

  public onChange: (...args: any[]) => void = () => {};

  public onTouch: (...args: any[]) => void = () => {};

  public constructor(
    @Self() @Inject('anglifySliderSettings') private readonly settings: EntireSliderSettings,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    this.ripple = this.settings.ripple;
    bindClassToNativeElement(this, this.disabled$, this.elementRef.nativeElement, 'anglify-slider-disabled');
  }

  private get sliderWidth() {
    return this.slider.nativeElement.offsetWidth;
  }

  public ngAfterViewInit() {
    this.startX = this.slider.nativeElement.getBoundingClientRect().x;
    this.endX = this.startX + this.sliderWidth;

    if (this.value < this.min) {
      this.value$.next(this.min);
    }

    merge(fromEvent(this.sliderThumbContainer.nativeElement, 'mousedown'), fromEvent(this.sliderThumbContainer.nativeElement, 'touchstart'))
      .pipe(
        untilDestroyed(this),
        tap(event => {
          if (this.disabled) return;
          if (event.cancelable) event.preventDefault();
          this.sliderThumb.open();
          this.unlock();
        })
      )
      .subscribe();

    merge(fromEvent<MouseEvent>(document, 'mousemove'), fromEvent<TouchEvent>(document, 'touchmove'))
      .pipe(
        untilDestroyed(this),
        tap(event => {
          if (this.disabled) return;
          if (event instanceof MouseEvent) {
            this.handleThumbMove(event.clientX);
          } else {
            this.handleThumbMove(event.touches[0].clientX);
          }
        })
      )
      .subscribe();

    merge(fromEvent(document, 'mouseup'), fromEvent(document, 'touchend'))
      .pipe(
        untilDestroyed(this),
        tap(() => {
          if (this.disabled) return;
          this.sliderThumb.close();
          this.lock();
        })
      )
      .subscribe();

    merge(fromEvent<MouseEvent>(this.slider.nativeElement, 'mousedown'), fromEvent<TouchEvent>(this.slider.nativeElement, 'touchstart'))
      .pipe(
        untilDestroyed(this),
        tap(event => {
          this.slideStart(event);
          if (event instanceof MouseEvent) {
            this.handleThumbMove(event.clientX);
          } else {
            this.handleThumbMove(event.changedTouches[0].clientX);
          }
        })
      )
      .subscribe();

    this.calculateSliderRatio(this.value);
    this.calculateThumbTransform(this.value);
  }

  public registerOnChange(fn: (...args: any[]) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (...args: any[]) => void) {
    this.onTouch = fn;
  }

  public writeValue(value: number) {
    this.value$.next(value);
  }

  private lock() {
    this.locked = true;
  }

  private unlock() {
    this.locked = false;
  }

  private slideStart(event: MouseEvent | TouchEvent) {
    if (this.disabled) return;
    if (event.cancelable) event.preventDefault();
    this.sliderThumbContainer.nativeElement.classList.add('smooth');
    setTimeout(() => {
      this.sliderThumbContainer.nativeElement.classList.remove('smooth');
    }, 250);
    this.unlock();
  }

  private handleThumbMove(clientX: number) {
    if (this.locked) return;
    this.sliderThumb.open();
    if (clientX >= this.startX && clientX <= this.endX) {
      this.translateX = clientX - this.startX;
      if (this.translateX >= 0 && this.translateX <= this.sliderWidth) {
        if (this.step > 1) {
          const ticksCount = (this.max - this.min) / this.step + 1;
          const oneTickSize = this.sliderWidth / (ticksCount - 1);
          const currentTick = Math.round(this.translateX / oneTickSize);
          this.translateX = oneTickSize * currentTick;
        }

        this.sliderThumbContainer.nativeElement.style.transform = `translate(${this.translateX}px)`;
        const value = (this.translateX / this.sliderWidth) * (this.max - this.min) + this.min;
        this.calculateSliderRatio(value);
        this.writeValue(Number(value.toFixed(0)));
      }
    }
  }

  private calculateThumbTransform(value: number) {
    this.translateX = ((value - this.min) / this.max) * this.sliderWidth;
    this.sliderThumbContainer.nativeElement.style.transform = `translate(${this.translateX}px)`;
  }

  private calculateSliderRatio(value: number) {
    const range = this.max - this.min;
    const ratio = (value - this.min) / range;
    this.elementRef.nativeElement.style.setProperty('--anglify-slider-ratio', ratio.toString());
  }
}
