import { ChangeDetectionStrategy, Component } from '@angular/core';
import { stripIndent } from 'common-tags';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-installation',
  standalone: true,
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HighlightModule],
})
export class InstallationComponent {
  public angularInstallation = `$ npm install -g @angular/cli\n$ ng new my-app\n$ cd my-app`;
  public anglifyInstallation = `$ npm install @anglify/components`;
  public addCommonStyles = stripIndent`
    // styles.scss
    @use 'node_modules/@anglify/components/styles/index';
    @use 'node_modules/@anglify/components/styles/themes/light' as *;
    // ...
    :root {
      @include light-theme;
    }
    // ...`;

  public importingModules = stripIndent`
    import { CardModule } from '@anglify/components';

    @NgModule({
      declarations: [
        //...
      ],
      imports: [
        CardModule
    ],
      providers: [
        //...
      ],
      bootstrap: [AppComponent],
    })
    export class AppModule {}`;

  public usingComponents = `<anglify-card>Hello world</anglify-card>`;
}
