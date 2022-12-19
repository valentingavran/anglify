import type { Options as OffsetOptions } from '@floating-ui/core/src/middleware/offset';
import type { Position } from '../../composables/position/position.interface';

export type MenuMountingPoint = HTMLElement | 'body' | 'parent';

export type EntireMenuSettings = {
  /**
   * With this enabled, the menu will be closed when the user presses the escape key.
   */
  closeOnEscape: boolean;
  /**
   * With this enabled, the menu will be closed when the user clicks inside of it.
   */
  closeOnMenuClick: boolean;
  /**
   * With this enabled, the menu will be closed when the user clicks outside of it.
   */
  closeOnOutsideClick: boolean;
  /**
   * Prevents the menu from opening when the user clicks the activator.
   */
  disabled: boolean;
  /**
   * If there is not enough space to display the menu on the specified side, it will be flipped to the opposite side.
   */
  flip: boolean;
  /**
   * When the menu is closed, the activator will be focused.
   */
  focusActivatorOnClose: boolean;
  /**
   * The max height of the menu.
   */
  maxHeight: string;
  /**
   * The max width of the menu.
   */
  maxWidth: string;
  /**
   * Moves the menu by the specified number of pixels.
   */
  offset: OffsetOptions;
  /**
   * Opens menu when activator is hovered.
   */
  openOnHover: boolean;
  /**
   * Defines at which position the menu should be displayed.
   */
  position: Position;
  /**
   * Keeps the menu always in the viewport.
   */
  shift: boolean;
  /**
   * Controls whether the component is visible or hidden.
   */
  value: boolean;
};

export type MenuSettings = Partial<EntireMenuSettings>;
