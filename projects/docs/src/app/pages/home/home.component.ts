import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public components = [
    {
      link: 'components/icon',
      name: 'Icon',
    },
    {
      link: 'components/stepper',
      name: 'Stepper',
    },
    {
      link: 'components/form-field',
      name: 'Form Field',
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
