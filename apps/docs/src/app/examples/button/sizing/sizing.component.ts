import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sizing',
  templateUrl: './sizing.component.html',
  styleUrls: ['./sizing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizingComponent {}

export default SizingComponent;
