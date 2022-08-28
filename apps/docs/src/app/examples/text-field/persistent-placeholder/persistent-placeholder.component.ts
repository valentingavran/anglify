import { InputDirective, TextFieldComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './persistent-placeholder.component.html',
  styleUrls: ['./persistent-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextFieldComponent, InputDirective],
})
export default class PersistentPlaceholderComponent {}
