import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class AnglifyDestroyService extends ReplaySubject<void> implements OnDestroy {
  public constructor() {
    super(1);
  }

  public ngOnDestroy() {
    this.next();
    this.complete();
  }
}
