import { ButtonGroupComponent, ButtonGroupItemComponent, IconComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonGroupComponent, ButtonGroupItemComponent, IconComponent, ReactiveFormsModule],
})
export default class ReactiveFormsComponent {
  public control = new FormControl([1]);
}
