import { CheckboxComponent, CheckboxIcons, IconComponent, registerCustomIcons, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

const checkboxIcons: CheckboxIcons = {
  iconOnState: 'mdi-star-circle',
  iconOffState: 'mdi-star-circle-outline',
  iconPack: 'mdi',
};

@Component({
  standalone: true,
  templateUrl: './custom-icons.component.html',
  styleUrls: ['./custom-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [registerCustomIcons(checkboxIcons)],
  imports: [CheckboxComponent, IconComponent, SlotDirective],
})
export default class CustomIconsComponent {}
