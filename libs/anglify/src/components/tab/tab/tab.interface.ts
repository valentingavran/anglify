import type { RouterLinkCommands } from '../../../utils/interfaces';

export type EntireTabSettings = {
  /**
   * Exactly match the link. Without this, `/user/profile/` will match for example every
   * user sub-route too (like `/user/profile/edit`).
   */
  exact: boolean;
  /**
   * If this option is set, the list item will not be displayed as a link even if the [routerLink]
   * property is set.
   */
  inactive: boolean;
  /**
   * Sets the label of the Tab.
   */
  label: string | undefined;
  /**
   * Turns the ripple effect on or off.
   */
  ripple: boolean;
  /**
   * Denotes the target route of the link. You can find more information about the to prop on the
   * [Angular RouterLink documentation](https://angular.io/api/router/RouterLink) page.
   */
  routerLink: RouterLinkCommands;
  /**
   * Controls whether to display the focus and hover styles for this component.
   */
  state: boolean;
};

export type TabSettings = Partial<EntireTabSettings>;
