import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { SnackbarComponent } from './snackbar.component';
import { SnackbarContext, SnackbarData, SnackbarInteralDismissReason, SnackbarOptions } from './snackbar.interface';
import { AnglifyIdService } from '../../services/id/id.service';

export const SNACKBAR_CONTEXT = new InjectionToken<SnackbarContext>('Snackbar context');

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public readonly activeSnackbar$ = new BehaviorSubject<SnackbarContext | null>(null);

  private readonly overlayConfig = new OverlayConfig();

  public constructor(private readonly overlay: Overlay, private readonly idService: AnglifyIdService) {}

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
        this.activeSnackbar$.value.completeWith({ reason: SnackbarInteralDismissReason.Priority });
      }

      const completeWith = (data: SnackbarData) => {
        observer.next(data);
        observer.complete();
      };

      const context: SnackbarContext = {
        completeWith,
        $implicit: observer,
        createdAt: Date.now(),
        id: this.idService.generate(),
        ...options,
      };

      this.activeSnackbar$.next(context);
      const overlayRef = this.overlay.create(this.overlayConfig);
      const componentRef = new ComponentPortal(
        SnackbarComponent,
        null,
        Injector.create({ providers: [{ provide: SNACKBAR_CONTEXT, useValue: context }] })
      );
      overlayRef.attach(componentRef);

      return () => {
        this.activeSnackbar$.next(null);
        if (componentRef.isAttached) {
          componentRef.detach();
        }
        overlayRef.dispose();
      };
    });
  }
}
