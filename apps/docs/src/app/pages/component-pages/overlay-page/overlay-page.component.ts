import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overlay-page',
  templateUrl: './overlay-page.component.html',
  styleUrls: ['./overlay-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayPageComponent {}
