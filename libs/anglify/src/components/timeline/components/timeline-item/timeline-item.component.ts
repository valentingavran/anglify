import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Input, QueryList } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { SlotDirective } from '../../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../../directives/slot-outlet/slot-outlet.directive';
import { FindSlotPipe } from '../../../../pipes/find-slot/find-slot.pipe';
import { bindObservableValueToNativeElement } from '../../../../utils/functions';

type TimelineItemAlignment = 'end' | 'none' | 'start';

@UntilDestroy()
@Component({
  selector: 'anglify-timeline-item',
  standalone: true,
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, FindSlotPipe, SlotOutletDirective],
})
export class TimelineItemComponent {
  @ContentChildren(SlotDirective) public readonly slots!: QueryList<SlotDirective>;

  /**
   * Removes the line above the indicator.
   */
  @Input() public topConnectionLineVisible = true;

  /**
   * Removes the line below the indicator.
   */
  @Input() public bottomConnectionLineVisible = true;

  public get hideOpposite() {
    return this.hideOpposite$.value;
  }

  /**
   * Hides the other side of the item content. Should only be used by the `anglify-timeline`
   * component in conjunction with the dense property.
   */
  @Input() public set hideOpposite(value: boolean) {
    this.hideOpposite$.next(value);
  }

  public get alignment() {
    return this.alignment$.value;
  }

  /**
   * Sets the item alignment/orientation.
   */
  @Input() public set alignment(value: TimelineItemAlignment) {
    this.alignment$.next(value);
  }

  private readonly alignment$ = new BehaviorSubject<TimelineItemAlignment>('none');

  public readonly hideOpposite$ = new BehaviorSubject<boolean>(false);

  public constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    bindObservableValueToNativeElement(this, this.alignment$, this.elementRef.nativeElement, 'align-');
  }
}
