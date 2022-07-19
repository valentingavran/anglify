import { Component, ChangeDetectionStrategy, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, map, ReplaySubject, share, startWith } from 'rxjs';
import { createSettingsProvider } from '../../factories/settings.factory';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS } from '../select/select-settings.token';
import { EntireSelectSettings, SelectOption } from '../select/select.interface';

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
  @Input() public addOption = this.settings.addOption;
  @Input() public addOptionFn: (input: string) => SelectOption | Promise<SelectOption> = input => ({ text: input, value: input });

  public readonly isUniqueOption$ = combineLatest([
    this.filteredOptions$,
    this.selectedOptions$,
    this.inputValue$.pipe(startWith('')),
  ]).pipe(
    map(([filtered, selected, value]) => {
      const toCompare = value.toLowerCase();
      return (
        Boolean(value) &&
        !filtered.some(option => option.text.toLowerCase() === toCompare) &&
        !selected.some(option => option.text.toLowerCase() === toCompare)
      );
    }),
    share({
      connector: () => new ReplaySubject(1),
    })
  );

  public async selectTag(input: string) {
    const option = await this.addOptionFn(input);
    this._options$.next([...this._options$.value, option]);
    void this.select(option);
  }
}
