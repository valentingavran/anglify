import { SimpleTableComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'anglify-breakpoints',
  standalone: true,
  templateUrl: './breakpoints.component.html',
  styleUrls: ['./breakpoints.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SimpleTableComponent, HighlightModule],
})
export class BreakpointsComponent {
  public scssMixinExample = `@use 'node_modules/@anglify/components/styles/mixins/breakpoints.scss' as *;
  :host {
    background-color: red; // red on xs and sm devices

    @include md-and-up {
      background-color: green; // green on medium sized devices
    }

    @include lg-and-up {
      background-color: blue; // blue on large devices and xl devices
    }
  }`;

  public breakpointObserverServiceTypescriptExample = `import { BreakpointObserverService } from '@anglify/components';

@Component({...})
export class MyComponent {
  
  public constructor(private breakpointObserverService: BreakpointObserverService) {}

}`;

  public breakpointObserverServiceHTMLExample = `<anglify-navigation-drawer [mode]="(breakpointService.mdAndDown$ | async) ? 'modal' : 'standard'">
  ...
</anglify-navigation-drawer>`;

  public breakpointObserverServiceConfigurationExample = `import { BREAKPOINT_SETTINGS } from '@anglify/components';
  
  @NgModule({
    // ...
    providers: [
      {
        provide: BREAKPOINT_SETTINGS,
        useValue: {
          xl: 1920,
          lg: 1440,
          md: 720,
          sm: 480,
          xs: 0,
        },
      },
      // ...
    ],
    bootstrap: [AppComponent],
  })
  export class AppModule {}`;

  public scssMixinsConfigurationExample = `@forward '../../../libs/anglify/src/styles/mixins/breakpoints.scss' with (
    $grid-breakpoints: (
      'xs': 0,
      'sm': 480px,
      'md': 720px,
      'lg': 1440px,
      'xl': 1920px,
    )
  );
  `;
}
