import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Inject, Input, QueryList, Self } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, map } from 'rxjs';
import { Position } from '../../composables/position/position.interface';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { bindClassToNativeElement, bindObservableValueToNativeElement, bindStyleValueToNativeElement } from '../../utils/functions';
import { BADGE_SETTINGS, DEFAULT_BADGE_SETTINGS } from './badge-settings.token';
import { EntireBadgeSettings } from './badge.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-badge',
  standalone: true,
  imports: [SlotOutletDirective, FindSlotPipe, NgIf],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireBadgeSettings>('anglifyBadgeSettings', DEFAULT_BADGE_SETTINGS, BADGE_SETTINGS)],
})
export class BadgeComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  /**
   * Controls whether the component is visible or hidden.
   */
  @Input() public value = true;

  /**
   * Any content you want injected as text into the badge.
   */
  @Input() public content?: string;

  public get bordered() {
    return this.bordered$.value;
  }

  /**
   * Applies a border around the badge.
   */
  @Input() public set bordered(value: boolean) {
    this.bordered$.next(value);
  }

  public get position() {
    return this.position$.value;
  }

  /**
   * Defines at which position the badge should be displayed.
   */
  @Input()
  public set position(value: Position) {
    this.position$.next(value);
  }

  public get horizontalOffset() {
    return this.horizontalOffset$.value;
  }

  /**
   * Offset the badge on the x-axis.
   */
  @Input() public set horizontalOffset(value: number) {
    this.horizontalOffset$.next(value);
  }

  public get verticalOffset() {
    return this.verticalOffset$.value;
  }

  /**
   * Offset the badge on the y-axis.
   */
  @Input() public set verticalOffset(value: number) {
    this.verticalOffset$.next(value);
  }

  private readonly bordered$ = new BehaviorSubject(this.settings.border);

  private readonly position$ = new BehaviorSubject(this.settings.position);

  private readonly horizontalOffset$ = new BehaviorSubject(this.settings.horizontalOffset);

  private readonly verticalOffset$ = new BehaviorSubject(this.settings.verticalOffset);

  public constructor(
    @Self() @Inject('anglifyBadgeSettings') public settings: EntireBadgeSettings,
    public readonly elementRef: ElementRef<HTMLElement>
  ) {
    bindClassToNativeElement(this, this.bordered$, this.elementRef.nativeElement, 'bordered');
    bindObservableValueToNativeElement(this, this.position$, this.elementRef.nativeElement);
    bindStyleValueToNativeElement(
      this,
      this.horizontalOffset$.pipe(map(value => `${value}px`)),
      this.elementRef.nativeElement,
      '--badge-horizontal-offset'
    );
    bindStyleValueToNativeElement(
      this,
      this.verticalOffset$.pipe(map(value => `${value}px`)),
      this.elementRef.nativeElement,
      '--badge-vertical-offset'
    );
  }
}
