import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs/operators';
import { BooleanLike } from '../../utils/interfaces';
import { isBooleanLikeTrue } from '../../utils/functions';

@UntilDestroy(this)
@Directive({
  selector: '[anglifyOverlay]',
})
export class OverlayDirective {
  @Input()
  public set selected(value: BooleanLike) {
    if (isBooleanLikeTrue(value)) {
      this._selectedOrActivatedContainer.style.backgroundColor = 'var(--overlay-color-selected, var(--color-primary)';
      this._selectedOrActivatedContainer.style.opacity = 'var(--overlay-opacity-selected, 8%)';
    } else {
      this._selectedOrActivatedContainer.style.backgroundColor = 'transparent';
    }
  }

  @Input()
  public set activated(value: BooleanLike) {
    if (isBooleanLikeTrue(value)) {
      this._selectedOrActivatedContainer.style.backgroundColor = 'var(--overlay-color-activated, var(--color-primary)';
      this._selectedOrActivatedContainer.style.opacity = 'var(--overlay-opacity-activated, 12%)';
    } else {
      this._selectedOrActivatedContainer.style.backgroundColor = 'transparent';
    }
  }

  @Input() public ripple: BooleanLike = true;

  private readonly _nativeElement: HTMLElement;
  private readonly _hoverContainer: HTMLElement;
  private readonly _selectedOrActivatedContainer: HTMLElement;

  private readonly _visibleRipples: HTMLElement[] = [];
  private readonly _showRippleAction = new Subject<Event>();
  private readonly _hideRippleAction = new Subject();

  public constructor(private readonly _element: ElementRef, private readonly _renderer: Renderer2) {
    this._nativeElement = this._element.nativeElement;
    this._nativeElement.style.position = 'relative';
    this._hoverContainer = this.createOverlayContainer();
    this._selectedOrActivatedContainer = this.createOverlayContainer();
    this._showRippleHandler$.pipe(untilDestroyed(this)).subscribe();
    this._hideRippleHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  @HostListener('mouseenter')
  private onMouseEnter(): void {
    this._hoverContainer.style.backgroundColor = 'var(--overlay-color-hovered, rgba(0, 0, 0, 0.04))';
  }

  @HostListener('mouseleave')
  private onMouseLeave(): void {
    this._hoverContainer.style.backgroundColor = 'transparent';
  }

  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('mousedown', ['$event'])
  private onShow(event: KeyboardEvent | MouseEvent): void {
    this._showRippleAction.next(event);
  }

  @HostListener('keyup.space')
  @HostListener('keyup.enter')
  @HostListener('mouseup')
  private onKeyup(): void {
    this._hideRippleAction.next();
  }

  private createOverlayContainer(): HTMLElement {
    const hoverContainer = this._renderer.createElement('div');
    this._renderer.appendChild(this._nativeElement, hoverContainer);
    Object.assign(hoverContainer.style, {
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
      overflow: 'hidden',
    });
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

      const showRipple = isBooleanLikeTrue(this.ripple);

      const pressAndFocusContainer: HTMLElement = this._renderer.createElement('div');
      Object.assign(pressAndFocusContainer.style, {
        position: 'absolute',
        borderRadius: '50%',
        transitionProperty: showRipple ? 'transform, opacity' : undefined,
        transitionTimingFunction: showRipple ? 'linear' : undefined,
        transitionDuration: showRipple ? '1000ms' : undefined,
        backgroundColor: 'var(--overlay-color-focused, rgba(0, 0, 0, 0.12))',
        opacity: '100%',
        transform: 'scale(0)',
        width: `${Math.max(width, height)}px`,
        height: `${Math.max(width, height)}px`,
      });

      if (event instanceof MouseEvent) {
        const offsetX = event.offsetX;
        const offsetY = event.offsetY;
        pressAndFocusContainer.style.left = `${offsetX - width / 2 - (width < height ? diff / 2 : 0)}px`;
        pressAndFocusContainer.style.top = `${offsetY - height / 2 - (width > height ? diff / 2 : 0)}px`;
      } else {
        pressAndFocusContainer.style.left = `${0 - (width < height ? diff / 2 : 0)}px`;
        pressAndFocusContainer.style.top = `${0 - (width > height ? diff / 2 : 0)}px`;
      }
      this._renderer.appendChild(this._hoverContainer, pressAndFocusContainer);
      setTimeout(() => {
        pressAndFocusContainer.style.transform = 'scale(5)';
      }, 0);

      this._visibleRipples.push(pressAndFocusContainer);
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
