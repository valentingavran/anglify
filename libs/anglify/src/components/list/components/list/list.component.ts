import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  type AfterViewInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ListItemComponent } from '../list-item/list-item.component';

@UntilDestroy()
@Component({
  selector: 'anglify-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements AfterViewInit {
  @ContentChildren(ListItemComponent, { descendants: true }) private readonly listItems?: QueryList<ListItemComponent>;

  /**
   * Lowers max height of list items.
   */
  @Input() public dense = false;

  /**
   * An alternative styling that reduces `anglify-list-item` width and rounds the corners.
   * Typically used with `anglify-navigation-drawer`.
   */
  @Input() public nav = false;

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
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
