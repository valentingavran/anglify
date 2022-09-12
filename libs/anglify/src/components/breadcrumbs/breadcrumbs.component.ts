import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, QueryList, Self } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { BREADCRUMBS_SETTINGS, DEFAULT_BREADCRUMBS_SETTINGS } from './breadcrumbs-settings.token';
import { EntireBreadCrumbsSettings, type BreadCrumb } from './breadcrumbs.interface';

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

  /**
   * An array of objects describing each breadcrumb.
   */
  @Input() public items: BreadCrumb[] = this.settings.items;

  /**
   * Specifies the dividing character between items.
   */
  @Input() public divider: string = this.settings.divider;

  public constructor(@Self() @Inject('anglifyBreadcrumbsSettings') public settings: EntireBreadCrumbsSettings) {}
}
