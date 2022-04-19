import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  TemplateRef,
  Type,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogContext } from './dialog-context.interface';
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

  public constructor(
    private readonly appRef: ApplicationRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly injector: Injector,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly idService: AnglifyIdService
  ) {}

  public open(component: Type<any> | TemplateRef<any>, options: Partial<DialogOptions> = {}) {
    return new Observable(observer => {
      const completeWith = (result?: any) => {
        observer.next(result);
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

      const componentRef =
        component instanceof TemplateRef
          ? this.createFromTemplate(component, context)
          : (this.createFromComponent(component, context).hostView as EmbeddedViewRef<any>);
      const dialogComponentRef = this.createDialogComponent(context, componentRef.rootNodes);

      this.dialogs$.next([...this.dialogs$.value, context]);

      this.document.body.appendChild(dialogComponentRef.location.nativeElement);
      this.appRef.attachView(dialogComponentRef.hostView);
      this.appRef.attachView(componentRef);

      return () => {
        this.dialogs$.next(this.dialogs$.value.filter(item => item !== context));
        this.document.body.removeChild(dialogComponentRef.location.nativeElement);
        this.appRef.detachView(dialogComponentRef.hostView);
        this.appRef.detachView(componentRef);
        dialogComponentRef.hostView.destroy();
        componentRef.destroy();
      };
    });
  }

  private createDialogComponent(context: DialogContext, nodes: any[]) {
    const dialogComponent = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    return dialogComponent.create(
      Injector.create({
        providers: [
          {
            provide: DIALOG_CONTEXT,
            useValue: context,
          },
          {
            provide: DIALOG_NODES,
            useValue: nodes,
          },
        ],
        parent: this.injector,
      })
    );
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
        parent: this.injector,
      })
    );
  }

  private createFromTemplate(template: TemplateRef<any>, context: DialogContext) {
    return template.createEmbeddedView(context);
  }
}
