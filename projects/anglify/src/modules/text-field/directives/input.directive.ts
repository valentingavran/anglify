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
  private readonly inputEvent$ = merge(fromEvent(this.nativeElement, 'input'), this.mutationObserver$).pipe(shareReplay(1));

  public readonly length$ = this.inputEvent$.pipe(
    startWith(true),
    debounceTime(100),
    map(() => this.nativeElement.value.length),
    distinctUntilChanged(),
    shareReplay(1)
  );

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

  public readonly floating$ = this.length$.pipe(
    startWith(true),
    map(length => length > 0),
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

  public readonly maxLength$ = this.mutationObserver$.pipe(
    startWith(true),
    map(() => {
      return this.nativeElement.getAttribute('maxlength');
    }),
    shareReplay(1)
  );

  public constructor(public readonly elementRef: ElementRef) {}
}
