import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';
import { unwrapHtml } from 'safevalues';
import { htmlSafeByReview } from 'safevalues/restricted/reviewed';

export interface TocItem {
  content: SafeHtml;
  href: string;
  isSecondary?: boolean;
  level: string;
  title: string;
}

@Injectable()
export class TocService {
  public tocList = new ReplaySubject<TocItem[]>(1);
  public activeItemIndex = new ReplaySubject<number | null>(1);

  public constructor(@Inject(DOCUMENT) private readonly document: Document, private readonly domSanitizer: DomSanitizer) {}

  public genToc(docElement?: Element) {
    if (!docElement) {
      this.tocList.next([]);
      return;
    }

    const headings = this.findTocHeadings(docElement);
    const idMap = new Map<string, number>();
    const tocList = headings.map(heading => {
      const { title, content } = this.extractHeadingSafeHtml(heading);

      return {
        level: heading.tagName.toLowerCase(),
        href: this.getId(heading, idMap),
        title,
        content,
      };
    });

    this.tocList.next(tocList);
  }

  public reset() {
    this.tocList.next([]);
  }

  // Transform the HTML content to be safe to use in the ToC:
  //   - Strip off certain auto-generated elements (such as GitHub links and heading anchor links).
  //   - Strip off any anchor links (but keep their content)
  //   - Mark the HTML as trusted to be used with `[innerHTML]`.
  private extractHeadingSafeHtml(heading: HTMLHeadingElement) {
    const div = this.document.createElement('div');
    div.innerHTML = unwrapHtml(htmlSafeByReview(heading.innerHTML, '^')) as string;

    // Remove any `.github-links` or `.header-link` elements (along with their content).
    div.querySelectorAll('.github-links, .header-link').forEach(link => link.remove());

    // Remove any remaining `a` elements (but keep their content).
    div.querySelectorAll('a').forEach(anchorLink => {
      // We want to keep the content of this anchor, so move it into its parent.
      const parent = anchorLink.parentNode as Node;
      while (anchorLink.childNodes.length) {
        parent.insertBefore(anchorLink.childNodes[0], anchorLink);
      }

      // Now, remove the anchor.
      anchorLink.remove();
    });

    return {
      // Security: The document element which provides this heading content is always authored by
      // the documentation team and is considered to be safe.
      content: this.domSanitizer.bypassSecurityTrustHtml(div.innerHTML.trim()),
      title: (div.textContent ?? '').trim(),
    };
  }

  private findTocHeadings(docElement: Element): HTMLHeadingElement[] {
    const headings = docElement.querySelectorAll<HTMLHeadingElement>('h2,h3,h4,h5,h6');
    const skipNoTocHeadings = (heading: HTMLHeadingElement) => !/(?:no-toc|notoc)/i.test(heading.className);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Array.prototype.filter.call(headings, skipNoTocHeadings);
  }

  // Extract the id from the heading; create one if necessary
  // Is it possible for a heading to lack an id?
  private getId(h: HTMLHeadingElement, idMap: Map<string, number>) {
    // Map guards against duplicate id creation.
    function addToMap(key: string) {
      const oldCount = idMap.get(key) ?? 0;
      const count = oldCount + 1;
      idMap.set(key, count);
      return count === 1 ? key : `${key}-${count}`;
    }

    let id = h.id;
    if (id) {
      addToMap(id);
    } else {
      id = (h.textContent ?? '').trim().toLowerCase().replace(/\W+/g, '-');
      id = addToMap(id);
      h.id = id;
    }
    return id;
  }
}
