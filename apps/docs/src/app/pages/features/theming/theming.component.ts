import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-theming',
  templateUrl: './theming.component.html',
  styleUrls: ['./theming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemingComponent {
  public importingTheme = `// styles.scss\n@use 'node_modules/@anglify/components/styles/themes/light' as *;\n// ...`;
  public ownTheme = `// styles.scss\n:root{\n  --color-primary: #43a047;\n  --color-on-primary-high-emphasis: #000000;\n  // ...\n}`;
}
