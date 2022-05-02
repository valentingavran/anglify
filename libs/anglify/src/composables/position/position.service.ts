import { ElementRef, Inject, Injectable } from '@angular/core';
import { computePosition, offset, flip, shift } from '@floating-ui/dom';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, merge } from 'rxjs';
import type { Position, PositionSettings } from './position.interface';
import { POSITION_SETTINGS } from './position.token';
import { observeOnResize, toBoolean } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';

@UntilDestroy()
@Injectable()
export class PositionService {
  private _position: Position = 'top';
  private _offset = 10;
  private _parentWidth = false;

  public set position(value: Position) {
    this._position = value;
    void this.updatePosition();
  }

  public set offset(value: number) {
    this._offset = value;
    void this.updatePosition();
  }

  public set parentWidth(value: BooleanLike) {
    this._parentWidth = toBoolean(value);
    void this.updatePosition();
  }

  public constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    @Inject(POSITION_SETTINGS) private readonly settings: PositionSettings
  ) {
    merge(observeOnResize(this._elementRef.nativeElement), fromEvent(window, 'scroll', { capture: true }))
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        void this.updatePosition();
      });
  }

  private async updatePosition() {
    const { x, y } = await computePosition(this.settings.host, this._elementRef.nativeElement, {
      placement: this._position,
      middleware: [offset(this._offset), flip(), shift({ padding: 5 })],
      strategy: 'fixed',
    });

    this._elementRef.nativeElement.style.left = `${x}px`;
    this._elementRef.nativeElement.style.top = `${y}px`;
    if (this._parentWidth) {
      this._elementRef.nativeElement.style.width = `${this.settings.host.getBoundingClientRect().width}px`;
    }
  }
}
