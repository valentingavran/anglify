import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { isBooleanLikeTrue } from '../../utils/functions';
import type { BooleanLike } from '../../utils/interfaces';

@UntilDestroy(this)
@Directive({
  selector: '[anglifyOverlay], [anglifyButton], anglify-stepper-header, anglify-list-item[click]',
})
export class OverlayDirective {
  @Input()
  public set selected(value: BooleanLike) {
    if (isBooleanLikeTrue(value)) {
      this._selectedOrActivatedContainer.classList.add('anglify-overlay__selected');
    } else {
      this._selectedOrActivatedContainer.classList.remove('anglify-overlay__selected');
    }
  }

  @Input()
  public set activated(value: BooleanLike) {
    if (isBooleanLikeTrue(value)) {
      this._selectedOrActivatedContainer.classList.add('anglify-overlay__activated');
    } else {
      this._selectedOrActivatedContainer.classList.remove('anglify-overlay__activated');
    }
  }

  @Input() public ripple: BooleanLike = true;

  private readonly _nativeElement = this._element.nativeElement;
  private readonly _hoverContainer = this.createOverlayContainer();
  private readonly _selectedOrActivatedContainer = this.createOverlayContainer();

  private readonly _visibleRipples: HTMLElement[] = [];
  private readonly _showRippleAction = new Subject<Event>();
  private readonly _hideRippleAction = new Subject();

  public constructor(private readonly _element: ElementRef<HTMLElement>, private readonly _renderer: Renderer2) {
    this._nativeElement.classList.add('anglify-overlay');
    this._showRippleHandler$.pipe(untilDestroyed(this)).subscribe();
    this._hideRippleHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  @HostListener('mouseenter')
  protected onMouseEnter() {
    this._hoverContainer.classList.add('anglify-overlay__hovered');
  }

  @HostListener('mouseleave')
  protected onMouseLeave() {
    this._hoverContainer.classList.remove('anglify-overlay__hovered');
  }

  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('mousedown', ['$event'])
  protected onShow(event: KeyboardEvent | MouseEvent) {
    this._showRippleAction.next(event);
  }

  @HostListener('keyup.space')
  @HostListener('keyup.enter')
  @HostListener('mouseup')
  @HostListener('mouseout')
  protected onKeyup() {
    this._hideRippleAction.next(true);
  }

  private createOverlayContainer() {
    const hoverContainer = this._renderer.createElement('div') as HTMLDivElement;
    hoverContainer.classList.add('anglify-overlay__container');
    this._renderer.appendChild(this._nativeElement, hoverContainer);
    return hoverContainer;
  }

  private readonly _showRippleHandler$ = this._showRippleAction.pipe(
    filter(event => {
      if (event instanceof KeyboardEvent) return !event.repeat;
      return true;
    }),
    tap(event => {
      const width = this._hoverContainer.clientWidth;
      const height = this._hoverContainer.clientHeight;
      const diff = Math.max(width, height) - Math.min(width, height);

      const focusContainer = this._renderer.createElement('div') as HTMLDivElement;
      focusContainer.classList.add('anglify-overlay__focus-container');
      if (isBooleanLikeTrue(this.ripple)) {
        focusContainer.classList.add('anglify-overlay__ripple');
      }
      Object.assign(focusContainer.style, {
        width: `${Math.max(width, height)}px`,
        height: `${Math.max(width, height)}px`,
      });

      if (event instanceof MouseEvent) {
        const offsetX = event.offsetX;
        const offsetY = event.offsetY;
        focusContainer.style.left = `${offsetX - width / 2 - (width < height ? diff / 2 : 0)}px`;
        focusContainer.style.top = `${offsetY - height / 2 - (width > height ? diff / 2 : 0)}px`;
      } else {
        focusContainer.style.left = `${0 - (width < height ? diff / 2 : 0)}px`;
        focusContainer.style.top = `${0 - (width > height ? diff / 2 : 0)}px`;
      }
      this._renderer.appendChild(this._hoverContainer, focusContainer);
      setTimeout(() => {
        focusContainer.style.transform = 'scale(5)';
      }, 0);

      this._visibleRipples.push(focusContainer);
    })
  );

  private readonly _hideRippleHandler$ = this._hideRippleAction.pipe(
    tap(() => {
      const ripple = this._visibleRipples.pop();

      if (ripple) {
        Object.assign(ripple.style, {
          opacity: 0,
          transitionDuration: '500ms',
        });
        setTimeout(() => {
          this._renderer.removeChild(this._hoverContainer, ripple);
        }, 1000);
      }
    })
  );
}
