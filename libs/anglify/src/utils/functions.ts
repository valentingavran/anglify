import { untilDestroyed } from '@ngneat/until-destroy';
import { Observable, pairwise, startWith, tap } from 'rxjs';
import { focusableElementsString } from '../composables/position/position.interface';

export function observeOnMutation$(target: Node, config: MutationObserverInit | undefined): Observable<MutationRecord[]> {
  return new Observable(observer => {
    const mutationObserver = new MutationObserver(mutations => observer.next(mutations));
    mutationObserver.observe(target, config);
    return () => {
      mutationObserver.disconnect();
    };
  });
}

export function observeOnResize$(target: Element): Observable<ResizeObserverEntry[]> {
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

export function diff(source: number[], toCompare: number[]) {
  source.sort((a, b) => (a < b ? a : b));
  toCompare.sort((a, b) => (a < b ? a : b));

  // don't compare if either list is empty
  if (source.length === 0 || toCompare.length === 0) return { added: toCompare, removed: source };

  // declare temporary variables
  let op = 0;
  let np = 0;
  let added = [];
  let removed = [];

  // compare arrays and add to add or remove lists
  while (op < source.length && np < toCompare.length) {
    if (source[op] < toCompare[np]) {
      // push to diff?
      removed.push(source[op]);
      op++;
    } else if (source[op] > toCompare[np]) {
      // push to diff?
      added.push(toCompare[np]);
      np++;
    } else {
      op++;
      np++;
    }
  }

  // add remaining items
  if (np < toCompare.length) added = added.concat(toCompare.slice(np, toCompare.length));
  if (op < source.length) removed = removed.concat(source.slice(op, source.length));

  return { added, removed };
}

export function pull<T>(sourceArray: T[], ...removeList: T[]): T[] {
  const removeSet = new Set(removeList);
  return sourceArray.filter(el => !removeSet.has(el));
}

/**
 * For the method to work, the __\@UntilDestroy()__ decorator must be added to the component.
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
 * For the method to work, the __\@UntilDestroy()__ decorator must be added to the component.
 */
export function bindAttrToNativeElement(
  componentReference: any,
  data$: Observable<boolean>,
  element: HTMLElement,
  attribute: string,
  attributeValue: string
) {
  data$
    .pipe(
      untilDestroyed(componentReference),
      tap(value => {
        if (value) {
          element.setAttribute(attribute, attributeValue);
        } else {
          element.removeAttribute(attribute);
        }
      })
    )
    .subscribe();
}

/**
 * For the method to work, the __\@UntilDestroy()__ decorator must be added to the component.
 */
export function bindObservableValueToNativeElement(componentReference: any, data$: Observable<string>, element: HTMLElement, prefix = '') {
  data$
    .pipe(
      untilDestroyed(componentReference),
      startWith(''),
      pairwise(),
      tap(([oldValue, newValue]) => {
        if (oldValue.length) {
          element.classList.remove(`${prefix}${oldValue}`);
        }

        element.classList.add(`${prefix}${newValue}`);
      })
    )
    .subscribe();
}

/**
 * For the method to work, the __\@UntilDestroy()__ decorator must be added to the component.
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
          // @ts-expect-error: Typescript has no type information, though this is correct
          element.style[styleName] = styleValue;
        } else {
          // @ts-expect-error: Typescript has no type information, though this is correct
          element.style[styleName] = null;
        }
      })
    )
    .subscribe();
}

/**
 * For the method to work, the __\@UntilDestroy()__ decorator must be added to the component.
 */
export function bindStyleValueToNativeElement(componentReference: any, data$: Observable<string>, element: HTMLElement, styleName: string) {
  data$
    .pipe(
      untilDestroyed(componentReference),
      tap(value => {
        if (value) {
          element.style.setProperty(styleName, value);
        } else {
          element.style.removeProperty(styleName);
        }
      })
    )
    .subscribe();
}

export function getFirstAndLastFocusableElements(parent: HTMLElement) {
  const focusableElements = parent.querySelectorAll(focusableElementsString) as NodeListOf<HTMLElement>;
  return {
    firstFocusable: focusableElements.length ? focusableElements[0] : null,
    lastFocusable: focusableElements.length ? focusableElements[focusableElements.length - 1] : null,
    allFocusableElements: focusableElements,
  };
}
