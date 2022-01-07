import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-long-text',
  templateUrl: './long-text.component.html',
  styleUrls: ['./long-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongTextComponent {}

export default LongTextComponent;
