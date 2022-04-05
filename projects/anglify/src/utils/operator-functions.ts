import { filter } from 'rxjs/operators';

export function filterEmpty<T>() {
  return filter<T>(value => Boolean(value));
}
