import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public constructor(public readonly router: Router) {}

  public components = [
    {
      link: 'components/button',
      name: 'Button',
    },
    {
      link: 'components/card',
      name: 'Card',
    },
    {
      link: 'components/checkbox',
      name: 'Checkbox',
    },
    {
      link: 'components/form-field',
      name: 'Form Field',
    },
    {
      link: 'components/icon',
      name: 'Icon',
    },
    {
      link: 'components/list',
      name: 'List',
    },
    {
      link: 'components/menu',
      name: 'Menu',
    },
    {
      link: 'components/progress-circular',
      name: 'Progress Circular',
    },
    {
      link: 'components/stepper',
      name: 'Stepper',
    },
    {
      link: 'components/table',
      name: 'Table',
    },
    {
      link: 'components/tooltip',
      name: 'Tooltip',
    },
  ];

  public directives = [
    {
      link: 'components/overlay',
      name: 'Overlay',
    },
  ];
}
