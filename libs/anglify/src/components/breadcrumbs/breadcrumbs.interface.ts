import type { IsActiveMatchOptions } from '@angular/router';
import type { RouterLinkCommands } from '../../utils/interfaces';

export type EntireBreadCrumbsSettings = {
  /**
   * Specifies the dividing character between items.
   */
  divider: string;
  /**
   * An array of objects describing each breadcrumb.
   */
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
