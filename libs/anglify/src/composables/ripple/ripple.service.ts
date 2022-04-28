import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent, merge, tap } from 'rxjs';
import { RippleOrigin } from './ripple.interface';

@UntilDestroy()
@Injectable()
export class RippleService {
  public active = true;

  public rippleOrigin: RippleOrigin;

  private readonly showRippleAction = merge(
    fromEvent<KeyboardEvent>(this.elementRef.nativeElement, 'keydown').pipe(
      filter(event => event.code === 'Space' || event.code === 'Enter')
    ),
    fromEvent(this.elementRef.nativeElement, 'mousedown')
  );

  private readonly hideRippleAction = merge(
    fromEvent<KeyboardEvent>(this.elementRef.nativeElement, 'keyup').pipe(
      filter(event => event.code === 'Space' || event.code === 'Enter')
    ),
    fromEvent(this.elementRef.nativeElement, 'mouseup'),
    fromEvent(this.elementRef.nativeElement, 'mouseout')
  );

  private readonly visibleRipples: HTMLElement[] = [];
  private readonly stateContainer = this.createStateContainer();

  public constructor(private readonly elementRef: ElementRef<HTMLElement>, private readonly renderer: Renderer2) {
    this.elementRef.nativeElement.classList.add('anglify-state');
    this.showRippleHandler$.pipe(untilDestroyed(this)).subscribe();
    this.hideRippleHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  private readonly showRippleHandler$ = this.showRippleAction.pipe(
    filter(event => {
      if (event instanceof KeyboardEvent) return !event.repeat;
      return true;
    }),
    filter(() => this.active),
    tap(event => this.createRipple(event))
  );

  private readonly hideRippleHandler$ = this.hideRippleAction.pipe(tap(() => this.destroyLastRipple()));

  private createRipple(event: KeyboardEvent | Event) {
    const width = this.stateContainer.clientWidth;
    const height = this.stateContainer.clientHeight;
    const diff = Math.max(width, height) - Math.min(width, height);

    const focusContainer = this.renderer.createElement('div') as HTMLDivElement;
    focusContainer.classList.add('anglify-state__ripple');

    Object.assign(focusContainer.style, {
      width: `${Math.max(width, height)}px`,
      height: `${Math.max(width, height)}px`,
    });

    if (event instanceof MouseEvent && this.rippleOrigin !== 'center') {
      const offsetX = event.offsetX;
      const offsetY = event.offsetY;
      focusContainer.style.left = `${offsetX - width / 2 - (width < height ? diff / 2 : 0)}px`;
      focusContainer.style.top = `${offsetY - height / 2 - (width > height ? diff / 2 : 0)}px`;
    } else {
      focusContainer.style.left = `${0 - (width < height ? diff / 2 : 0)}px`;
      focusContainer.style.top = `${0 - (width > height ? diff / 2 : 0)}px`;
    }
    this.renderer.appendChild(this.stateContainer, focusContainer);
    setTimeout(() => {
      focusContainer.style.transform = 'scale(5)';
    }, 0);

    this.visibleRipples.push(focusContainer);
  }

  private destroyLastRipple() {
    const ripple = this.visibleRipples.pop();

    if (ripple) {
      Object.assign(ripple.style, { opacity: 0, transitionDuration: '500ms' });
      setTimeout(() => this.renderer.removeChild(this.stateContainer, ripple), 1000);
    }
  }

  private createStateContainer() {
    const container = this.renderer.createElement('div') as HTMLDivElement;
    container.classList.add('anglify-state__container');
    this.renderer.appendChild(this.elementRef.nativeElement, container);
    return container;
  }
}
