import { BreakpointObserverService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'anglify-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
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

  public openMaterialDesignWebsite() {
    window.open('https://material.io', '_blank')!.focus();
  }

  public constructor(public readonly router: Router, public breakpointService: BreakpointObserverService) {
    this.initTheme();
  }

  public gettingStarted = [{ link: 'getting-started/installation', name: 'Installation' }];

  public features = [
    { link: 'features/theming', name: 'Theming' },
    { link: 'features/icon-fonts', name: 'Icon Fonts' },
  ];

  public components = [
    {
      link: 'components/badge',
      name: 'Badge',
    },
    {
      link: 'components/bottom-navigation',
      name: 'Bottom Navigation',
    },
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
      link: 'components/chip',
      name: 'Chip',
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
      link: 'components/item-group',
      name: 'Item Group',
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
      link: 'components/snackbar',
      name: 'Snackbar',
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
