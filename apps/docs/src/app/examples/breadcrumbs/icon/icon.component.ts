import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreadCrumb } from 'libs/anglify/src/modules/breadcrumbs/breadcrumbs.interface';

@Component({
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
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

export default IconComponent;
