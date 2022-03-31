/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChangeDetectionStrategy, Component, forwardRef, Inject, Input, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { CheckboxSettings } from './checkbox.interface';
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
      multi: true
    },
    createSettingsProvider<CheckboxSettings>(DEFAULT_CHECKBOX_SETTINGS, CHECKBOX_SETTINGS)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() public disabled: BooleanLike = isBooleanLikeTrue(this.settings.disabled);
  @Input() public checked: BooleanLike = isBooleanLikeTrue(this.settings.checked);
  @Input() public ripple: BooleanLike = isBooleanLikeTrue(this.settings.ripple);
  @Input() public labelPosition: 'before' | 'after' = this.settings.labelPosition;

  public onChange: any = () => {};
  public onTouch: any = () => {};

  public constructor(@Self() @Inject(SETTINGS) private readonly settings: Required<CheckboxSettings>) {}

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public writeValue(checked: boolean) {
    this.checked = checked;
  }

  public onModelChange(e: boolean) {
    this.checked = e;
    this.onChange(e);
  }
}
