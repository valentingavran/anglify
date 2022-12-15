import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
  QueryList,
  Self,
  type AfterViewInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { ListItemComponent } from '../list-item/list-item.component';
import { DEFAULT_LIST_SETTINGS, LIST_SETTINGS } from './list-settings.token';
import { EntireListSettings } from './list.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireListSettings>('anglifyListSettings', DEFAULT_LIST_SETTINGS, LIST_SETTINGS)],
})
export class ListComponent implements EntireListSettings, AfterViewInit {
  @ContentChildren(ListItemComponent, { descendants: true }) private readonly listItems?: QueryList<ListItemComponent>;

  @Input() public dense = this.settings.dense;

  @Input() public nav = this.settings.nav;

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onItemClick = new EventEmitter<void>();

  public constructor(@Self() @Inject('anglifyListSettings') private readonly settings: EntireListSettings) {}

  @HostBinding('class')
  protected get classList() {
    const classNames = [];

    if (this.dense) {
      classNames.push('dense');
    }

    if (this.nav) {
      // items styling changes through this using :host-context
      classNames.push('anglify-list-nav');
    }

    return classNames.join(' ');
  }

  public ngAfterViewInit() {
    if (this.listItems)
      for (const item of this.listItems) {
        item.onClick
          .asObservable()
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.onItemClick.next();
          });
      }
  }
}
