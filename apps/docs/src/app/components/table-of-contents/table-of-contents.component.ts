import { AsyncPipe, NgClass, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { TocItem, TocService } from '../../services/toc.service';

@Component({
  selector: 'app-table-of-contents',
  standalone: true,
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  imports: [NgForOf, AsyncPipe, NgClass],
})
export class TableOfContentsComponent {
  public constructor(protected readonly tocService: TocService) {}

  protected scrollTo(heading: TocItem) {
    const element = document.getElementById(heading.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
