import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-import-example',
  standalone: true,
  templateUrl: './import-example.component.html',
  styleUrls: ['./import-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HighlightModule, MarkdownModule],
})
export class ImportExampleComponent {
  @Input() public import!: string;
}
