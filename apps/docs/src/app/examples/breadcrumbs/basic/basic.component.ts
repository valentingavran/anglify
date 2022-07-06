import { BreadCrumb } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComponent {
  public items: BreadCrumb[] = [
    {
      text: 'Home',
      disabled: false,
      href: '#',
      routerLink: ['/components/breadcrumbs'],
    },
    {
      text: 'About',
      disabled: false,
      href: '#',
      routerLink: ['/getting-started/installation'],
    },
    {
      text: 'Contact',
      disabled: true,
      href: '#',
      routerLink: ['/components/card'],
    },
  ];
}
export default BasicComponent;
