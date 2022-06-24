import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  InjectionToken,
  Injector,
  TemplateRef,
  Type,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogContext, ModalData } from './dialog-context.interface';
import { DialogOptions } from './dialog-options.interface';
import { DialogComponent } from './dialog.component';
import { AnglifyIdService } from '../../services/id/id.service';

export const DIALOG_CONTEXT = new InjectionToken<DialogContext>('Dialog context');

export const DIALOG_NODES = new InjectionToken<HTMLElement[]>('Dialog nodes to insert');

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialogs$ = new BehaviorSubject<ReadonlyArray<DialogContext>>([]);

  private readonly overlayConfig = new OverlayConfig({
    positionStrategy: this.overlay.position().global().centerVertically().centerHorizontally(),
    scrollStrategy: this.overlay.scrollStrategies.block(),
    hasBackdrop: true,
    backdropClass: 'anglify-dialog-backdrop',
    panelClass: 'anglify-dialog-pane',
  });

  public constructor(
    private readonly appRef: ApplicationRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly overlay: Overlay,
    private readonly idService: AnglifyIdService
  ) {}

  public open(component: Type<any> | TemplateRef<any>, options: Partial<DialogOptions> = {}) {
    return new Observable(observer => {
      const completeWith = (data: ModalData) => {
        observer.next(data);
        observer.complete();
      };

      const context: DialogContext = {
        completeWith,
        $implicit: observer,
        component,
        createdAt: Date.now(),
        id: this.idService.generate(),
        ...options,
      };

      this.dialogs$.next([...this.dialogs$.value, context]);
      const viewRef =
        component instanceof TemplateRef
          ? this.createFromTemplate(component, context)
          : (this.createFromComponent(component, context).hostView as EmbeddedViewRef<any>);
      const overlayRef = this.overlay.create(this.overlayConfig);
      const componentRef = new ComponentPortal(
        DialogComponent,
        null,
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
      overlayRef.attach(componentRef);
      const backdropSubscription = overlayRef.backdropClick().subscribe(() => completeWith({ reason: 'internal.backdrop' }));
      this.appRef.attachView(viewRef);

      return () => {
        this.dialogs$.next(this.dialogs$.value.filter(item => item !== context));
        backdropSubscription.unsubscribe();
        if (componentRef.isAttached) {
          componentRef.detach();
        }
        viewRef.destroy();
        overlayRef.detach();
      };
    });
  }

  private createFromComponent(component: Type<any>, context: DialogContext) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    return componentFactory.create(
      Injector.create({
        providers: [
          {
            provide: DIALOG_CONTEXT,
            useValue: context,
          },
        ],
      })
    );
  }

  private createFromTemplate(template: TemplateRef<any>, context: DialogContext) {
    return template.createEmbeddedView(context);
  }
}
