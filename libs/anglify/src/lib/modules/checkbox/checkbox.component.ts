import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Inject, Input, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { CheckboxSettings, LabelPosition, RippleOrigin } from './checkbox.interface';
import { CHECKBOX_SETTINGS, DEFAULT_CHECKBOX_SETTINGS } from './checkbox.token';
import { createSettingsProvider, SETTINGS } from '../../factories/settings.factory';
import { isBooleanLikeTrue } from '../../utils/functions';
import type { BooleanLike } from '../../utils/interfaces';

@Component({
  selector: 'anglify-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
    createSettingsProvider<CheckboxSettings>(DEFAULT_CHECKBOX_SETTINGS, CHECKBOX_SETTINGS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() public disabled: BooleanLike = isBooleanLikeTrue(this.settings.disabled);
  @Input() public checked: BooleanLike = isBooleanLikeTrue(this.settings.checked);
  @Input() public ripple: BooleanLike = isBooleanLikeTrue(this.settings.ripple);
  @Input() public labelPosition: LabelPosition = this.settings.labelPosition;
  @Input() public rippleOrigin: RippleOrigin = this.settings.rippleOrigin;

  @Output() checkedChange = new EventEmitter<boolean>();

  public onChange: (...args: any[]) => void = () => {};
  public onTouch: (...args: any[]) => void = () => {};

  public constructor(@Self() @Inject(SETTINGS) private readonly settings: Required<CheckboxSettings>) {}

  public ngOnInit(): void {
    if (this.disabled) {
      this.ripple = false;
    }
  }

  public registerOnChange(fn: (...args: any[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (...args: any[]) => void): void {
    this.onTouch = fn;
  }

  public writeValue(checked: boolean) {
    this.checked = checked;
  }

  public onModelChange(e: boolean) {
    this.checkedChange.next(e);
    this.onChange(e);
  }
}
