import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-persistent-placeholder',
  templateUrl: './persistent-placeholder.component.html',
  styleUrls: ['./persistent-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersistentPlaceholderComponent {}

export default PersistentPlaceholderComponent;
