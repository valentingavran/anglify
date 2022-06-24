import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-text-area-page',
  templateUrl: './text-area-page.component.html',
  styleUrls: ['./text-area-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaPageComponent {}
