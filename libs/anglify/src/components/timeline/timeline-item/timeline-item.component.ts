import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Inject, Input, QueryList, Self } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { SlotDirective } from '../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { FindSlotPipe } from '../../../pipes/find-slot/find-slot.pipe';
import { bindObservableValueToNativeElement } from '../../../utils/functions';
import { DEFAULT_TIMELINE_ITEM_SETTINGS, TIMELINE_ITEM_SETTINGS } from './timeline-item-settings.token';
import { EntireTimelineItemSettings, TimelineItemAlignment } from './timeline-item.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-timeline-item',
  standalone: true,
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, FindSlotPipe, SlotOutletDirective],
  providers: [
    createSettingsProvider<EntireTimelineItemSettings>(
      'anglifyTimelineItemSettings',
      DEFAULT_TIMELINE_ITEM_SETTINGS,
      TIMELINE_ITEM_SETTINGS
    ),
  ],
})
export class TimelineItemComponent implements EntireTimelineItemSettings {
  @ContentChildren(SlotDirective) protected readonly slots!: QueryList<SlotDirective>;

  @Input() public topConnectionLineVisible = this.settings.topConnectionLineVisible;

  @Input() public bottomConnectionLineVisible = this.settings.bottomConnectionLineVisible;

  public get hideOpposite() {
    return this.hideOpposite$.value;
  }

  @Input() public set hideOpposite(value: boolean) {
    this.hideOpposite$.next(value);
  }

  public get alignment() {
    return this.alignment$.value;
  }

  @Input() public set alignment(value: TimelineItemAlignment) {
    this.alignment$.next(value);
  }

  private readonly alignment$ = new BehaviorSubject(this.settings.alignment);

  protected readonly hideOpposite$ = new BehaviorSubject(this.settings.hideOpposite);

  public constructor(
    @Self() @Inject('anglifyTimelineItemSettings') private readonly settings: EntireTimelineItemSettings,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    bindObservableValueToNativeElement(this, this.alignment$, this.elementRef.nativeElement, 'align-');
  }
}
