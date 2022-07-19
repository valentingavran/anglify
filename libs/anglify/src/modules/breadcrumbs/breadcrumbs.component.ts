import { ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, QueryList, Self } from '@angular/core';
import { BREADCRUMBS_SETTINGS, DEFAULT_BREADCRUMBS_SETTINGS } from './breadcrumbs-settings.token';
import { BreadCrumb, EntireBreadCrumbsSettings } from './breadcrumbs.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { SlotDirective } from '../common/directives/slot/slot.directive';

@Component({
  selector: 'anglify-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireBreadCrumbsSettings>('anglifyBreadcrumbsSettings', DEFAULT_BREADCRUMBS_SETTINGS, BREADCRUMBS_SETTINGS),
  ],
})
export class BreadcrumbsComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  @Input() public items: BreadCrumb[] = this.settings.items;
  @Input() public divider: string = this.settings.divider;

  public constructor(@Self() @Inject('anglifyBreadcrumbsSettings') public settings: EntireBreadCrumbsSettings) {}

  public isLastItem(item: BreadCrumb) {
    return item === this.items[this.items.length - 1];
  }
}
