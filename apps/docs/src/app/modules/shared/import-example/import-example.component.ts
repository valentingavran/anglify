import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-import-example',
  templateUrl: './import-example.component.html',
  styleUrls: ['./import-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportExampleComponent {
  @Input() public import!: string;
}
