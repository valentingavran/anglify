import { Injectable, InjectionToken, Injector } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AnglifyIdService } from '../../services/id/id.service';
import { OverlayService } from '../../services/overlay.service';
import { SnackbarComponent } from './snackbar.component';
import { SnackbarInternalDismissReason, type SnackbarContext, type SnackbarData, type SnackbarOptions } from './snackbar.interface';

export const SNACKBAR_CONTEXT = new InjectionToken<SnackbarContext>('Snackbar context');

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public readonly activeSnackbar$ = new BehaviorSubject<SnackbarContext | null>(null);

  public constructor(private readonly idService: AnglifyIdService, private readonly overlayService: OverlayService) {}

  public open(options: Partial<SnackbarOptions> = {}) {
    const subscription = this.open$(options)
      .pipe(
        finalize(() => {
          subscription.unsubscribe();
        })
      )
      .subscribe();
  }

  public open$(options: Partial<SnackbarOptions> = {}) {
    return new Observable(observer => {
      if (this.activeSnackbar$.value) {
        this.activeSnackbar$.value.completeWith({ reason: SnackbarInternalDismissReason.Priority });
      }

      const completeWith = (data: SnackbarData) => {
        observer.next(data);
        observer.complete();
      };

      const overlayRef = this.overlayService.create();
      const context: SnackbarContext = {
        completeWith,
        $implicit: observer,
        createdAt: Date.now(),
        id: this.idService.generate(),
        overlayRef,
        ...options,
      };

      this.activeSnackbar$.next(context);
      overlayRef.attach(SnackbarComponent, Injector.create({ providers: [{ provide: SNACKBAR_CONTEXT, useValue: context }] }));

      return () => {
        this.activeSnackbar$.next(null);
        overlayRef.dispose();
      };
    });
  }
}
