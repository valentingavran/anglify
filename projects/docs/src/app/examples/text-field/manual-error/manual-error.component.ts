import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-manual-error',
  templateUrl: './manual-error.component.html',
  styleUrls: ['./manual-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualErrorComponent {}

export default ManualErrorComponent;
