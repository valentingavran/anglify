import { inject, InjectFlags, InjectionToken, Provider } from '@angular/core';

export const SETTINGS = new InjectionToken('Settings Token');

export function createSettingsProvider<T>(defaultValues: T, settingsToken: InjectionToken<any>): Provider {
  return {
    provide: SETTINGS,
    useFactory: () => {
      const overwrittenSettings = inject<typeof SETTINGS>(settingsToken, InjectFlags.Optional);
      return { ...defaultValues, ...overwrittenSettings };
    },
  };
}
