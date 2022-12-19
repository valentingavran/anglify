import { ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, QueryList, Self, type AfterViewInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, map, startWith, tap } from 'rxjs';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';
import { DEFAULT_TIMELINE_SETTINGS, TIMELINE_SETTINGS } from './timeline-settings.token';
import { EntireTimelineSettings } from './timeline.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-timeline',
  standalone: true,
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireTimelineSettings>('anglifyTimelineSettings', DEFAULT_TIMELINE_SETTINGS, TIMELINE_SETTINGS)],
})
export class TimelineComponent implements EntireTimelineSettings, AfterViewInit {
  @ContentChildren(TimelineItemComponent) private readonly timelineItems?: QueryList<TimelineItemComponent>;

  @Input() public reverse = this.settings.reverse;

  @Input() public dense = this.settings.dense;

  private readonly items$ = new BehaviorSubject<TimelineItemComponent[]>([]);

  public constructor(@Self() @Inject('anglifyTimelineSettings') private readonly settings: EntireTimelineSettings) {
    this.items$
      .pipe(
        untilDestroyed(this),
        map(items => {
          if (this.dense) {
            for (const item of items) item.hideOpposite = true;
          } else {
            this.alternateItems(items);
          }
        })
      )
      .subscribe();
  }

  private alternateItems(items: TimelineItemComponent[]) {
    for (const [index, item] of items.entries()) {
      // ignore items that have a user defined alignment
      if (item.alignment === 'start' || item.alignment === 'end') continue;

      // all other items are arranged in an alternating manner
      if (this.reverse) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        index % 2 === 0 ? (item.alignment = 'start') : (item.alignment = 'end');
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        index % 2 === 0 ? (item.alignment = 'end') : (item.alignment = 'start');
      }
    }
  }

  public ngAfterViewInit() {
    if (this.timelineItems) {
      this.timelineItems.changes
        .pipe(
          untilDestroyed(this),
          startWith(this.timelineItems),
          map((items: QueryList<TimelineItemComponent>) => items.toArray()),
          tap(items => {
            setTimeout(() => this.items$.next(items), 0);
          })
        )
        .subscribe();
    }
  }
}
