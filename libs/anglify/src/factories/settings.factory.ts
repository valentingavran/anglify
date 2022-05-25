import { inject, InjectFlags, InjectionToken, Provider } from '@angular/core';
import { deepmerge } from 'deepmerge-ts';

/**
 *
 * @param name Name of the new settings provider, which is only used internally and is created with this method.
 * @param defaultValues The default values for the component, which will be merged with the values of the settingsToken parameter
 * @param settingsToken The settings overwritten and provided by the user. The missing values in the token are compensated by the defaultValues
 * @returns An InjectionToken with the passed name
 */
export function createSettingsProvider<T>(name: string, defaultValues: T, settingsToken: InjectionToken<any>): Provider {
  return {
    provide: name,
    useFactory: () => {
      const overwrittenSettings = inject<InjectionToken<any>>(settingsToken, InjectFlags.Optional);
      return deepmerge(defaultValues, overwrittenSettings ?? {});
    },
  };
}
