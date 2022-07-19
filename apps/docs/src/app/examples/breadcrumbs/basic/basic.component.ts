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
export default BasicComponent;
