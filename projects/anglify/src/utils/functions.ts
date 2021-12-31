import { Observable } from 'rxjs';
import { BooleanLike } from './interfaces';

export function observeOnMutation(target: Node, config: MutationObserverInit | undefined): Observable<MutationRecord[]> {
  return new Observable(observer => {
    const mutation = new MutationObserver(mutations => observer.next(mutations));
    mutation.observe(target, config);
    return () => {
      mutation.disconnect();
    };
  });
}

export function isBooleanLikeTrue(value: BooleanLike): boolean {
  return value === true || value === 'true' || value === '';
}
