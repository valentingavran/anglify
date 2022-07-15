import { untilDestroyed } from '@ngneat/until-destroy';
import { Observable, pairwise, startWith, tap } from 'rxjs';

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

export function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches;
}

export function clamp(value: number, min: number, max: number) {
  return value > max ? max : value < min ? min : value;
}

export function diff(o: number[], n: number[]) {
  o.sort((a, b) => (a < b ? a : b));
  n.sort((a, b) => (a < b ? a : b));

  // don't compare if either list is empty
  if (o.length === 0 || n.length === 0) return { added: n, removed: o };

  // declare temporary variables
  let op = 0;
  let np = 0;
  let a = [];
  let r = [];

  // compare arrays and add to add or remove lists
  while (op < o.length && np < n.length) {
    if (o[op] < n[np]) {
      // push to diff?
      r.push(o[op]);
      op++;
    } else if (o[op] > n[np]) {
      // push to diff?
      a.push(n[np]);
      np++;
    } else {
      op++;
      np++;
    }
  }

  // add remaining items
  if (np < n.length) a = a.concat(n.slice(np, n.length));
  if (op < o.length) r = r.concat(o.slice(op, o.length));

  return { added: a, removed: r };
}

export function pull<T>(sourceArray: T[], ...removeList: T[]): T[] {
  const removeSet = new Set(removeList);
  return sourceArray.filter(el => !removeSet.has(el));
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

export function bindObservableValueToNativeElement(componentReference: any, data$: Observable<string>, element: HTMLElement, prefix = '') {
  data$
    .pipe(
      untilDestroyed(componentReference),
      startWith(''),
      pairwise(),
      tap(([oldValue, newValue]) => {
        oldValue.length && element.classList.remove(`${prefix}${oldValue}`);
        element.classList.add(`${prefix}${newValue}`);
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
