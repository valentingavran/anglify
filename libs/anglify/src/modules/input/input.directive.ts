import { Directive, ElementRef, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  NEVER,
  Observable,
  of,
  share,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { AnglifyIdService } from '../../services/id/id.service';
import { observeOnMutation } from '../../utils/functions';

@UntilDestroy()
@Directive({
  selector: 'input[anglifyInput], textarea[anglifyInput]',
})
export class InputDirective implements OnInit {
  public readonly id = this.idService.generate();

  @Input() public set rows(rows: number) {
    if (this.elementRef.nativeElement instanceof HTMLTextAreaElement) {
      this.elementRef.nativeElement.rows = rows;
    }
  }

  public constructor(
    public readonly elementRef: ElementRef<HTMLTextAreaElement | HTMLInputElement>,
    private readonly idService: AnglifyIdService,
    @Optional() @Self() public ngControl?: NgControl
  ) {
    this.elementRef.nativeElement.id = this.id;
    if (this.elementRef.nativeElement instanceof HTMLTextAreaElement) {
      this.rows = 2;
    }
  }

  public ngOnInit() {
    if (this.ngControl) {
      const abstractControl = this.ngControl.control;
      abstractControl?.statusChanges.pipe(untilDestroyed(this)).subscribe(() => this.statusChanged$.next());
    }
  }

  private readonly mutationObserver$ = observeOnMutation(this.elementRef.nativeElement, { attributes: true }).pipe(share());
  private readonly inputEvent$ = merge(fromEvent(this.elementRef.nativeElement, 'input'), this.mutationObserver$).pipe(share());
  private readonly statusChanged$ = new Subject<void>();

  public readonly length$ = merge(this.inputEvent$, this.statusChanged$).pipe(
    startWith(false),
    debounceTime(100),
    map(() => this.elementRef.nativeElement.value.length),
    distinctUntilChanged(),
    share()
  );

  public readonly readonly$ = this.mutationObserver$.pipe(
    startWith(false),
    map(() => this.elementRef.nativeElement.hasAttribute('readonly')),
    share()
  );

  public readonly disabled$ = this.mutationObserver$.pipe(
    startWith(false),
    map(() => this.elementRef.nativeElement.hasAttribute('disabled')),
    share()
  );

  public readonly floating$ = this.length$.pipe(
    startWith(false),
    map(length => length > 0),
    distinctUntilChanged(),
    share()
  );

  public readonly focused$ = merge(
    fromEvent(this.elementRef.nativeElement, 'focusin'),
    fromEvent(this.elementRef.nativeElement, 'focusout')
  ).pipe(
    map(event => event.type === 'focusin'),
    startWith(false),
    distinctUntilChanged(),
    share()
  );

  public readonly maxLength$ = this.mutationObserver$.pipe(
    startWith(false),
    map(() => Number(this.elementRef.nativeElement.getAttribute('maxlength'))),
    share()
  );

  public invalid$: Observable<string | null> = merge(
    this.statusChanged$,
    this.inputEvent$,
    fromEvent(this.elementRef.nativeElement, 'focusout')
  ).pipe(
    startWith(false),
    switchMap((_, index) => {
      const value = this.elementRef.nativeElement.value;
      const length = value.length;
      const required = this.elementRef.nativeElement.hasAttribute('required');
      const minlength = this.elementRef.nativeElement.getAttribute('minlength');
      const maxlength = this.elementRef.nativeElement.getAttribute('maxlength');
      const pattern = this.elementRef.nativeElement.getAttribute('pattern');

      if (this.ngControl?.disabled) {
        return of(null);
      }
      if (this.ngControl?.untouched && this.ngControl.pristine) {
        return of(null);
      }
      // these checks must be ignored on first emit, because of startWith(false)
      if (index > 0) {
        // First validate Reactive Forms, because they have the highest priority
        if (this.ngControl) {
          if (this.ngControl.valid) {
            return of(null);
          }

          // eslint-disable-next-line @typescript-eslint/dot-notation
          return of(this.ngControl.errors?.['message'] ?? null);
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
    share()
  );
}
