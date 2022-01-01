import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-text-field-page',
  templateUrl: './text-field-page.component.html',
  styleUrls: ['./text-field-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldPageComponent {
  public visible = false;
  public readonlyToggle = true;
}
