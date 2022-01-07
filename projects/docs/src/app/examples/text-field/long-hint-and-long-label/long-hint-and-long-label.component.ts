import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-long-hint-and-long-label',
  templateUrl: './long-hint-and-long-label.component.html',
  styleUrls: ['./long-hint-and-long-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LongHintAndLongLabelComponent {}
export default LongHintAndLongLabelComponent;
