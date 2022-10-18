import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy, type AfterViewInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, debounceTime, fromEvent, map, ReplaySubject, share, startWith, Subject } from 'rxjs';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { ChipComponent } from '../chip/chip.component';
import { IconComponent } from '../icon/icon.component';
import { InputDirective } from '../input/input.directive';
import { ListComponent } from '../list/components/list/list.component';
import { ListItemComponent } from '../list/components/list-item/list-item.component';
import { ListItemGroupComponent } from '../list/components/list-item-group/list-item-group.component';
import { ListItemTitleComponent } from '../list/components/list-item-title/list-item-title.component';
import { MenuDirective } from '../menu/components/legacy-menu/legacy-menu.directive';
import { DEFAULT_SELECT_SETTINGS, SELECT_SETTINGS } from '../select/select-settings.token';
import { SelectComponent } from '../select/select.component';
import type { EntireSelectSettings } from '../select/select.interface';
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
