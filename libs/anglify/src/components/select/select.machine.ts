import type { MachineConfig } from '../../utils/machine';

export enum SelectState {
  IDLE = 'IDLE',
  S1 = 'S1', // Focused with closed menu
  S2 = 'S2', // Focused with opened menu
}
export enum SelectAction {
  ARROW_DOWN = 'ARROW_DOWN',
  ARROW_UP = 'ARROW_UP',
  BLUR = 'BLUR',
  CLEAR = 'CLEAR',
  CLICK = 'CLICK',
  ENTER = 'ENTER',
  ESCAPE = 'ESCAPE',
  FOCUS = 'FOCUS',
  ITEM_CLICK = 'ITEM_CLICK',
}
export type SelectContext = {
  clearable: boolean;
  disabled: boolean;
  highlightedIndex: number | undefined;
  itemTextKey: string | undefined;
  itemValueKey: string | undefined;
  items: any[];
  menuOpened: boolean;
  multiple: boolean;
  selectedItems: any[];
};

export const initialContext: SelectContext = {
  highlightedIndex: undefined,
  menuOpened: false,
  items: [],
  selectedItems: [],
  multiple: false,
  itemTextKey: undefined,
  itemValueKey: undefined,
  clearable: false,
  disabled: false,
};

export function createSelectMachineConfig(context: Partial<SelectContext>): MachineConfig<SelectState, SelectAction, SelectContext> {
  return {
    context: { ...initialContext, ...context },
    initial: SelectState.IDLE,
    states: {
      IDLE: {
        on: {
          FOCUS: SelectState.S1,
          CLICK: context => (context.disabled ? SelectState.IDLE : SelectState.S2),
          CLEAR: SelectState.IDLE,
        },
        do: {
          beforeEach: context => {
            context.menuOpened = false;
            context.highlightedIndex = undefined;
          },
          CLEAR: context => {
            context.selectedItems = [];
          },
        },
      },
      S1: {
        on: {
          ENTER: SelectState.S2,
          ARROW_DOWN: SelectState.S2,
          ARROW_UP: SelectState.S2,
          BLUR: SelectState.IDLE,
          CLEAR: SelectState.IDLE,
          CLICK: SelectState.S2,
        },
        do: {
          beforeEach: context => {
            context.menuOpened = false;
          },
          ENTER: context =>
            handleSelection(
              context,
              context.items.find((_, index) => index === context.highlightedIndex)
            ),
          ITEM_CLICK: (context, _, payload) => handleSelection(context, payload),
        },
      },
      S2: {
        on: {
          ESCAPE: SelectState.S1,
          CLEAR: SelectState.IDLE,
          BLUR: SelectState.IDLE,
          ENTER: context => (context.multiple ? SelectState.S2 : SelectState.S1),
          ITEM_CLICK: context => (context.multiple ? SelectState.S2 : SelectState.S1),
          ARROW_DOWN: SelectState.S2,
          ARROW_UP: SelectState.S2,
        },
        do: {
          beforeEach: context => {
            context.menuOpened = true;
          },
          ENTER: (context, _action, _payload, previous) => {
            if (previous === SelectState.S2) {
              handleSelection(
                context,
                context.items.find((_, index) => index === context.highlightedIndex)
              );
            } else if (previous === SelectState.S1 && context.highlightedIndex === undefined) {
              context.highlightedIndex =
                context.selectedItems.length > 0 ? context.items.indexOf(context.selectedItems[0]) : context.items.length - 1;
            }
          },
          ARROW_DOWN: (context, _action, _payload, previous) => {
            if (previous === SelectState.S1 && context.highlightedIndex !== undefined) return;
            if (context.highlightedIndex === undefined) {
              context.highlightedIndex = context.selectedItems.length > 0 ? context.items.indexOf(context.selectedItems[0]) : 0;
            } else {
              context.highlightedIndex = (context.highlightedIndex + 1) % context.items.length;
            }
          },
          ARROW_UP: (context, _action, _payload, previous) => {
            if (previous === SelectState.S1 && context.highlightedIndex !== undefined) return;
            if (context.highlightedIndex === undefined) {
              context.highlightedIndex =
                context.selectedItems.length > 0 ? context.items.indexOf(context.selectedItems[0]) : context.items.length - 1;
            } else {
              context.highlightedIndex = (context.highlightedIndex - 1 + context.items.length) % context.items.length;
            }
          },
          ITEM_CLICK: (context, _, payload) => handleSelection(context, payload),
        },
      },
    },
  };
}

function handleSelection(context: SelectContext, item: any) {
  if (context.multiple) {
    const index = context.selectedItems.indexOf(item);
    if (index > -1) {
      context.selectedItems.splice(index, 1);
    } else {
      context.selectedItems.push(item);
    }
  } else {
    context.selectedItems = [item];
  }
}
