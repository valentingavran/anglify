import { Component, ChangeDetectionStrategy, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, map, ReplaySubject, share, startWith } from 'rxjs';
import { createSettingsProvider } from '../../factories/settings.factory';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS } from '../select/select-settings.token';
import { EntireSelectSettings, SelectItem } from '../select/select.interface';

@Component({
  selector: 'anglify-combobox',
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
})
export class ComboboxComponent extends AutocompleteComponent {
  @Input() public addItem = this.settings.addItem;
  @Input() public addItemFn: (input: string) => SelectItem | Promise<SelectItem> = input => ({ text: input, value: input });

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

  public async selectTag(input: string) {
    const item = await this.addItemFn(input);
    this._items$.next([...this._items$.value, item]);
    void this.select(item);
  }
}
