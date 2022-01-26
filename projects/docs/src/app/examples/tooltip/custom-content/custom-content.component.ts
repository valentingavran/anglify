import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-custom-content',
  templateUrl: './custom-content.component.html',
  styleUrls: ['./custom-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomContentComponent {}
export default CustomContentComponent;
