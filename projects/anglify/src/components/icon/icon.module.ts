import { ModuleWithProviders, NgModule } from '@angular/core';
import { IconComponent } from './icon.component';
import { IconSettings } from './icon.interface';
import { ICON_SETTINGS } from './icon-settings.token';
import { CommonModule } from '@angular/common';

const DEFAULT_ICON_SETTINGS: Required<IconSettings> = {
  defaultSet: 'mdi',
  svgIconSets: {},
  internalIcons: {},
  defaultSize: 'normal',
};

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule],
  exports: [IconComponent],
  providers: [{ provide: ICON_SETTINGS, useValue: DEFAULT_ICON_SETTINGS }],
})
export class IconModule {
  public static forRoot(settings: IconSettings): ModuleWithProviders<IconModule> {
    const mergedSettings: Required<IconSettings> = Object.assign({}, DEFAULT_ICON_SETTINGS, settings);

    return {
      ngModule: IconModule,
      providers: [{ provide: ICON_SETTINGS, useValue: mergedSettings }],
    };
  }
}
