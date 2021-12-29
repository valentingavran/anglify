import { Observable } from 'rxjs';

export function observeOnMutation(target: Node, config: MutationObserverInit | undefined): Observable<MutationRecord[]> {
  return new Observable(observer => {
    const mutation = new MutationObserver(mutations => observer.next(mutations));
    mutation.observe(target, config);
    return () => {
      mutation.disconnect();
    };
  });
}
