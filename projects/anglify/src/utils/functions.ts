import { Observable } from 'rxjs';
import { BooleanLike } from './interfaces';

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

export function isBooleanLikeTrue(value: BooleanLike): boolean {
  return value === true || value === 'true' || value === '';
}
