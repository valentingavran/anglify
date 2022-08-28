import { ButtonComponent, TooltipDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './show-hide-manually.component.html',
  styleUrls: ['./show-hide-manually.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipDirective, ButtonComponent],
})
export default class ShowHideManuallyComponent {}
