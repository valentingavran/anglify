import type { MachineConfig } from '../../utils/machine';

export enum ComboboxState {
  IDLE = 'IDLE',
  S1 = 'S1', // Focused with closed menu
  S2 = 'S2', // Focused with opened menu
}
export enum ComboboxAction {
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
  TAB = 'TAB',
}
export type ComboboxContext = {
  clearable: boolean;
  disabled: boolean;
  filterFn(items: any[], search: string, context: ComboboxContext): any[];
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

export const initialContext: ComboboxContext = {
  highlightedIndex: undefined,
  menuOpened: false,
  items: [],
  filteredItems: [],
  selectedItems: [],
  search: '',
  multiple: false,
  itemTextKey: undefined,
  itemValueKey: undefined,
  filterFn: (items: any[], search: string, context: ComboboxContext) => {
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

export function createComboboxMachineConfig(
  context: Partial<ComboboxContext>
): MachineConfig<ComboboxState, ComboboxAction, ComboboxContext> {
  return {
    context: { ...initialContext, ...context },
    initial: ComboboxState.IDLE,
    states: {
      IDLE: {
        on: {
          FOCUS: ComboboxState.S1,
          CLICK: context => (context.disabled ? ComboboxState.IDLE : ComboboxState.S2),
          CLEAR: ComboboxState.IDLE,
        },
        do: {
          BLUR: context => {
            context.highlightedIndex = undefined;
            context.filteredItems = [];
            context.menuOpened = false;
            context.search = '';
          },
          CLEAR: context => {
            if (context.clearable && !context.disabled) {
              context.highlightedIndex = undefined;
              context.filteredItems = [];
              context.selectedItems = [];
              context.menuOpened = false;
              context.search = '';
            }
          },
        },
      },
      S1: {
        on: {
          BLUR: ComboboxState.IDLE,
          CLEAR: ComboboxState.IDLE,
          INPUT: ComboboxState.S2,
          ENTER: ComboboxState.S2,
          ARROW_DOWN: ComboboxState.S2,
          ARROW_UP: ComboboxState.S2,
          CLICK: ComboboxState.S2,
        },
        do: {
          beforeEach: context => (context.menuOpened = false),
          ENTER: (context, action, payload, previous) => handleSelection(context, action, payload, previous),
          TAB: (context, action, payload, previous) => handleSelection(context, action, payload, previous),
          ITEM_CLICK: (context, _action, payload) => selectSingleItem(context, payload),
        },
      },
      S2: {
        on: {
          BLUR: ComboboxState.IDLE,
          CLEAR: ComboboxState.IDLE,
          INPUT: ComboboxState.S2,
          ARROW_DOWN: ComboboxState.S2,
          ARROW_UP: ComboboxState.S2,
          ESCAPE: ComboboxState.S1,
          ENTER: context => (context.multiple ? ComboboxState.S2 : ComboboxState.S1),
          TAB: context => (context.multiple ? ComboboxState.S2 : ComboboxState.S1),
          ITEM_CLICK: context => (context.multiple ? ComboboxState.S2 : ComboboxState.S1),
        },
        do: {
          beforeEach: context => {
            context.menuOpened = true;
            if (context.filteredItems.length === 0) context.filteredItems = context.items;
          },
          INPUT: (context, _, payload) => filterItems(context, payload),
          ENTER: (context, action, payload, previous) => handleSelection(context, action, payload, previous),
          TAB: (context, action, payload, previous) => handleSelection(context, action, payload, previous),
          ARROW_DOWN: (context, _action, _payload, previous) => handleArrowDown(context, previous),
          ARROW_UP: (context, action, payload, previous) => handleArrowUp(context, action, payload, previous),
          ITEM_CLICK: (context, _action, payload) => toggleItem(context, payload),
        },
      },
    },
  };
}

function filterItems(context: ComboboxContext, search: string) {
  context.search = search;
  context.filteredItems = context.filterFn(context.items, search, context);
  context.highlightedIndex = undefined;
}

function highlightItem(context: ComboboxContext, item: any) {
  context.highlightedIndex = context.filteredItems.indexOf(item);
}

function handleArrowDown(context: ComboboxContext, previous: ComboboxState) {
  if (context.highlightedIndex === undefined) {
    if (context.selectedItems.length > 0) {
      highlightItem(context, context.selectedItems[0]);
    } else if (context.filteredItems.length > 0) {
      highlightItem(context, context.filteredItems[0]);
    }
  } else if (previous === ComboboxState.S2) {
    context.highlightedIndex = (context.highlightedIndex + 1) % context.filteredItems.length;
  }
}

function handleArrowUp(context: ComboboxContext, _action: ComboboxAction, _payload: any, previous: ComboboxState) {
  if (context.highlightedIndex === undefined) {
    if (context.selectedItems.length > 0) {
      highlightItem(context, context.selectedItems[context.selectedItems.length - 1]);
    } else if (context.filteredItems.length > 0) {
      highlightItem(context, context.filteredItems[context.filteredItems.length - 1]);
    }
  } else if (previous === ComboboxState.S2) {
    context.highlightedIndex = (context.highlightedIndex - 1 + context.filteredItems.length) % context.filteredItems.length;
  }
}

export function createItem(value: string, itemTextKey?: string, itemValueKey?: string) {
  if (!itemTextKey && !itemValueKey) return value;
  const item: any = {};
  if (itemTextKey) item[itemTextKey] = value;
  if (itemValueKey) item[itemValueKey] = value;
  return item;
}

function toggleItem(context: ComboboxContext, item: any) {
  const itemTextKey = context.itemTextKey;
  if (itemTextKey) {
    const index = context.selectedItems.findIndex(selectedItem => selectedItem[itemTextKey] === item[itemTextKey]);
    if (index === -1) context.selectedItems = [...context.selectedItems, item];
    else context.selectedItems = context.selectedItems.filter((_, sIndex) => sIndex !== index);
  } else if (context.selectedItems.includes(item)) {
    context.selectedItems = context.selectedItems.filter(selectedItem => selectedItem !== item);
  } else {
    context.selectedItems = [...context.selectedItems, item];
  }
}

function selectSingleItem(context: ComboboxContext, item: any) {
  if (!context.selectedItems.includes(item)) {
    context.selectedItems = [item];
  }
}

export function handleSelection(context: ComboboxContext, action: ComboboxAction, payload: any, previous: ComboboxState) {
  const functionToCall = context.multiple ? toggleItem : selectSingleItem;
  if (previous === ComboboxState.S1) handleArrowDown(context, previous); // if we are in S1 and press enter, we want to open the menu
  else if (context.highlightedIndex === undefined) {
    const item = context.items.find(item => (context.itemTextKey ? item[context.itemTextKey] === context.search : item === context.search));
    if (item) functionToCall(context, item);
    else {
      if (context.search === '') return;
      functionToCall(context, createItem(context.search, context.itemTextKey, context.itemValueKey));
    }
  } else {
    if (action === ComboboxAction.TAB) payload.preventDefault();
    functionToCall(context, context.filteredItems[context.highlightedIndex]);
  }
}
