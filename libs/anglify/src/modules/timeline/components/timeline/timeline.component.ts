import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, map, startWith, tap } from 'rxjs';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';

@UntilDestroy()
@Component({
  selector: 'anglify-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent implements AfterViewInit {
  @ContentChildren(TimelineItemComponent) private readonly timelineItems?: QueryList<TimelineItemComponent>;

  /** Reverse direction of timeline items. */
  @Input() public reverse = false;

  /** Hide opposite slot content, and position all items to one side of timeline. */
  @Input() public dense = false;

  private readonly items$ = new BehaviorSubject<TimelineItemComponent[]>([]);
  public constructor() {
    this.items$
      .pipe(
        untilDestroyed(this),
        map(items => {
          if (this.dense) {
            items.forEach(item => (item.hideOpposite = true));
          } else {
            this.alternateItems(items);
          }
        })
      )
      .subscribe();
  }

  private alternateItems(items: TimelineItemComponent[]) {
    items.forEach((item, index) => {
      // ignore items that have a user defined alignment
      if (item.alignment === 'start' || item.alignment === 'end') return;

      // all other items are arranged in an alternating manner
      if (this.reverse) {
        index % 2 === 0 ? (item.alignment = 'start') : (item.alignment = 'end');
      } else {
        index % 2 === 0 ? (item.alignment = 'end') : (item.alignment = 'start');
      }
    });
  }

  public ngAfterViewInit(): void {
    if (this.timelineItems) {
      this.timelineItems.changes
        .pipe(
          untilDestroyed(this),
          startWith(this.timelineItems),
          map(items => items as TimelineItemComponent[]),
          tap(items => {
            setTimeout(() => this.items$.next(items), 0);
          })
        )
        .subscribe();
    }
  }
}
