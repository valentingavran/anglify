import type { MachineConfig } from '../../utils/machine';

export enum MenuState {
  IDLE = 'IDLE',
  OPENED = 'OPENED',
}
export enum MenuAction {
  ACTIVATOR_CLICK = 'ACTIVATOR_CLICK',
  ARROW_DOWN = 'ARROW_DOWN',
  ARROW_UP = 'ARROW_UP',
  CLOSE = 'CLOSE', // programmatic close
  ENTER = 'ENTER',
  ESCAPE = 'ESCAPE',
  MENU_CLICK = 'MENU_CLICK',
  MOUSE_LEAVE = 'MOUSE_LEAVE',
  MOUSE_OVER = 'MOUSE_OVER',
  OPEN = 'OPEN', // programmatic open
  OUTSIDE_CLICK = 'OUTSIDE_CLICK',
  TAB = 'TAB',
}
export type MenuContext = {
  closeOnEscape: boolean;
  closeOnMenuClick: boolean;
  closeOnOutsideClick: boolean;
  disabled: boolean;
  focusFirstItem(): void;
  focusLastItem(): void;
  focusNextItem(): void;
  focusPreviousItem(): void;
  openOnHover: boolean;
  value: boolean;
};

export const initialContext: MenuContext = {
  disabled: false,
  focusFirstItem: () => {},
  focusLastItem: () => {},
  focusNextItem: () => {},
  focusPreviousItem: () => {},
  openOnHover: false,
  closeOnEscape: true,
  closeOnMenuClick: true,
  closeOnOutsideClick: true,
  value: false,
};

export function createMenuMachineConfig(context: Partial<MenuContext>): MachineConfig<MenuState, MenuAction, MenuContext> {
  return {
    context: { ...initialContext, ...context },
    initial: MenuState.IDLE,
    states: {
      IDLE: {
        on: {
          ACTIVATOR_CLICK: context => (context.disabled ? undefined : MenuState.OPENED),
          ARROW_UP: context => (context.disabled ? undefined : MenuState.OPENED),
          ARROW_DOWN: context => (context.disabled ? undefined : MenuState.OPENED),
          ENTER: context => (context.disabled ? undefined : MenuState.OPENED),
          MOUSE_OVER: context => (context.openOnHover && !context.disabled ? MenuState.OPENED : undefined),
          OPEN: MenuState.OPENED,
        },
        do: {
          beforeEach: (context, _action, _payload, prev) => {
            if (prev === MenuState.OPENED) context.value = false;
          },
        },
      },
      OPENED: {
        on: {
          ESCAPE: context => (context.closeOnEscape ? MenuState.IDLE : undefined),
          TAB: MenuState.IDLE,
          ENTER: MenuState.IDLE,
          MENU_CLICK: context => (context.closeOnMenuClick ? MenuState.IDLE : undefined),
          ACTIVATOR_CLICK: MenuState.IDLE,
          MOUSE_LEAVE: context => (context.openOnHover ? MenuState.IDLE : undefined),
          OUTSIDE_CLICK: context => (context.closeOnOutsideClick ? MenuState.IDLE : undefined),
          ARROW_DOWN: MenuState.OPENED,
          ARROW_UP: MenuState.OPENED,
          CLOSE: MenuState.IDLE,
        },
        do: {
          beforeEach: (context, _action, _payload, prev) => {
            if (prev === MenuState.IDLE) context.value = true;
          },
          ARROW_DOWN: (context, _action, _payload, prev) => {
            if (prev === MenuState.OPENED) context.focusNextItem();
            else context.focusFirstItem();
          },
          ARROW_UP: (context, _action, _payload, prev) => {
            if (prev === MenuState.OPENED) context.focusPreviousItem();
            else context.focusLastItem();
          },
          ENTER: context => context.focusFirstItem(),
          OPEN: context => context.focusFirstItem(),
        },
      },
    },
  };
}
