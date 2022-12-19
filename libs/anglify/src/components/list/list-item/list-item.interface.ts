/* eslint-disable tsdoc/syntax */
import type { RouterLinkCommands } from '../../../utils/interfaces';

export type EntireListItemSettings = {
  /**
   * Marks this item as active, which changes the style.
   */
  active: boolean;
  /**
   * Lowers max height of this list item.
   */
  dense: boolean;
  /**
   * Disables the component.
   */
  disabled: boolean;
  /**
   * Exactly match the link. Without this, `/user/profile/` will match for example every
   * user sub-route too (like `/user/profile/edit`).
   */
  exact: boolean;
  /**
   * Enables or disables keyboard navigation.
   */
  focusable: boolean;
  /**
   * Sets the same styling as if the item was focused.
   */
  highlight: boolean;
  /**
   * If this option is set, the list item will not be displayed as a link even if the [routerLink]
   * property is set.
   */
  inactive: boolean;
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
   * Allow text selection inside anglify-list-item. This prop uses {@link https://developer.mozilla.org/en-US/docs/Web/CSS/user-select user-select}
   */
  selectable: boolean;
  /**
   * Controls whether to display the focus and hover styles for this component.
   */
  state: boolean;
};

export type ListItemSettings = Partial<EntireListItemSettings>;
