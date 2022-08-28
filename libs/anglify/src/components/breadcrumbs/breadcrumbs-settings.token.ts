import { InjectionToken } from '@angular/core';
import { BreadCrumbsSettings, EntireBreadCrumbsSettings } from './breadcrumbs.interface';

export const DEFAULT_BREADCRUMBS_SETTINGS: EntireBreadCrumbsSettings = {
  items: [],
  divider: '/',
};
export const BREADCRUMBS_SETTINGS = new InjectionToken<BreadCrumbsSettings>('Breadcrumbs Settings');
