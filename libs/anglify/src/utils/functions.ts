import { untilDestroyed } from '@ngneat/until-destroy';
import { Observable, tap } from 'rxjs';
import type { BooleanLike } from './interfaces';

export function observeOnMutation(target: Node, config: MutationObserverInit | undefined): Observable<MutationRecord[]> {
  return new Observable(observer => {
    const mutationObserver = new MutationObserver(mutations => observer.next(mutations));
    mutationObserver.observe(target, config);
    return () => {
      mutationObserver.disconnect();
    };
  });
}

export function observeOnResize(target: Element): Observable<ResizeObserverEntry[]> {
  return new Observable(observer => {
    const resizeObserver = new ResizeObserver(entries => observer.next(entries));
    resizeObserver.observe(target);
    return () => {
      resizeObserver.disconnect();
    };
  });
}

export function toBoolean(value: BooleanLike) {
  return value === true || value === 'true' || value === '';
}

export function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches;
}

export function clamp(value: number, min: number, max: number): number {
  return value > max ? max : value < min ? min : value;
}

/**
 * For the method to work, the __@UntilDestroy()__ decorator must be added to the component.
 */
export function bindClassToNativeElement(componentReference: any, data$: Observable<boolean>, element: HTMLElement, className: string) {
  data$
    .pipe(
      untilDestroyed(componentReference),
      tap(value => {
        if (value) {
          element.classList.add(className);
        } else {
          element.classList.remove(className);
        }
      })
    )
    .subscribe();
}

/**
 * For the method to work, the __@UntilDestroy()__ decorator must be added to the component.
 */
export function bindStyleToNativeElement(
  componentReference: any,
  data$: Observable<boolean>,
  element: HTMLElement,
  styleName: string,
  styleValue: string
) {
  data$
    .pipe(
      untilDestroyed(componentReference),
      tap(value => {
        if (value) {
          // @ts-expect-error
          element.style[styleName] = styleValue;
        } else {
          // @ts-expect-error
          element.style[styleName] = null;
        }
      })
    )
    .subscribe();
}
