import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'anglify-icon-fonts',
  standalone: true,
  templateUrl: './icon-fonts.component.html',
  styleUrls: ['./icon-fonts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HighlightModule],
})
export class IconFontsComponent {
  public iconSettingsProvider = `import { IconSettings, ICON_SETTINGS } from '@anglify/components';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        defaultSet: 'fa5', // 'fa4' | 'fa5' | 'md' | 'mdi' | 'custom' | 'faSVG' | 'mdiSVG'
        ...
      }),
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}`;

  public materialDesignIconsImport = `<!-- index.html -->\n<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">`;

  public materialDesignIconsConfig = `// app.module.ts
import { IconSettings, ICON_SETTINGS } from '@anglify/components';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        defaultSet: 'mdi',
        ...
      }),
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}`;

  public materialIconsImport = `<!-- index.html -->\n<link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet" />`;

  public materialIconsConfig = `// app.module.ts
import { IconSettings, ICON_SETTINGS } from '@anglify/components';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        defaultSet: 'md',
        ...
      }),
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}`;

  public fa4Import = `<!-- index.html -->\n<link href="https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css" rel="stylesheet">`;

  public fa4Config = `// app.module.ts
import { IconSettings, ICON_SETTINGS } from '@anglify/components';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        defaultSet: 'fa4',
        ...
      }),
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}`;

  public fa5Import = `<!-- index.html -->\n<link rel="preload" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" as="style" />`;

  public fa5Config = `// app.module.ts
import { IconSettings, ICON_SETTINGS } from '@anglify/components';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        defaultSet: 'fa5',
        ...
      }),
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}`;

  public mdiSVGConfig = `// app.module.ts
import { IconSettings, ICON_SETTINGS } from '@anglify/components';
import { mdiAccount, mdiCancel } from '@mdi/js';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => ({
        defaultSet: 'mdiSVG',
        svgIconSets: {
          mdiSVG: { mdiAccount, mdiCancel,... },
        },
      }),
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}`;

  public faSVGConfig = `// app.module.ts
import { IconSettings, ICON_SETTINGS } from '@anglify/components';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [...],
  imports: [...],
  providers: [
    {
      provide: ICON_SETTINGS,
      useFactory: (): IconSettings => {
        const bookOpen = icon(faBookOpen);
        ...
        return {
          defaultSet: 'faSVG',
          svgIconSets: {
            faSVG: [
              { iconName: bookOpen.iconName, html: bookOpen.html, node: bookOpen.node },
              ...
            ],
          },
        };
      },
    },
    ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}`;
}
