import { ModuleWithProviders, NgModule } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';
import { TooltipSettings } from './tooltip.interface';
import { TOOLTIP_SETTINGS } from './tooltip-settings.token';

const DEFAULT_TOOLTIP_SETTINGS: Required<TooltipSettings> = {
  position: 'BOTTOM',
  openDelay: 0,
  closeDelay: 0,
  mobileTrigger: 'long',
  preventContextMenuOnTouchDevice: false,
  defaultOffset: 10,
};

@NgModule({
  declarations: [TooltipDirective],
  exports: [TooltipDirective],
  providers: [{ provide: TOOLTIP_SETTINGS, useValue: DEFAULT_TOOLTIP_SETTINGS }],
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
