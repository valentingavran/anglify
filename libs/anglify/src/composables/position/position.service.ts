import { ElementRef, Inject, Injectable } from '@angular/core';
import type { Options } from '@floating-ui/core/src/middleware/offset';
import { computePosition, flip, offset, shift, size, type Padding } from '@floating-ui/dom';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, merge } from 'rxjs';
import { observeOnResize$ } from '../../utils/functions';
import { PositionSettings, type Position } from './position.interface';
import { POSITION_SETTINGS } from './position.token';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class PositionService {
  private _position: Position = 'top';

  private _minSize = 250;

  private _padding: Padding = 5;

  private _offset: Options = 10;

  private _parentWidth = false;

  private _flip = false;

  private _shift = false;

  public get position() {
    return this._position;
  }

  public set position(value: Position) {
    this._position = value;
    void this.updatePosition();
  }

  public get minSize() {
    return this._minSize;
  }

  public set minSize(value: number) {
    this._minSize = value;
    void this.updatePosition();
  }

  public get padding() {
    return this._padding;
  }

  public set padding(value: Padding) {
    this._padding = value;
    void this.updatePosition();
  }

  public get offset() {
    return this._offset;
  }

  public set offset(value: Options) {
    this._offset = value;
    void this.updatePosition();
  }

  public get parentWidth() {
    return this._parentWidth;
  }

  public set parentWidth(value: boolean) {
    this._parentWidth = value;
    void this.updatePosition();
  }

  public get flip() {
    return this._flip;
  }

  public set flip(value: boolean) {
    this._flip = value;
    void this.updatePosition();
  }

  public get shift() {
    return this._shift;
  }

  public set shift(value: boolean) {
    this._shift = value;
    void this.updatePosition();
  }

  public constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(POSITION_SETTINGS) private readonly settings: PositionSettings
  ) {
    merge(
      observeOnResize$(this.elementRef.nativeElement),
      fromEvent(this.elementRef.nativeElement, 'click'),
      fromEvent(window, 'scroll', { capture: true }),
      fromEvent(window, 'resize', { capture: true })
    )
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        void this.updatePosition();
      });
  }

  private async updatePosition() {
    const padding = this._padding;
    const minSize = this._minSize;
    const parentWidth = this._parentWidth;
    const middleware = [
      size({
        padding,
        apply({ availableHeight, elements, rects }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.min(minSize, availableHeight)}px`,
            width: parentWidth ? `${rects.reference.width}px` : undefined,
          });
        },
      }),
    ];
    if (this._flip) middleware.push(flip({ padding, crossAxis: false, fallbackStrategy: 'initialPlacement', flipAlignment: false }));
    if (this._shift) middleware.push(shift({ padding }));
    middleware.push(offset(this._offset));

    const { x, y } = await computePosition(this.settings.host, this.elementRef.nativeElement, {
      placement: this._position,
      middleware,
      strategy: 'fixed',
    });

    this.elementRef.nativeElement.style.left = `${x}px`;
    this.elementRef.nativeElement.style.top = `${y}px`;
  }
}
