import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Heading {
  title: string;
  id: string;
  level: string;
  active: BehaviorSubject<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class TableOfContentsService {
  public content: Heading[] = [];

  public register(heading: Heading) {
    this.content.push(heading);
  }

  public unregister(id: string) {
    this.content = this.content.filter(heading => heading.id !== id);
  }

  public setActive(id: string) {
    this.content.forEach(heading => (heading.id === id ? heading.active.next(true) : heading.active.next(false)));
  }

  public setInactive(id: string) {
    this.content.forEach(heading => {
      if (heading.id === id) heading.active.next(false);
    });
  }
}
