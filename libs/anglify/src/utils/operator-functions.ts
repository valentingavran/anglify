import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterEmpty<T>() {
  return filter<T>(value => value !== null && value !== undefined) as OperatorFunction<T, Exclude<T, undefined | null>>;
}
