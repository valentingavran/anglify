import { CheckboxComponent, ProgressLinearComponent as AnglifyProgressLinearComponent, RadioButtonComponent } from '@anglify/components';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [AnglifyProgressLinearComponent, CheckboxComponent, RadioButtonComponent, FormsModule, NgIf],
  templateUrl: './progress-linear-playground.component.html',
  styleUrls: ['./progress-linear-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressLinearPlaygroundComponent {
  public mode = 'indeterminate';

  public progress = 60;

  public buffer = 70;

  public stream = true;

  public size = 4;

  @HostBinding('style.--docs-progress-linear-playground-size')
  public get getSizeInPx() {
    return `${this.size}px`;
  }

  public get isIndeterminate() {
    return this.mode === 'indeterminate';
  }
}
