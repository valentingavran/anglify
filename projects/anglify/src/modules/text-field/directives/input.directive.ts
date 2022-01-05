import { Directive, ElementRef, OnInit, Optional, Self } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { observeOnMutation } from '../../../utils/functions';
import { fromEvent, merge, NEVER, Observable, of, Subject } from 'rxjs';
import { NgControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: 'input[anglifyInput]',
})
export class InputDirective implements OnInit {
  private readonly nativeElement: HTMLInputElement = this.elementRef.nativeElement;
  private readonly mutationObserver$ = observeOnMutation(this.nativeElement, { attributes: true }).pipe(shareReplay(1));
  private readonly inputEvent$ = merge(fromEvent(this.nativeElement, 'input'), this.mutationObserver$).pipe(shareReplay(1));
  private readonly statusChanged$ = new Subject();

  public readonly length$ = this.inputEvent$.pipe(
    startWith(false),
    debounceTime(100),
    map(() => this.nativeElement.value.length),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public readonly readonly$ = this.mutationObserver$.pipe(
    startWith(false),
    map(() => {
      return this.nativeElement.hasAttribute('readonly');
    }),
    shareReplay(1)
  );

  public readonly disabled$ = this.mutationObserver$.pipe(
    startWith(false),
    map(() => {
      return this.nativeElement.hasAttribute('disabled');
    }),
    shareReplay(1)
  );

  public readonly floating$ = this.length$.pipe(
    startWith(false),
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
    startWith(false),
    map(() => {
      return this.nativeElement.getAttribute('maxlength');
    }),
    shareReplay(1)
  );

  public valid$: Observable<string | null> = merge(
    this.statusChanged$,
    this.inputEvent$,
    fromEvent(this.nativeElement as HTMLElement, 'focusout')
  ).pipe(
    startWith(false),
    switchMap((_, index) => {
      const value = this.nativeElement.value;
      const length = value.length;
      const required = this.nativeElement.hasAttribute('required');
      const minlength = this.nativeElement.getAttribute('minlength');
      const maxlength = this.nativeElement.getAttribute('maxlength');
      const pattern = this.nativeElement.getAttribute('pattern');

      // these checks must be ignored on first emit, because of startWith(false)
      if (index > 0) {
        // First validate Reactive Forms, because they have the highest priority
        if (this.ngControl) {
          if (this.ngControl.valid) {
            return of(null);
          }

          return of(this.ngControl.errors?.message ?? 'This field is invalid');
        }

        // If no reactive forms or if reactive form valid, validate native validation
        if (length === 0 && required) {
          return of('This field is required');
        }
        if (minlength && length < parseInt(minlength, 10)) {
          return of(`This field must be at least ${minlength} characters long`);
        }
        if (pattern && !new RegExp(pattern).test(value)) {
          return of(`This field is invalid`);
        }
      }

      // maxlength must be checked from first emit on (maybe it's prefilled with a too long value)
      if (maxlength && length > parseInt(maxlength, 10)) {
        return of(`This field must not be longer than ${maxlength} characters`);
      }

      // only on first emit
      if (index === 0) {
        if (length > 0) {
          if (minlength && length < parseInt(minlength, 10)) {
            return of(`This field must be at least ${minlength} characters long`);
          }
          if (pattern && !new RegExp(pattern).test(value)) {
            return of(`This field is invalid`);
          }
        }

        return NEVER;
      }

      return of(null);
    }),
    distinctUntilChanged(),
    shareReplay(1)
  );

  public constructor(public readonly elementRef: ElementRef, @Optional() @Self() public ngControl?: NgControl) {}

  public ngOnInit(): void {
    if (this.ngControl) {
      const abstractControl = this.ngControl.control;
      abstractControl?.statusChanges.pipe(untilDestroyed(this)).subscribe(() => this.statusChanged$.next());
    }
  }
}
