import { AsyncPipe, NgClass, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TocService, type TocItem } from '../../services/toc.service';

@Component({
  selector: 'app-table-of-contents',
  standalone: true,
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  imports: [NgForOf, AsyncPipe, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentsComponent {
  public constructor(protected readonly tocService: TocService) {}

  protected scrollTo(heading: TocItem) {
    const element = document.querySelector(`#${heading.href}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  protected trackByFn(_: number, heading: TocItem) {
    return heading.href;
  }
}
