import { inject, InjectFlags, InjectionToken } from '@angular/core';
import merge from 'ts-deepmerge';
import { DEFAULT_ICON_SETTINGS, ICON_SETTINGS } from '../modules/icon/icon-settings.token';
import { EntireIconSettings, InternalIconSetDefinition } from '../modules/icon/icon.interface';

export const INTERNAL_ICONS = new InjectionToken<InternalIconSetDefinition>('Internal Icons', {
  factory() {
    const overwrittenSettings = inject(ICON_SETTINGS, InjectFlags.Optional);
    const mergedSettings: EntireIconSettings = merge(DEFAULT_ICON_SETTINGS, overwrittenSettings ?? {});
    const internalIcons = mergedSettings.internalIcons[mergedSettings.defaultSet];
    return internalIcons;
  },
});
