import { CheckboxIcons, registerCustomIcons } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

const checkboxIcons: CheckboxIcons = {
  iconOnState: 'mdi-star-circle',
  iconOffState: 'mdi-star-circle-outline',
  iconPack: 'mdi',
};

@Component({
  selector: 'app-custom-icons',
  templateUrl: './custom-icons.component.html',
  styleUrls: ['./custom-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [registerCustomIcons(checkboxIcons)],
})
export class CustomIconsComponent {}

export default CustomIconsComponent;
