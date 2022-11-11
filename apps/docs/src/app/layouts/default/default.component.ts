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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import type { EmbeddedViewRef } from '@angular/core';
import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationStart, Router, RouterModule, type RouterEvent } from '@angular/router';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-xml-doc';
import { catchError, filter, map, of, startWith, switchMap, take, tap } from 'rxjs';
import { CopyButtonComponent } from '../../components/copy-button/copy-button.component';
import { TableOfContentsComponent } from '../../components/table-of-contents/table-of-contents.component';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { TocService } from '../../services/toc.service';

type NavItem = {
  link: string;
  name: string;
  type: 'item';
};

type NavGroup = {
  icon?: string;
  items: (NavGroup | NavItem)[];
  name: string;
  type: 'group';
};

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
    HttpClientModule,
    CopyButtonComponent,
  ],
})
export class DefaultComponent {
  @ViewChild('container') private readonly container!: ElementRef<HTMLDivElement>;

  public initTheme() {
    const theme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (theme) {
      this.setTheme(theme);
    } else {
      this.setTheme('light');
    }
  }

  public setTheme(theme: 'dark' | 'light') {
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
    protected tocService: TocService,
    private readonly httpClient: HttpClient,
    private readonly markdownPipe: MarkdownPipe,
    private readonly renderer: Renderer2,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.initTheme();
  }

  protected markdown$ = this.router.events.pipe(
    filter(event => event instanceof NavigationStart),
    map(event => (event as RouterEvent).url),
    startWith(this.router.url),
    switchMap(source =>
      this.httpClient
        // @ts-expect-error: Valid use case
        .get<string>(`../../../assets/pages${source}.md`, { responseType: 'text' })
        .pipe(
          take(1),
          map(text => text as unknown as string),
          catchError(() => of(''))
        )
    ),
    switchMap(text => this.markdownPipe.parseMarkdown(text).pipe(take(1))),
    tap(() =>
      setTimeout(() => {
        this.addCopyButton();
        this.tocService.genToc(this.container.nativeElement);
      }, 0)
    )
  );

  private addCopyButton() {
    const allCodeBlocks = this.container.nativeElement.querySelectorAll('pre');
    for (const codeBlock of Array.from(allCodeBlocks)) {
      const componentRef = this.viewContainerRef.createComponent(CopyButtonComponent);
      componentRef.instance.content = codeBlock.textContent ?? '';
      const button = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      this.renderer.appendChild(codeBlock, button);
    }
  }

  public navigationTree: (NavGroup | NavItem)[] = [
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
        { link: 'features/typography', name: 'Typography', type: 'item' },
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
          link: 'components/divider',
          name: 'Divider',
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
