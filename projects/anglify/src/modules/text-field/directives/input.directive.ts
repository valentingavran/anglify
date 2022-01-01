import { Directive, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';
import { observeOnMutation } from '../../../utils/functions';
import { fromEvent, merge } from 'rxjs';

@Directive({
  selector: 'input[anglifyInput]',
})
export class InputDirective {
  private readonly nativeElement: HTMLInputElement = this.elementRef.nativeElement;
  private readonly mutationObserver$ = observeOnMutation(this.nativeElement, { attributes: true }).pipe(shareReplay(1));

  public readonly readonly$ = this.mutationObserver$.pipe(
    startWith(true),
    map(() => {
      return this.nativeElement.hasAttribute('readonly');
    }),
    shareReplay(1)
  );

  public readonly disabled$ = this.mutationObserver$.pipe(
    startWith(true),
    map(() => {
      return this.nativeElement.hasAttribute('disabled');
    }),
    shareReplay(1)
  );

  public readonly floating$ = merge(fromEvent(this.nativeElement, 'input'), this.mutationObserver$).pipe(
    debounceTime(100),
    startWith(true),
    map(() => this.nativeElement.value),
    map(value => {
      return value.length > 0;
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public readonly focused$ = merge(
    fromEvent(this.nativeElement as HTMLElement, 'focusin'),
    fromEvent(this.nativeElement as HTMLElement, 'focusout')
  ).pipe(
    map(event => {
      return event.type === 'focusin';
    }),
    startWith(false),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public constructor(public readonly elementRef: ElementRef) {}
}
