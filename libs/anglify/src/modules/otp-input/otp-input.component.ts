/* eslint-disable @angular-eslint/no-output-native */
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Output,
  QueryList,
  Self,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, map, tap } from 'rxjs';
import { DEFAULT_OTP_INPUT_SETTINGS, OTP_INPUT_SETTINGS } from './otp-input-settings.token';
import { EntireOTPInputSettings } from './otp-input.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { AnglifyIdService } from '../../services/id/id.service';

@UntilDestroy()
@Component({
  selector: 'anglify-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireOTPInputSettings>('anglifyOTPInputSettings', DEFAULT_OTP_INPUT_SETTINGS, OTP_INPUT_SETTINGS),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true,
    },
  ],
})
export class OtpInputComponent implements ControlValueAccessor {
  @ViewChildren('input') private readonly inputRefs?: QueryList<ElementRef<HTMLInputElement>>;
  /** Emitted when cursor is blurred. */
  @Output() public readonly onBlur = new EventEmitter<Event>();
  /** Emitted when the input is filled completely and value gets changed. */
  @Output() private readonly onComplete = new EventEmitter<string>();
  /** Emitted public input gains focus. */
  @Output() public readonly onFocus = new EventEmitter<Event>();
  /** Emitted when the input is changed by user interaction. */
  @Output() public readonly onChange = new EventEmitter<string>();
  /** Disable the input. */
  @Input() public disabled = this.settings.disabled;
  /** Puts input in readonly state. */
  @Input() public readonly = this.settings.readonly;
  /** Displays points instead of the actual values. */
  @Input() public hiddenInput = this.settings.hiddenInput;

  /** The OTP field’s length, */
  @Input() public set length(length: number) {
    this.length$.next(length);
  }

  public get length() {
    return this.length$.value;
  }

  public readonly id = this.idService.generate();
  public readonly focusedIndex$ = new BehaviorSubject(-1);
  public isFocused$ = this.focusedIndex$.pipe(map(index => index >= 0));
  protected otp$ = new BehaviorSubject<string[]>([]);
  private readonly length$ = new BehaviorSubject(this.settings.length);
  protected lengthArray$ = this.length$.pipe(
    map(length =>
      Array(length)
        .fill(0)
        .map((_, index) => index)
    )
  );

  // @ts-expect-error
  private onTouchFn: (...args: any[]) => void = () => {};
  private onChangeFn: (...args: any[]) => void = () => {};

  public constructor(
    private readonly idService: AnglifyIdService,
    @Self() @Inject('anglifyOTPInputSettings') private readonly settings: EntireOTPInputSettings
  ) {
    this.otp$
      .pipe(
        untilDestroyed(this),
        map(otp => otp.join('')),
        tap(otp => {
          // notify about all changes
          this.onChange.emit(otp);
          this.onChangeFn(otp);
        }),
        tap(otp => {
          // notify when otp is complete
          if (otp.length === this.length) this.onComplete.emit(otp);
        }),
        tap(otp => {
          const otpArray = otp.split('');
          // blur after last input is filled
          if (otpArray[this.focusedIndex$.value] && this.focusedIndex$.value === this.length - 1) {
            setTimeout(() => this.inputs?.[this.focusedIndex$.value]?.blur(), 0);
          }
        })
      )
      .subscribe();
  }

  public writeValue(otp: string | null) {
    this.otp$.next(otp?.split('') ?? []);
  }

  public registerOnChange(fn: (...args: any[]) => void) {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: (...args: any[]) => void) {
    this.onTouchFn = fn;
  }

  protected onBlurHandler(event: Event) {
    this.focusedIndex$.next(-1);
    this.onBlur.emit(event);
  }

  protected onInputHandler(event: Event, index: number) {
    const target = event.target as HTMLInputElement;
    const newOtp = [...this.otp$.value];
    newOtp[index] = target.value;
    this.otp$.next(newOtp);
    if (target.value && index + 1 < this.length) this.onFocusHandler(undefined, index + 1);
  }

  protected onFocusHandler(event?: Event, index?: number) {
    event?.preventDefault();
    event?.stopPropagation();
    const ref = this.inputs && this.inputs[index ?? 0];
    if (!ref) return;
    if (document.activeElement !== ref) {
      ref.focus();
      return ref.select();
    }
    if (this.isFocused) return;
    this.focusedIndex$.next(index ?? 0);
    ref.select();
    this.onFocus.emit(event);
  }

  protected onPasteHandler(event: ClipboardEvent, index: number) {
    if (this.readonly || this.disabled) return;
    const maxCursor = this.length - 1;
    const inputVal = event.clipboardData?.getData('Text');
    const inputDataArray = inputVal ? inputVal.split('') : [];
    event.preventDefault();
    const newOtp = [...this.otp$.value];
    for (let i = 0; i < inputDataArray.length; i++) {
      const appIdx = index + i;
      if (appIdx > maxCursor) break;
      newOtp[appIdx] = inputDataArray[i].toString();
    }
    this.otp$.next(newOtp);
    const targetFocus = Math.min(index + inputDataArray.length, maxCursor);
    this.onFocusHandler(undefined, targetFocus);
  }

  protected onKeyUpHandler(event: KeyboardEvent, index: number) {
    event.preventDefault();
    if (['Tab', 'Shift', 'Meta', 'Control', 'Alt'].includes(event.key)) return;
    if (['Delete'].includes(event.key)) return;
    if (event.key === 'ArrowLeft' || (event.key === 'Backspace' && !this.otp$.value[index]))
      return index > 0 && this.onFocusHandler(undefined, index - 1);
    if (event.key === 'ArrowRight') return index + 1 < this.length && this.onFocusHandler(undefined, index + 1);
  }

  private get inputs() {
    return this.inputRefs?.toArray().map(elementRef => elementRef.nativeElement);
  }

  private get isFocused() {
    return this.focusedIndex$.value >= 0;
  }
}
