import {
  ApplicationRef,
  createComponent,
  Injectable,
  InjectionToken,
  Injector,
  TemplateRef,
  type EmbeddedViewRef,
  type Type,
} from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AnglifyIdService } from '../../services/id/id.service';
import { OverlayService } from '../../services/overlay.service';
import { DialogComponent } from './dialog.component';
import { type DialogContext, type DialogOptions, type ModalData } from './dialog.interface';

export const DIALOG_CONTEXT = new InjectionToken<DialogContext>('Dialog context');

export const DIALOG_NODES = new InjectionToken<HTMLElement[]>('Dialog nodes to insert');

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialogs$ = new BehaviorSubject<readonly DialogContext[]>([]);

  public constructor(
    private readonly appRef: ApplicationRef,
    private readonly idService: AnglifyIdService,
    private readonly overlayService: OverlayService
  ) {}

  public open(component: TemplateRef<any> | Type<any>, options: Partial<DialogOptions> = {}) {
    const subscription = this.open$(component, options)
      .pipe(
        finalize(() => {
          subscription.unsubscribe();
        })
      )
      .subscribe();
  }

  public open$(component: TemplateRef<any> | Type<any>, options: Partial<DialogOptions> = {}) {
    return new Observable(observer => {
      const completeWith = (data: ModalData) => {
        observer.next(data);
        observer.complete();
      };

      const overlayRef = this.overlayService.create();

      const context: DialogContext = {
        completeWith,
        $implicit: observer,
        component,
        createdAt: Date.now(),
        id: this.idService.generate(),
        overlayRef,
        ...options,
      };

      this.dialogs$.next([...this.dialogs$.value, context]);
      const viewRef =
        component instanceof TemplateRef
          ? this.createFromTemplate(component, context)
          : (this.createFromComponent(component, context).hostView as EmbeddedViewRef<any>);

      overlayRef.attach(
        DialogComponent,
        Injector.create({
          providers: [
            {
              provide: DIALOG_CONTEXT,
              useValue: context,
            },
            {
              provide: DIALOG_NODES,
              useValue: viewRef.rootNodes,
            },
          ],
        })
      );

      this.appRef.attachView(viewRef);

      return () => {
        this.dialogs$.next(this.dialogs$.value.filter(item => item !== context));
        viewRef.destroy();
        overlayRef.dispose();
      };
    });
  }

  private createFromComponent(component: Type<any>, context: DialogContext) {
    return createComponent(component, {
      elementInjector: Injector.create({
        providers: [{ provide: DIALOG_CONTEXT, useValue: context }],
      }),
      environmentInjector: this.appRef.injector,
    });
  }

  private createFromTemplate(template: TemplateRef<any>, context: DialogContext) {
    return template.createEmbeddedView(context);
  }
}
