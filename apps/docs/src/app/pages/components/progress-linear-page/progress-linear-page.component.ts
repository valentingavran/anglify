import { CheckboxComponent, ProgressLinearComponent, RadioButtonComponent } from '@anglify/components';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'anglify-progress-linear-page',
  templateUrl: './progress-linear-page.component.html',
  styleUrls: ['./progress-linear-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...ComponentPageModule, ProgressLinearComponent, CheckboxComponent, RadioButtonComponent, FormsModule, NgIf],
})
export class ProgressLinearPageComponent {
  public config: APIConfig = {
    components: ['ProgressLinearComponent'],
  };

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
