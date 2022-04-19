import { ElementRef, Inject, Injectable } from '@angular/core';
import { fromEvent, merge, takeUntil } from 'rxjs';
import type { PositionSettings, Position } from './position.interface';
import { POSITION_SETTINGS } from './position.token';
import { AnglifyDestroyService } from '../../services/destroy/destroy.service';
import { observeOnResize } from '../../utils/functions';

@Injectable()
export class PositionService {
  private _position: Position = 'top';
  private _offset = 10;

  public set position(value: Position) {
    this._position = value;
    this.updatePosition();
  }

  public set offset(value: number) {
    this._offset = value;
    this.updatePosition();
  }

  public constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    @Inject(POSITION_SETTINGS) private readonly settings: PositionSettings,
    private readonly destroy$: AnglifyDestroyService
  ) {
    merge(observeOnResize(this._elementRef.nativeElement), fromEvent(window, 'scroll', { capture: true }))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updatePosition());
  }

  private updatePosition() {
    const hostPos = this.settings.host.getBoundingClientRect();
    const menuPos = this._elementRef.nativeElement.getBoundingClientRect();
    let top;
    let left;

    if (this._position === 'top') {
      top = hostPos.top - menuPos.height - this._offset;
      left = Math.max(Number(hostPos.left) + (hostPos.width - menuPos.width) / 2, this._offset);
    } else if (this._position === 'bottom') {
      top = Number(hostPos.bottom) + this._offset;
      left = Math.max(Number(hostPos.left) + (hostPos.width - menuPos.width) / 2, this._offset);
    } else {
      top = Number(hostPos.top) + (hostPos.height - menuPos.height) / 2;
      if (this._position === 'left') {
        left = Math.max(hostPos.left - menuPos.width - this._offset, this._offset);
      } else {
        left = Math.min(Number(hostPos.right) + this._offset, window.innerWidth - menuPos.width - this._offset);
      }
    }
    this._elementRef.nativeElement.style.top = `${top}px`;
    this._elementRef.nativeElement.style.left = `${left}px`;
  }
}
