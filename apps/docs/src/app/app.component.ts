import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public initTheme() {
    const theme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (theme) {
      this.setTheme(theme);
    } else {
      this.setTheme('light');
    }
  }

  public setTheme(theme: 'light' | 'dark') {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
  }

  public toggleTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  }

  public openGithubRepo() {
    window.open('https://github.com/valentingavran/anglify', '_blank')!.focus();
  }

  public constructor(public readonly router: Router) {
    this.initTheme();
  }

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
      link: 'components/nav-drawer',
      name: 'Navigation Drawer',
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
    {
      link: 'components/toolbar',
      name: 'Toolbar',
    },
  ];
}
