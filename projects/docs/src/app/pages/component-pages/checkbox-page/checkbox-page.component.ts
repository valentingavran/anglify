import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-checkbox-page',
  templateUrl: './checkbox-page.component.html',
  styleUrls: ['./checkbox-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckBoxPageComponent {}
