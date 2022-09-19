import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, map, ReplaySubject, share, startWith } from 'rxjs';
import { ClickStopPropagationDirective } from '../../directives/click-stop-propagation/click-stop-propagation.directive';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ChipComponent } from '../chip/chip.component';
import { IconComponent } from '../icon/icon.component';
import { InputDirective } from '../input/input.directive';
import { ListComponent } from '../list/components/list/list.component';
import { ListItemComponent } from '../list/components/list-item/list-item.component';
import { ListItemGroupComponent } from '../list/components/list-item-group/list-item-group.component';
import { ListItemTitleComponent } from '../list/components/list-item-title/list-item-title.component';
import { MenuDirective } from '../menu/menu.directive';
import { DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS } from '../select/select-settings.token';
import type { EntireSelectSettings, SelectItem } from '../select/select.interface';
import { TextFieldComponent } from '../text-field/text-field.component';

@Component({
  selector: 'anglify-combobox',
  standalone: true,
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxComponent),
      multi: true,
    },
    createSettingsProvider<EntireSelectSettings>('anglifySelectSettings', DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TextFieldComponent,
    NgIf,
    MenuDirective,
    AsyncPipe,
    ClickStopPropagationDirective,
    NgForOf,
    ListItemComponent,
    ListItemGroupComponent,
    ListComponent,
    ListItemTitleComponent,
    IconComponent,
    ChipComponent,
    SlotDirective,
    SlotOutletDirective,
    FindSlotPipe,
    InputDirective,
  ],
})
export class ComboboxComponent extends AutocompleteComponent {
  @Input() public addItem = this.settings.addItem;

  @Input() public addItemFn: (input: string) => Promise<SelectItem> | SelectItem = input => ({ text: input, value: input });

  public readonly isUniqueItem$ = combineLatest([this.filteredItems$, this.selectedItems$, this.inputValue$.pipe(startWith(''))]).pipe(
    map(([filtered, selected, value]) => {
      const toCompare = value.toLowerCase();
      return (
        Boolean(value) &&
        !filtered.some(item => item.text.toLowerCase() === toCompare) &&
        !selected.some(item => item.text.toLowerCase() === toCompare)
      );
    }),
    share({
      connector: () => new ReplaySubject(1),
    })
  );

  public selectTag = async (input: string) => {
    const item = await this.addItemFn(input);
    this._items$.next([...this._items$.value, item]);
    void this.select(item);
  };
}
