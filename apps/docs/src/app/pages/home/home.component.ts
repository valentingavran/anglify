import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public constructor(public readonly router: Router) {}

  public gettingStarted = [
    { link: 'getting-started/installation', name: 'Installation' },
    { link: 'getting-started/theming', name: 'Theming' },
    { link: 'getting-started/icon-fonts', name: 'Icon Fonts' },
  ];

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
      link: 'components/dialog',
      name: 'Dialog',
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
      link: 'components/progress-linear',
      name: 'Progress Linear',
    },
    {
      link: 'components/radio-button',
      name: 'Radio Button',
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
}