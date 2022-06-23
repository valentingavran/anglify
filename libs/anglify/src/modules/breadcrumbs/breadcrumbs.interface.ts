import { IsActiveMatchOptions } from '@angular/router';
import { RouterLinkCommands } from '../../utils/interfaces';

export interface EntireBreadCrumbsSettings {
  items: BreadCrumb[];
  divider: string;
  matchOptions: IsActiveMatchOptions;
}
export interface BreadCrumb {
  text: string;
  disabled: boolean;
  href: string;
  routerLink: RouterLinkCommands;
}
export type BreadCrumbsSettings = Partial<EntireBreadCrumbsSettings>;
