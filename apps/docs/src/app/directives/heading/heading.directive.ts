import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableOfContentsService } from '../../services/table-of-contents/table-of-contents.service';

@Directive({
  selector: 'h2, h3, h4, h5, h6',
  standalone: true,
})
export class HeadingDirective implements AfterViewInit, OnDestroy {
  public constructor(private readonly elementRef: ElementRef<HTMLHeadingElement>, private readonly tocService: TableOfContentsService) {}

  public ngAfterViewInit() {
    this.elementRef.nativeElement.id = this.elementRef.nativeElement.innerText.replace(/\W/g, '-').toLowerCase();

    this.tocService.register({
      title: this.elementRef.nativeElement.innerText,
      id: this.elementRef.nativeElement.id,
      level: this.elementRef.nativeElement.tagName.toLowerCase(),
      active: new BehaviorSubject(false),
    });
  }

  public ngOnDestroy() {
    this.tocService.unregister(this.elementRef.nativeElement.id);
  }
}
