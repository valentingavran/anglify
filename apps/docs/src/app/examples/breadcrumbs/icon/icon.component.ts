import { BreadCrumb } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
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

export default IconComponent;
