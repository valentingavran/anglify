import { Directive, ElementRef, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, fromEvent, map } from 'rxjs';
import { focusableElementsString } from '../../composables/position/position.interface';

@UntilDestroy()
@Directive({
  selector: '[anglifyTrapFocus]',
  standalone: true,
})
export class TrapFocusDirective {
  public get anglifyTrapFocus() {
    return this.trapFocus$.value;
  }

  @Input() public set anglifyTrapFocus(value: boolean) {
    this.trapFocus$.next(value);
  }

  private readonly trapFocus$ = new BehaviorSubject(true);

  public constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    fromEvent(document, 'keydown')
      .pipe(
        untilDestroyed(this),
        map(event => event as KeyboardEvent),
        filter(() => this.trapFocus$.value)
      )
      .subscribe(event => {
        const focusableElements = TrapFocusDirective.getAllFocusableElements(this.elementRef.nativeElement);
        if (event.key === 'Tab') {
          const firstFocusableElement = focusableElements[0];
          const lastFocusableElement = focusableElements[focusableElements.length - 1];

          if (focusableElements.length === 0) {
            event.preventDefault();
            return;
          }

          if (event.shiftKey) {
            if (event.target === firstFocusableElement) {
              event.preventDefault();
              lastFocusableElement.focus();
            }
          } else if (event.target === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      });
  }

  public static getAllFocusableElements(parent: HTMLElement) {
    return parent.querySelectorAll(focusableElementsString) as NodeListOf<HTMLElement>;
  }
}
