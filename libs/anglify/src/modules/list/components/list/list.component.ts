import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ListItemComponent } from '../list-item/list-item.component';

@UntilDestroy()
@Component({
  selector: 'anglify-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements AfterViewInit {
  @ContentChildren(ListItemComponent, { descendants: true }) public listItems?: QueryList<ListItemComponent>;

  /** Lowers max height of list items. */
  @Input() public dense = false;

  /** An alternative styling that reduces `anglify-list-item` width and rounds the corners.
   * Typically used with `anglify-navigation-drawer`. */
  @Input() public nav = false;
  @Output() public readonly onItemClick = new EventEmitter<void>();

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
    this.listItems?.forEach(item => {
      item.onClick
        .asObservable()
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.onItemClick.next();
        });
    });
  }
}
