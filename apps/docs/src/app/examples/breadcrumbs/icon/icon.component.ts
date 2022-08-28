import { BreadCrumb, BreadcrumbsComponent, IconComponent as AnglifyIconComponent, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbsComponent, AnglifyIconComponent, SlotDirective],
})
export default class IconComponent {
  public items: BreadCrumb[] = [
    {
      text: 'Home',
      routerLink: ['/components/breadcrumbs'],
    },
    {
      text: 'About',
      routerLink: ['/getting-started/installation'],
    },
    {
      text: 'Contact',
      routerLink: ['/components/card'],
    },
  ];
}
