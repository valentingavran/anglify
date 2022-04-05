import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-clickable',
  templateUrl: './clickable.component.html',
  styleUrls: ['./clickable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickableComponent {}

export default ClickableComponent;
