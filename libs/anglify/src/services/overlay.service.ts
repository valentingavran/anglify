import type { ComponentRef, Injector, Type } from '@angular/core';
import { ApplicationRef, ComponentFactoryResolver, Injectable } from '@angular/core';
import { filter, fromEvent, map } from 'rxjs';
import type { Position } from '../composables/position/position.interface';

export class Overlay {
  /**
   * The timestamp when the overlay was created.
   */
  public readonly createdAt: number;

  /**
   * Emits when the backdrop is clicked.
   */
  public backdropClick$;

  /**
   * The element that is used to render the overlay.
   */
  private readonly element: HTMLElement;

  /**
   * Holds the element that is used to render the overlay.
   */
  private readonly pane: HTMLElement;

  private mountedComponent: ComponentRef<any> | null = null;

  private destroyed = false;

  public set position(position: Position | 'center' | null) {
    switch (position) {
      case 'center':
      default:
        this.element.style.alignItems = 'center';
        this.element.style.justifyContent = 'center';
        break;
      case 'top-start':
      case 'left-start':
        this.element.style.alignItems = 'flex-start';
        this.element.style.justifyContent = 'flex-start';
        break;
      case 'top':
        this.element.style.alignItems = 'flex-start';
        this.element.style.justifyContent = 'center';
        break;
      case 'top-end':
      case 'right-start':
        this.element.style.alignItems = 'flex-start';
        this.element.style.justifyContent = 'flex-end';
        break;
      case 'right':
        this.element.style.alignItems = 'center';
        this.element.style.justifyContent = 'flex-end';
        break;
      case 'right-end':
      case 'bottom-end':
        this.element.style.alignItems = 'flex-end';
        this.element.style.justifyContent = 'flex-end';
        break;
      case 'bottom':
        this.element.style.alignItems = 'flex-end';
        this.element.style.justifyContent = 'center';
        break;
      case 'bottom-start':
      case 'left-end':
        this.element.style.alignItems = 'flex-end';
        this.element.style.justifyContent = 'flex-start';
        break;
      case 'left':
        this.element.style.alignItems = 'center';
        this.element.style.justifyContent = 'flex-start';
        break;
    }
  }

  public set backdrop(value: boolean) {
    if (value) {
      document.body.style.setProperty('height', '100%');
      document.body.style.setProperty('overflow', 'hidden');
      if (!this.element) return;
      this.element.style.setProperty('background-color', 'rgba(0, 0, 0, 0.5)');
      this.element.style.setProperty('pointer-events', 'all');
    } else {
      document.body.style.removeProperty('height');
      document.body.style.removeProperty('overflow');
      if (!this.element) return;
      this.element.style.removeProperty('background-color');
      this.element.style.removeProperty('pointer-events');
    }
  }

  public constructor(private readonly applicationRef: ApplicationRef, private readonly resolver: ComponentFactoryResolver) {
    this.element = document.createElement('div');
    this.element.classList.add('anglify-overlay-container');
    this.pane = document.createElement('div');
    this.pane.classList.add('anglify-overlay-pane');
    this.element.append(this.pane);
    document.body.append(this.element);
    this.createdAt = Date.now();

    this.backdropClick$ = fromEvent(this.element, 'click').pipe(
      map(event => event as MouseEvent),
      filter((event: MouseEvent) => event.target === this.element)
    );
  }

  /**
   * Attaches the component to the overlay.
   */
  public attach(component: Type<any>, injector: Injector) {
    if (this.destroyed) throw new Error('Cannot attach to a destroyed overlay.');
    if (this.mountedComponent) return;

    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = factory.create(injector, [], this.pane);
    this.applicationRef.attachView(componentRef.hostView);
    this.mountedComponent = componentRef;
  }

  /**
   * Detaches the component from the overlay.
   */
  public detach() {
    if (!this.mountedComponent) return;
    this.mountedComponent.destroy();
    this.applicationRef.detachView(this.mountedComponent.hostView);
    this.pane.innerHTML = '';
  }

  /**
   * Destroys the overlay.
   */
  public dispose() {
    this.detach();
    this.backdrop = false;
    this.element.remove();
    this.destroyed = true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  public constructor(private readonly applicationRef: ApplicationRef, private readonly resolver: ComponentFactoryResolver) {}

  public create() {
    return new Overlay(this.applicationRef, this.resolver);
  }
}
