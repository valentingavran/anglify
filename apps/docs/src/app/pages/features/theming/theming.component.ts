import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'anglify-theming',
  standalone: true,
  templateUrl: './theming.component.html',
  styleUrls: ['./theming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HighlightModule],
})
export class ThemingComponent {
  public importingTheme = `// styles.scss\n@use 'node_modules/@anglify/components/styles/themes/light' as *;\n// ...`;
  public ownTheme = `// styles.scss\n:root{\n  --color-primary: #43a047;\n  --color-on-primary-high-emphasis: #000000;\n  // ...\n}`;
}
