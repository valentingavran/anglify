import type { IsActiveMatchOptions } from '@angular/router';
import type { RouterLinkCommands } from '../../utils/interfaces';

export type EntireBreadCrumbsSettings = {
  divider: string;
  items: BreadCrumb[];
};

export type BreadCrumb = {
  disabled?: boolean;
  href?: string;
  matchOptions?: IsActiveMatchOptions;
  routerLink?: RouterLinkCommands;
  text: string;
};

export type BreadCrumbsSettings = Partial<EntireBreadCrumbsSettings>;
