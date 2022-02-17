import { ModuleWithProviders, NgModule } from '@angular/core';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { DEFAULT_TOOLTIP_SETTINGS, TOOLTIP_SETTINGS } from './tooltip-settings.token';
import { TooltipDirective } from './tooltip.directive';
import { TooltipSettings } from './tooltip.interface';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TooltipDirective, TooltipComponent],
  exports: [TooltipDirective],
  imports: [CommonModule],
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
