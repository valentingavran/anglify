import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, debounceTime, fromEvent, map, ReplaySubject, share, startWith, Subject } from 'rxjs';
import { createSettingsProvider } from '../../factories/settings.factory';
import { DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS } from '../select/select-settings.token';
import { SelectComponent } from '../select/select.component';
import { EntireSelectSettings } from '../select/select.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [createSettingsProvider<EntireSelectSettings>('anglifySelectSettings', DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent extends SelectComponent implements AfterViewInit {
  protected readonly _inputValue$ = new Subject<string>();
  public readonly inputValue$ = this._inputValue$.asObservable().pipe(
    share({
      connector: () => new ReplaySubject(1),
    })
  );

  public readonly filteredOptions$ = combineLatest([this.options$, this.inputValue$.pipe(startWith(''))]).pipe(
    map(([options, value]) => (value ? options.filter(option => option.text.includes(value)) : options)),
    share({
      connector: () => new ReplaySubject(1),
    })
  );

  public override ngAfterViewInit() {
    super.ngAfterViewInit();

    fromEvent<InputEvent & { target: HTMLInputElement }>(this.input.elementRef.nativeElement, 'input')
      .pipe(
        untilDestroyed(this),
        debounceTime(200),
        map(inputEvent => inputEvent.target.value)
      )
      .subscribe(value => this._inputValue$.next(value));
  }
}
