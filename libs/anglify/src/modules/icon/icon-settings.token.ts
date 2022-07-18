import { InjectionToken } from '@angular/core';
import { mdiCheck, mdiChevronDown, mdiClose, mdiCloseCircle, mdiPencil } from '@mdi/js';
import type { EntireIconSettings, IconSettings } from './icon.interface';

export const DEFAULT_ICON_SETTINGS: EntireIconSettings = {
  defaultSet: 'mdi',
  svgIconSets: {
    custom: {
      mdiCheck,
      mdiChevronDown,
      mdiClose,
      mdiCloseCircle,
      mdiPencil,
    },
    mdiSVG: {
      mdiCheck,
      mdiChevronDown,
      mdiClose,
      mdiCloseCircle,
      mdiPencil,
    },
  },
  defaultSize: 'regular',
  internalIcons: {
    custom: {
      check: 'mdiCheck',
      chevronDown: 'mdiChevronDown',
      close: 'mdiClose',
      closeCircle: 'mdiCircleClose',
      edit: 'mdiPencil',
    },
    fa4: {
      check: 'fa-check',
      chevronDown: 'fa-chevron-down',
      close: 'fa-close',
      closeCircle: 'fa-times-circle',
      edit: 'fa-pencil',
    },
    fa5: {
      check: 'fa-check',
      chevronDown: 'fa-chevron-down',
      close: 'fa-close',
      closeCircle: 'fa-times-circle',
      edit: 'fa-pencil',
    },
    md: {
      check: 'check',
      chevronDown: 'expand_more',
      close: 'close',
      closeCircle: 'highlight_off',
      edit: 'edit',
    },
    mdi: {
      check: 'mdi-check',
      chevronDown: 'mdi-chevron-down',
      close: 'mdi-close',
      closeCircle: 'mdi-close-circle',
      edit: 'mdi-pencil',
    },
    mdiSVG: {
      check: 'mdiCheck',
      chevronDown: 'mdiChevronDown',
      close: 'mdiClose',
      closeCircle: 'mdiCloseCircle',
      edit: 'mdiPencil',
    },
    faSVG: {
      check: '',
      chevronDown: '',
      close: '',
      closeCircle: '',
      edit: '',
    },
  },
};

export const ICON_SETTINGS = new InjectionToken<IconSettings>('Icon Settings');
