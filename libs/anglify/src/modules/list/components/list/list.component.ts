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
import { toBoolean } from '../../../../utils/functions';
import type { BooleanLike } from '../../../../utils/interfaces';
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

  @Input() public dense: BooleanLike = false;
  @Output() public readonly onItemClick = new EventEmitter<void>();

  @HostBinding('class')
  protected get classList() {
    const classNames = [];

    if (toBoolean(this.dense)) {
      classNames.push('dense');
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
