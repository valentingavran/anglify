import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, debounceTime, fromEvent, map, ReplaySubject, share, startWith, Subject } from 'rxjs';
import { createSettingsProvider } from '../../factories/settings.factory';
import { ChipComponent } from '../chip/chip.component';
import { SlotOutletDirective } from '../common/directives/slot-outlet/slot-outlet.directive';
import { SlotDirective } from '../common/directives/slot/slot.directive';
import { FindSlotPipe } from '../common/pipes/find-slot/find-slot.pipe';
import { IconComponent } from '../icon/icon.component';
import { InputDirective } from '../input/input.directive';
import { ListItemGroupComponent } from '../list/components/list-item-group/list-item-group.component';
import { ListItemTitleComponent } from '../list/components/list-item-title/list-item-title.component';
import { ListItemComponent } from '../list/components/list-item/list-item.component';
import { ListComponent } from '../list/components/list/list.component';
import { MenuDirective } from '../menu/menu.directive';
import { DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS } from '../select/select-settings.token';
import { SelectComponent } from '../select/select.component';
import { EntireSelectSettings } from '../select/select.interface';
import { TextFieldComponent } from '../text-field/text-field.component';

@UntilDestroy()
@Component({
  selector: 'anglify-autocomplete',
  standalone: true,
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [createSettingsProvider<EntireSelectSettings>('anglifySelectSettings', DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FindSlotPipe,
    AsyncPipe,
    NgForOf,
    NgIf,
    TextFieldComponent,
    MenuDirective,
    ChipComponent,
    IconComponent,
    ListComponent,
    ListItemGroupComponent,
    ListItemComponent,
    ListItemTitleComponent,
    SlotOutletDirective,
    SlotDirective,
    InputDirective,
  ],
})
export class AutocompleteComponent extends SelectComponent implements AfterViewInit {
  protected readonly _inputValue$ = new Subject<string>();
  public readonly inputValue$ = this._inputValue$.asObservable().pipe(
    share({
      connector: () => new ReplaySubject(1),
    })
  );

  public readonly filteredItems$ = combineLatest([this.items$, this.inputValue$.pipe(startWith(''))]).pipe(
    map(([items, value]) => (value ? items.filter(item => item.text.includes(value)) : items)),
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
