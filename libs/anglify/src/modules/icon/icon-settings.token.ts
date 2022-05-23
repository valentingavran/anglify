import { InjectionToken } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faChevronDown, faPencil } from '@fortawesome/free-solid-svg-icons';
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
    faSVG: [
      { iconName: faCheck.iconName, html: icon(faCheck).html, node: icon(faCheck).node },
      { iconName: faChevronDown.iconName, html: icon(faChevronDown).html, node: icon(faChevronDown).node },
      { iconName: faPencil.iconName, html: icon(faPencil).html, node: icon(faPencil).node },
    ],
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
      check: faCheck.iconName,
      chevronDown: faChevronDown.iconName,
      edit: faPencil.iconName,
    },
  },
};

export const ICON_SETTINGS = new InjectionToken<IconSettings>('Icon Settings');
