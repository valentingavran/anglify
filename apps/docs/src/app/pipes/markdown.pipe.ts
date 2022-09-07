import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';
import { map, of } from 'rxjs';
import { HighlightPipe } from './highlight.pipe';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  public transform(markdown: string) {
    return this.parseMarkdown(markdown);
  }

  public constructor(private readonly domSanitizer: DomSanitizer, private readonly highlightPipe: HighlightPipe) {}

  public parseMarkdown(markdownString: string) {
    return of(
      marked.parse(markdownString, {
        highlight: (code, lang) => this.highlightPipe.transform(code, lang),
      })
    ).pipe(map(html => this.domSanitizer.bypassSecurityTrustHtml(html)));
  }
}
