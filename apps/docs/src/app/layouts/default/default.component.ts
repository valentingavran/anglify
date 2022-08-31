import {
  BreakpointObserverService,
  ButtonComponent,
  IconComponent,
  ListComponent,
  ListGroupComponent,
  ListItemComponent,
  ListItemGroupComponent,
  ListItemTitleComponent,
  NavigationDrawerComponent,
  SlotDirective,
  ToolbarComponent,
  TooltipDirective,
} from '@anglify/components';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TableOfContentsComponent } from '../../components/table-of-contents/table-of-contents.component';
import { TableOfContentsService } from '../../services/table-of-contents/table-of-contents.service';

interface NavItem {
  name: string;
  link: string;
  type: 'item';
}

interface NavGroup {
  name: string;
  items: (NavItem | NavGroup)[];
  type: 'group';
  icon?: string;
}

@Component({
  selector: 'anglify-default',
  standalone: true,
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ToolbarComponent,
    IconComponent,
    NavigationDrawerComponent,
    ListComponent,
    ListItemGroupComponent,
    ListGroupComponent,
    ListItemComponent,
    ListItemTitleComponent,
    TooltipDirective,
    NgForOf,
    NgIf,
    AsyncPipe,
    RouterModule,
    SlotDirective,
    ButtonComponent,
    TableOfContentsComponent,
  ],
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

  public constructor(
    public readonly router: Router,
    public breakpointService: BreakpointObserverService,
    protected tocService: TableOfContentsService
  ) {
    this.initTheme();
  }

  public navigationTree: (NavItem | NavGroup)[] = [
    {
      name: 'Getting Started',
      items: [
        { link: 'getting-started/installation', name: 'Installation', type: 'item' },
        { link: 'getting-started/application-layouts', name: 'Application Layouts', type: 'item' },
        { link: 'getting-started/release-notes', name: 'Release notes', type: 'item' },
      ],
      type: 'group',
      icon: 'mdi-text-box',
    },
    {
      name: 'Features',
      items: [
        { link: 'features/theming', name: 'Theming', type: 'item' },
        { link: 'features/icon-fonts', name: 'Icon Fonts', type: 'item' },
        { link: 'features/breakpoints', name: 'Breakpoints', type: 'item' },
      ],
      type: 'group',
      icon: 'mdi-feature-search',
    },
    {
      name: 'Components',
      type: 'group',
      icon: 'mdi-toggle-switch-outline',
      items: [
        {
          link: 'components/badge',
          name: 'Badge',
          type: 'item',
        },
        {
          link: 'components/bottom-navigation',
          name: 'Bottom Navigation',
          type: 'item',
        },
        {
          link: 'components/breadcrumbs',
          name: 'Breadcrumbs',
          type: 'item',
        },
        {
          link: 'components/button',
          name: 'Button',
          type: 'item',
        },
        {
          link: 'components/button-group',
          name: 'Button Group',
          type: 'item',
        },
        {
          link: 'components/card',
          name: 'Card',
          type: 'item',
        },
        {
          link: 'components/chip',
          name: 'Chip',
          type: 'item',
        },
        {
          link: 'components/dialog',
          name: 'Dialog',
          type: 'item',
        },
        {
          link: 'components/expansion-panels',
          name: 'Expansion Panels',
          type: 'item',
        },
        {
          type: 'group',
          name: 'Form inputs & controls',
          items: [
            {
              link: 'components/autocomplete',
              name: 'Autocomplete',
              type: 'item',
            },
            {
              link: 'components/checkbox',
              name: 'Checkbox',
              type: 'item',
            },
            {
              link: 'components/combobox',
              name: 'Combobox',
              type: 'item',
            },
            {
              link: 'components/otp-input',
              name: 'OTP Input',
              type: 'item',
            },
            {
              link: 'components/radio-button',
              name: 'Radio Button',
              type: 'item',
            },
            {
              link: 'components/select',
              name: 'Select',
              type: 'item',
            },
            {
              link: 'components/text-area',
              name: 'Text Area',
              type: 'item',
            },
            {
              link: 'components/text-field',
              name: 'Text Field',
              type: 'item',
            },
          ],
        },
        {
          link: 'components/icon',
          name: 'Icon',
          type: 'item',
        },
        {
          link: 'components/item-group',
          name: 'Item Group',
          type: 'item',
        },
        {
          link: 'components/list',
          name: 'List',
          type: 'item',
        },
        {
          link: 'components/menu',
          name: 'Menu',
          type: 'item',
        },
        {
          link: 'components/navigation-drawer',
          name: 'Navigation Drawer',
          type: 'item',
        },
        {
          link: 'components/progress-circular',
          name: 'Progress Circular',
          type: 'item',
        },
        {
          link: 'components/progress-linear',
          name: 'Progress Linear',
          type: 'item',
        },
        {
          link: 'components/snackbar',
          name: 'Snackbar',
          type: 'item',
        },
        {
          link: 'components/stepper',
          name: 'Stepper',
          type: 'item',
        },
        {
          type: 'group',
          items: [
            {
              link: 'components/data-table',
              name: 'Data Table',
              type: 'item',
            },
            {
              link: 'components/simple-table',
              name: 'Simple Table',
              type: 'item',
            },
          ],
          name: 'Tables',
        },
        {
          link: 'components/tabs',
          name: 'Tabs',
          type: 'item',
        },
        {
          link: 'components/timeline',
          name: 'Timeline',
          type: 'item',
        },
        {
          link: 'components/toolbar',
          name: 'Toolbar',
          type: 'item',
        },
        {
          link: 'components/tooltip',
          name: 'Tooltip',
          type: 'item',
        },
      ],
    },
  ];
}
