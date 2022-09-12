import { fastInFastOutY, InteractionStateDirective } from '@anglify/components';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HighlightPipe } from '../../pipes/highlight.pipe';

type Type = {
  customProperties: string;
  name: string;
  title: string;
};

@Component({
  standalone: true,
  imports: [InteractionStateDirective, NgForOf, NgClass, NgIf, HighlightPipe, AsyncPipe],
  templateUrl: './typography-preview.component.html',
  styleUrls: ['./typography-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fastInFastOutY()],
})
export class TypographyPreviewComponent {
  protected activeTypography$ = new BehaviorSubject<Type['name'] | null>('display-1');

  protected typography: Type[] = [
    {
      name: 'display-1',
      title: 'Display 1',
      customProperties: `font: var(--font-display-1);\nletter-spacing: var(--font-letter-spacing-display-1);\ntext-transform: var(--font-text-transform-display-1);`,
    },
    {
      name: 'display-2',
      title: 'Display 2',
      customProperties: `font: var(--font-display-2);\nletter-spacing: var(--font-letter-spacing-display-2);\ntext-transform: var(--font-text-transform-display-2);`,
    },
    {
      name: 'display-3',
      title: 'Display 3',
      customProperties: `font: var(--font-display-3);\nletter-spacing: var(--font-letter-spacing-display-3);\ntext-transform: var(--font-text-transform-display-3);`,
    },
    {
      name: 'display-4',
      title: 'Display 4',
      customProperties: `font: var(--font-display-4);\nletter-spacing: var(--font-letter-spacing-display-4);\ntext-transform: var(--font-text-transform-display-4);`,
    },
    {
      name: 'display-5',
      title: 'Display 5',
      customProperties: `font: var(--font-display-5);\nletter-spacing: var(--font-letter-spacing-display-5);\ntext-transform: var(--font-text-transform-display-5);`,
    },
    {
      name: 'display-6',
      title: 'Display 6',
      customProperties: `font: var(--font-display-6);\nletter-spacing: var(--font-letter-spacing-display-6);\ntext-transform: var(--font-text-transform-display-6);`,
    },
    {
      name: 'subtitle-1',
      title: 'Subtitle 1',
      customProperties: `font: var(--font-subtitle-1);\nletter-spacing: var(--font-letter-spacing-subtitle-1);\ntext-transform: var(--font-text-transform-subtitle-1);`,
    },
    {
      name: 'subtitle-2',
      title: 'Subtitle 2',
      customProperties: `font: var(--font-subtitle-2);\nletter-spacing: var(--font-letter-spacing-subtitle-2);\ntext-transform: var(--font-text-transform-subtitle-2);`,
    },
    {
      name: 'body-1',
      title: 'Body 1',
      customProperties: `font: var(--font-body-1);\nletter-spacing: var(--font-letter-spacing-body-1);\ntext-transform: var(--font-text-transform-body-1);`,
    },
    {
      name: 'body-2',
      title: 'Body 2',
      customProperties: `font: var(--font-body-2);\nletter-spacing: var(--font-letter-spacing-body-2);\ntext-transform: var(--font-text-transform-body-2);`,
    },
    {
      name: 'button',
      title: 'Button',
      customProperties: `font: var(--font-button);\nletter-spacing: var(--font-letter-spacing-button);\ntext-transform: var(--font-text-transform-button);`,
    },
    {
      name: 'caption',
      title: 'Caption',
      customProperties: `font: var(--font-caption);\nletter-spacing: var(--font-letter-spacing-caption);\ntext-transform: var(--font-text-transform-caption);`,
    },
    {
      name: 'overline',
      title: 'Overline',
      customProperties: `font: var(--font-overline);\nletter-spacing: var(--font-letter-spacing-overline);\ntext-transform: var(--font-text-transform-overline);`,
    },
  ];

  protected toggleTypeDetails(type: Type) {
    this.activeTypography$.next(this.activeTypography$.value === type.name ? null : type.name);
  }

  protected trackByFn(_: number, item: Type) {
    return item.name;
  }
}
