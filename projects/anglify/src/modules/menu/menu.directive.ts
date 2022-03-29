import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  Renderer2,
  Self,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { DEFAULT_MENU_SETTINGS, MENU_SETTINGS } from './menu-settings.token';
import type { MenuSettings } from './menu.interface';
import type { Elevation } from '../../composables/elevation/elevation';
import type { Position } from '../../composables/position/position.interface';
import { POSITION_SETTINGS } from '../../composables/position/position.token';
import { createSettingsProvider, SETTINGS } from '../../factories/settings.factory';

@Directive({
  selector: '[anglifyMenuTriggerFor]',
  exportAs: 'anglifyMenu',
  providers: [createSettingsProvider(DEFAULT_MENU_SETTINGS, MENU_SETTINGS)],
})
export class MenuDirective implements OnDestroy {
  @Input('anglifyMenuTriggerFor') public content!: TemplateRef<any> | Type<any>;
  @Input('anglifyMenuMountingPoint') public mountingPoint: 'body' | 'parent' | HTMLElement = 'parent';

  /** Distance between the menu and the activator */
  @Input()
  public set offset(value: number) {
    this._offset = value;
    if (this.componentRef) {
      this.componentRef.instance.offset = value;
    }
  }

  public get offset(): number {
    return this._offset;
  }

  @Input()
  public set position(value: Position) {
    this._position = value;
    if (this.componentRef) {
      this.componentRef.instance.position = value;
    }
  }

  public get position(): Position {
    return this._position;
  }

  @Input('anglifyMenuElevation')
  public set elevation(value: Elevation) {
    this._elevation = value;
    if (this.componentRef) {
      this.componentRef.instance.elevation = value;
    }
  }

  public get elevation(): Elevation {
    return this._elevation;
  }

  private _position = this.settings.position;
  private _offset = this.settings.offset;
  private _elevation = this.settings.elevation;

  private componentRef: ComponentRef<MenuComponent> | undefined; // Menu Component Reference
  private embeddedView: EmbeddedViewRef<any> | undefined; // Menu Content Template Reference

  public constructor(
    private readonly element: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly injector: Injector,
    private readonly resolver: ComponentFactoryResolver,
    private readonly applicationRef: ApplicationRef,
    private readonly cdRef: ChangeDetectorRef,
    @Self() @Inject(SETTINGS) private readonly settings: Required<MenuSettings>
  ) {}

  public ngOnDestroy() {
    this._detach();
  }

  private _detach() {
    this.componentRef?.destroy();
    this.componentRef = undefined;
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(_: MouseEvent, targetElement: HTMLElement) {
    if (!Boolean(targetElement)) return;
    const clickedInside = this.element.nativeElement.contains(targetElement);
    if (clickedInside && !this.componentRef) {
      this.create();
    } else if (this.componentRef) {
      this._detach();
    }
  }

  private create() {
    if (this.componentRef) return;
    const factory = this.resolver.resolveComponentFactory(MenuComponent);
    const injector = Injector.create({
      providers: [{ provide: POSITION_SETTINGS, useValue: { host: this.element.nativeElement } }],
    });
    this.componentRef = this.viewContainerRef.createComponent(factory, 0, injector, this.generateNgContent());
    this.componentRef.instance.offset = this.offset;
    this.componentRef.instance.position = this.position;
    this.componentRef.instance.elevation = this.elevation;

    this.changeMountingPoint();
    this.cdRef.markForCheck();
  }

  private generateNgContent(): any[][] {
    if (this.content instanceof TemplateRef) {
      this.embeddedView = this.content.createEmbeddedView({});
      this.applicationRef.attachView(this.embeddedView);
      return [this.embeddedView.rootNodes];
    }
    return [[this.resolver.resolveComponentFactory(this.content).create(this.injector)]];
  }

  private changeMountingPoint() {
    if (!this.componentRef) return;
    if (this.mountingPoint === 'parent') {
    } else if (this.mountingPoint === 'body') {
      this.renderer.appendChild(document.body, this.componentRef.location.nativeElement);
    } else {
      this.renderer.appendChild(this.mountingPoint, this.componentRef.location.nativeElement);
    }
  }
}