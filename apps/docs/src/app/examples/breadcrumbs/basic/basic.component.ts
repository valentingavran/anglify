import { BreadcrumbsComponent, type BreadCrumb } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbsComponent],
})
export default class BasicComponent {
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
