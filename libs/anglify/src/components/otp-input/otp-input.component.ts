/* eslint-disable @angular-eslint/no-output-native */
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Output,
  QueryList,
  Self,
  ViewChildren,
  type ElementRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, map, tap } from 'rxjs';
import { createSettingsProvider } from '../../factories/settings.factory';
import { AnglifyIdService } from '../../services/id/id.service';
import { DEFAULT_OTP_INPUT_SETTINGS, OTP_INPUT_SETTINGS } from './otp-input-settings.token';
import { EntireOTPInputSettings } from './otp-input.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-otp-input',
  standalone: true,
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
  imports: [NgForOf, NgIf, AsyncPipe, NgClass],
})
export class OtpInputComponent implements ControlValueAccessor {
  @ViewChildren('input') private readonly inputRefs?: QueryList<ElementRef<HTMLInputElement>>;

  /**
   * Emitted when cursor is blurred.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onBlur = new EventEmitter<Event>();

  /**
   * Emitted when the input is filled completely and value gets changed.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() private readonly onComplete = new EventEmitter<string>();

  /**
   * Emitted public input gains focus.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onFocus = new EventEmitter<Event>();

  /**
   * Emitted when the input is changed by user interaction.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onChange = new EventEmitter<string>();

  /**
   * Disable the input.
   */
  @Input() public disabled = this.settings.disabled;

  /**
   * Puts input in readonly state.
   */
  @Input() public readonly = this.settings.readonly;

  /**
   * Displays points instead of the actual values.
   */
  @Input() public hiddenInput = this.settings.hiddenInput;

  public get length() {
    return this.length$.value;
  }

  /**
   * The OTP field’s length,
   */
  @Input() public set length(length: number) {
    this.length$.next(length);
  }

  public readonly id = this.idService.generate();

  public readonly focusedIndex$ = new BehaviorSubject(-1);

  public isFocused$ = this.focusedIndex$.pipe(map(index => index >= 0));

  protected otp$ = new BehaviorSubject<string[]>([]);

  private readonly length$ = new BehaviorSubject(this.settings.length);

  protected lengthArray$ = this.length$.pipe(
    map(length =>
      Array.from({ length })
        .fill(0)
        .map((_, index) => index)
    )
  );

  // @ts-expect-error: Value is used
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
            // eslint-disable-next-line no-restricted-globals
            setTimeout(() => this.blur(), 0);
          }
        })
      )
      .subscribe();
  }

  public focus() {
    this.inputs?.[0]?.focus();
  }

  public blur() {
    this.inputs?.[this.focusedIndex$.value]?.blur();
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
      ref.select();
      return;
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
    for (const [index, element] of inputDataArray.entries()) {
      const appIdx = index + index;
      if (appIdx > maxCursor) break;
      newOtp[appIdx] = element.toString();
    }

    this.otp$.next(newOtp);
    const targetFocus = Math.min(index + inputDataArray.length, maxCursor);
    this.onFocusHandler(undefined, targetFocus);
  }

  protected onKeyUpHandler(event: KeyboardEvent, index: number) {
    event.preventDefault();
    if (['Tab', 'Shift', 'Meta', 'Control', 'Alt'].includes(event.key)) return;
    if (['Delete'].includes(event.key)) return;
    if (event.key === 'ArrowLeft' || (event.key === 'Backspace' && !this.otp$.value[index])) {
      if (index > 0) {
        this.onFocusHandler(undefined, index - 1);
      }

      return;
    }

    if (event.key === 'ArrowRight' && index + 1 < this.length) {
      this.onFocusHandler(undefined, index + 1);
    }
  }

  private get inputs() {
    return this.inputRefs?.toArray().map(elementRef => elementRef.nativeElement);
  }

  private get isFocused() {
    return this.focusedIndex$.value >= 0;
  }
}
