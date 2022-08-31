import { AsyncPipe, NgClass, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { Heading, TableOfContentsService } from '../../services/table-of-contents/table-of-contents.service';

@Component({
  selector: 'app-table-of-contents',
  standalone: true,
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  imports: [NgForOf, AsyncPipe, NgClass],
})
export class TableOfContentsComponent {
  public constructor(protected readonly tocService: TableOfContentsService) {}

  protected scrollTo(heading: Heading) {
    const element = document.getElementById(heading.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
