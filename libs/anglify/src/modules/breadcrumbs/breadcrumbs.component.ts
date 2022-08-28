import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, QueryList, Self } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BREADCRUMBS_SETTINGS, DEFAULT_BREADCRUMBS_SETTINGS } from './breadcrumbs-settings.token';
import { BreadCrumb, EntireBreadCrumbsSettings } from './breadcrumbs.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { SlotOutletDirective } from '../common/directives/slot-outlet/slot-outlet.directive';
import { SlotDirective } from '../common/directives/slot/slot.directive';
import { FindSlotPipe } from '../common/pipes/find-slot/find-slot.pipe';

@Component({
  selector: 'anglify-breadcrumbs',
  standalone: true,
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireBreadCrumbsSettings>('anglifyBreadcrumbsSettings', DEFAULT_BREADCRUMBS_SETTINGS, BREADCRUMBS_SETTINGS),
  ],
  imports: [NgIf, NgForOf, RouterModule, FindSlotPipe, SlotOutletDirective],
})
export class BreadcrumbsComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  /** An array of objects describing each breadcrumb. */
  @Input() public items: BreadCrumb[] = this.settings.items;

  /** Specifies the dividing character between items. */
  @Input() public divider: string = this.settings.divider;

  public constructor(@Self() @Inject('anglifyBreadcrumbsSettings') public settings: EntireBreadCrumbsSettings) {}

  public isLastItem(item: BreadCrumb) {
    return item === this.items[this.items.length - 1];
  }
}
