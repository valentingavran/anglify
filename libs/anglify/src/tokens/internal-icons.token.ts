import { inject, InjectFlags, InjectionToken } from '@angular/core';
import { deepmerge } from 'deepmerge-ts';
import { DEFAULT_ICON_SETTINGS, ICON_SETTINGS } from '../components/icon/icon-settings.token';
import type { EntireIconSettings, InternalIconSetDefinition } from '../components/icon/icon.interface';

export const INTERNAL_ICONS = new InjectionToken<InternalIconSetDefinition>('Internal Icons', {
  factory() {
    const overwrittenSettings = inject(ICON_SETTINGS, InjectFlags.Optional);
    const mergedSettings = deepmerge(DEFAULT_ICON_SETTINGS, overwrittenSettings ?? {}) as EntireIconSettings;
    return mergedSettings.internalIcons[mergedSettings.iconSet];
  },
});
