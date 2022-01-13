import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field.component';
import { InputDirective } from './directives/input.directive';
import { LabelDirective } from './directives/label/label.directive';
import { IconModule } from '../icon/icon.module';
import { FormFieldSettings } from './form-field.interface';
import { FORM_FIELD_SETTINGS } from './form-field-settings.token';

const DEFAULT_FORM_FIELD_SETTINGS: Required<FormFieldSettings> = {
  defaultType: 'filled',
  dense: false,
  persistentHint: false,
  persistentPlaceholder: false,
  hideDetails: false,
};

@NgModule({
  declarations: [FormFieldComponent, InputDirective, LabelDirective],
  imports: [CommonModule, IconModule.forRoot({})],
  exports: [FormFieldComponent, InputDirective, LabelDirective],
})
export class FormFieldModule {
  public static forRoot(settings: FormFieldSettings): ModuleWithProviders<FormFieldModule> {
    const mergedSettings: Required<FormFieldSettings> = Object.assign({}, DEFAULT_FORM_FIELD_SETTINGS, settings);

    return {
      ngModule: FormFieldModule,
      providers: [{ provide: FORM_FIELD_SETTINGS, useValue: mergedSettings }],
    };
  }
}
