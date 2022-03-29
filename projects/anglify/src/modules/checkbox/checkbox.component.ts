/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'anglify-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() public disabled!: boolean;
  @Input() public checked!: boolean;
  @Input() public labelPosition!: 'before' | 'after';

  public onChange: any = () => {};
  public onTouch: any = () => {};

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
