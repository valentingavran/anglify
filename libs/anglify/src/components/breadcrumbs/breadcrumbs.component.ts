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
export class BreadcrumbsComponent implements EntireBreadCrumbsSettings {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  @Input() public items: BreadCrumb[] = this.settings.items;

  @Input() public divider: string = this.settings.divider;

  public constructor(@Self() @Inject('anglifyBreadcrumbsSettings') private readonly settings: EntireBreadCrumbsSettings) {}
}
