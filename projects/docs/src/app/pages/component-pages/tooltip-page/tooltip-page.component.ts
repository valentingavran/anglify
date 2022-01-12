import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tooltip-page',
  templateUrl: './tooltip-page.component.html',
  styleUrls: ['./tooltip-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPageComponent {}
