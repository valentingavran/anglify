import { InjectionToken } from '@angular/core';
import { mdiCheck, mdiChevronDown, mdiPencil } from '@mdi/js';
import type { EntireIconSettings, IconSettings } from './icon.interface';

export const DEFAULT_ICON_SETTINGS: EntireIconSettings = {
  defaultSet: 'mdi',
  svgIconSets: {
    custom: {
      mdiCheck,
      mdiChevronDown,
      mdiPencil,
    },
    mdiSVG: {
      mdiCheck,
      mdiChevronDown,
      mdiPencil,
    },
  },
  defaultSize: 'regular',
  internalIcons: {
    custom: {
      check: 'mdiCheck',
      chevronDown: 'mdiChevronDown',
      edit: 'mdiPencil',
    },
    fa4: {
      check: 'fa-check',
      chevronDown: 'fa-chevron-down',
      edit: 'fa-pencil',
    },
    fa5: {
      check: 'fa-check',
      chevronDown: 'fa-chevron-down',
      edit: 'fa-pencil',
    },
    md: {
      check: 'check',
      chevronDown: 'expand_more',
      edit: 'edit',
    },
    mdi: {
      check: 'mdi-check',
      chevronDown: 'mdi-chevron-down',
      edit: 'mdi-pencil',
    },
    mdiSVG: {
      check: 'mdiCheck',
      chevronDown: 'mdiChevronDown',
      edit: 'mdiPencil',
    },
    faSVG: {
      check: '',
      chevronDown: '',
      edit: '',
    },
  },
};

export const ICON_SETTINGS = new InjectionToken<IconSettings>('Icon Settings');
