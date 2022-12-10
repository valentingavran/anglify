import type { MachineConfig } from '../../utils/machine';

export enum AutocompleteState {
  IDLE = 'IDLE',
  S1 = 'S1', // Focused with closed menu
  S2 = 'S2', // Focused with opened menu
  S3 = 'S3', // Focused with opened menu and selected item
}
export enum AutocompleteAction {
  ARROW_DOWN = 'ARROW_DOWN',
  ARROW_UP = 'ARROW_UP',
  BLUR = 'BLUR',
  CLEAR = 'CLEAR',
  CLICK = 'CLICK',
  ENTER = 'ENTER',
  ESCAPE = 'ESCAPE',
  FOCUS = 'FOCUS',
  INPUT = 'INPUT',
  ITEM_CLICK = 'ITEM_CLICK',
}
export type AutocompleteContext = {
  clearable: boolean;
  disabled: boolean;
  filterFn(items: any[], search: string, context: AutocompleteContext): any[];
  filteredItems: any[];
  highlightedIndex: number | undefined;
  itemTextKey: string | undefined;
  itemValueKey: string | undefined;
  items: any[];
  menuOpened: boolean;
  multiple: boolean;
  search: string;
  selectedItems: any[];
};

export const initialContext: AutocompleteContext = {
  highlightedIndex: undefined,
  menuOpened: false,
  items: [],
  filteredItems: [],
  selectedItems: [],
  search: '',
  multiple: false,
  itemTextKey: undefined,
  itemValueKey: undefined,
  filterFn: (items: any[], search: string, context: AutocompleteContext) => {
    const itemTextKey = context.itemTextKey;
    if (itemTextKey) {
      return items.filter(item => item[itemTextKey].toLowerCase().includes(search.toLowerCase()));
    } else {
      return items.filter(item => item.toLowerCase().includes(search.toLowerCase()));
    }
  },
  clearable: false,
  disabled: false,
};

export function createAutocompleteMachineConfig(
  context: Partial<AutocompleteContext>
): MachineConfig<AutocompleteState, AutocompleteAction, AutocompleteContext> {
  return {
    context: { ...initialContext, ...context },
    initial: AutocompleteState.IDLE,
    states: {
      IDLE: {
        on: {
          CLICK: context => (context.disabled ? AutocompleteState.IDLE : AutocompleteState.S3),
          FOCUS: AutocompleteState.S1,
          CLEAR: AutocompleteState.IDLE,
        },
        do: {
          beforeEach: context => {
            context.highlightedIndex = undefined;
            context.menuOpened = false;
            context.filteredItems = [];
            context.search = '';
          },
          CLEAR: context => {
            if (context.clearable && !context.disabled) context.selectedItems = [];
          },
        },
      },
      S1: {
        on: {
          INPUT: AutocompleteState.S2,
          BLUR: AutocompleteState.IDLE,
          ARROW_DOWN: AutocompleteState.S3,
          ARROW_UP: AutocompleteState.S3,
          CLICK: AutocompleteState.S3,
          CLEAR: AutocompleteState.IDLE,
        },
        do: {
          beforeEach: context => {
            context.menuOpened = false;
          },
          ENTER: context => handleEnter(context),
          ITEM_CLICK: (context, _, payload) => handleItemClick(context, payload),
        },
      },
      S2: {
        on: {
          ESCAPE: AutocompleteState.S1,
          BLUR: AutocompleteState.IDLE,
          INPUT: AutocompleteState.S2,
          ARROW_DOWN: AutocompleteState.S3,
          ARROW_UP: AutocompleteState.S3,
          CLEAR: AutocompleteState.IDLE,
          ITEM_CLICK: context => (context.multiple ? AutocompleteState.S2 : AutocompleteState.S1),
          ENTER: context => (context.multiple ? AutocompleteState.S2 : AutocompleteState.S1),
        },
        do: {
          beforeEach: context => {
            context.menuOpened = true;
          },
          ENTER: context => handleEnter(context),
          ITEM_CLICK: (context, _, payload) => handleItemClick(context, payload),
          INPUT: (context, _, payload) => {
            context.search = payload;

            if (payload === '' && context.multiple === false) {
              context.selectedItems = [];
            }

            context.filteredItems = context.filterFn(context.items, context.search, context);

            if (context.filteredItems.length > 0) {
              context.highlightedIndex = context.filteredItems.includes(context.selectedItems[0])
                ? context.filteredItems.indexOf(context.selectedItems[0])
                : 0;
            } else {
              context.highlightedIndex = 0;
            }
          },
        },
      },
      S3: {
        on: {
          ENTER: context => (context.multiple ? AutocompleteState.S2 : AutocompleteState.S1),
          ARROW_DOWN: AutocompleteState.S3,
          ARROW_UP: AutocompleteState.S3,
          INPUT: AutocompleteState.S2,
          ESCAPE: AutocompleteState.S1,
          BLUR: AutocompleteState.IDLE,
          ITEM_CLICK: AutocompleteState.S1,
          CLEAR: AutocompleteState.IDLE,
        },
        do: {
          beforeEach: context => {
            context.menuOpened = true;
          },
          CLICK: context => {
            if (context.filteredItems.length === 0) context.filteredItems = context.items;
            if (context.highlightedIndex === undefined) {
              context.highlightedIndex = context.selectedItems.length > 0 ? context.filteredItems.indexOf(context.selectedItems[0]) : 0;
            }
          },
          ARROW_DOWN: (context, _action, _payload, previous) => {
            if (context.filteredItems.length === 0) context.filteredItems = context.items;
            if (previous === AutocompleteState.S1 && context.highlightedIndex !== undefined) return;
            if (context.highlightedIndex === undefined) {
              context.highlightedIndex = context.selectedItems.length > 0 ? context.filteredItems.indexOf(context.selectedItems[0]) : 0;
            } else {
              context.highlightedIndex = (context.highlightedIndex + 1) % context.filteredItems.length;
            }
          },
          ARROW_UP: (context, _action, _payload, previous) => {
            if (context.filteredItems.length === 0) context.filteredItems = context.items;
            if (previous === AutocompleteState.S1 && context.highlightedIndex !== undefined) return;
            if (context.highlightedIndex === undefined) {
              context.highlightedIndex =
                context.selectedItems.length > 0
                  ? context.filteredItems.indexOf(context.selectedItems[0])
                  : context.filteredItems.length - 1;
            } else {
              context.highlightedIndex = (context.highlightedIndex - 1 + context.filteredItems.length) % context.filteredItems.length;
            }
          },
        },
      },
    },
  };
}

function handleItemClick(context: AutocompleteContext, item: any) {
  if (context.multiple) {
    if (context.selectedItems.includes(item)) {
      context.selectedItems = context.selectedItems.filter(selectedItem => selectedItem !== item);
    } else {
      context.selectedItems = [...context.selectedItems, item];
    }
  } else {
    context.selectedItems = [item];
  }

  context.highlightedIndex = context.filteredItems.indexOf(item);
}

function handleEnter(context: AutocompleteContext) {
  const item = context.filteredItems.find((_, index) => index === context.highlightedIndex);
  if (!item) return;
  if (context.multiple) {
    if (context.selectedItems.includes(item)) {
      context.selectedItems = context.selectedItems.filter(selectedItem => selectedItem !== item);
    } else {
      context.selectedItems = [...context.selectedItems, item];
    }
  } else {
    context.selectedItems = [item];
  }
}
