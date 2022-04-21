import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'anglify-progress-linear-page',
  templateUrl: './progress-linear-page.component.html',
  styleUrls: ['./progress-linear-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressLinearPageComponent {
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
