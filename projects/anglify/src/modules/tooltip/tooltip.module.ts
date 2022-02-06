import { ModuleWithProviders, NgModule } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';
import { TooltipSettings } from './tooltip.interface';
import { DEFAULT_TOOLTIP_SETTINGS, TOOLTIP_SETTINGS } from './tooltip-settings.token';

@NgModule({
  declarations: [TooltipDirective],
  exports: [TooltipDirective],
})
export class TooltipModule {
  public static forRoot(settings: TooltipSettings): ModuleWithProviders<TooltipModule> {
    const mergedSettings: Required<TooltipSettings> = Object.assign({}, DEFAULT_TOOLTIP_SETTINGS, settings);

    return {
      ngModule: TooltipModule,
      providers: [{ provide: TOOLTIP_SETTINGS, useValue: mergedSettings }],
    };
  }
}
