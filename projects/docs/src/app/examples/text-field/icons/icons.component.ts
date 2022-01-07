import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {}

export default IconsComponent;
