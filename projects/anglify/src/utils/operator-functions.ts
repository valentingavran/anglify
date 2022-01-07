import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterEmpty<T>(): OperatorFunction<T | null | undefined, T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return filter<T>(value => value !== undefined && value !== null);
}
