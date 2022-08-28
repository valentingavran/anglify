import { ButtonComponent, IconComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './appearances.component.html',
  styleUrls: ['./appearances.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, IconComponent],
})
export default class AppearancesComponent {}
