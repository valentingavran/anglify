import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallationComponent {
  public angularInstallation = `$ npm install -g @angular/cli\n$ ng new my-app\n$ cd my-app`;
  public anglifyInstallation = `$ npm install @anglify/components`;
  public addCommonStyles = `// styles.scss\n@use 'node_modules/@anglify/components/styles' as *;\n@use 'node_modules/@anglify/components/styles/themes/light' as *;\n// ...`;

  public importingModules = `import { CardModule } from '@anglify/components';

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
export class AppModule {}
  `;

  public usingComponents = `<anglify-card>Hello world</anglify-card>`;
}
