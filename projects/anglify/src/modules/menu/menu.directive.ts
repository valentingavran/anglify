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
  Optional,
  Renderer2,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { DEFAULT_MENU_SETTINGS, MENU_SETTINGS } from './menu-settings.token';
import { MenuSettings } from './menu.interface';
import { POSITION_SETTINGS } from '../../composables/position/position.token';
import { Position } from '../../composables/position/position.interface';
import { Elevation } from '../../composables/elevation/elevation';

@Directive({
  selector: '[anglifyMenuTriggerFor]',
  exportAs: 'anglifyMenu',
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

  private _position = DEFAULT_MENU_SETTINGS.position;
  private _offset = DEFAULT_MENU_SETTINGS.offset;
  private _elevation = DEFAULT_MENU_SETTINGS.elevation;

  private componentRef: ComponentRef<MenuComponent> | undefined; // Menu Component Reference
  private embeddedView: EmbeddedViewRef<any> | undefined; // Menu Content Template Reference

  public constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly injector: Injector,
    private readonly resolver: ComponentFactoryResolver,
    private readonly applicationRef: ApplicationRef,
    private readonly cdRef: ChangeDetectorRef,
    @Optional() @Inject(MENU_SETTINGS) private readonly settings?: Required<MenuSettings>
  ) {
    const mergedSettings: Required<MenuSettings> = Object.assign({}, DEFAULT_MENU_SETTINGS, this.settings);
    this.offset = mergedSettings.offset;
    this.position = mergedSettings.position;
    this.elevation = mergedSettings.elevation;
  }

  public ngOnDestroy(): void {
    this._detach();
  }

  private _detach(): void {
    this.componentRef?.destroy();
    this.componentRef = undefined;
    this.embeddedView?.destroy();
    this.embeddedView = undefined;
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!Boolean(targetElement)) return;
    const clickedInside = this.element.nativeElement.contains(targetElement);
    if (clickedInside && !this.componentRef) {
      this.create();
    } else if (this.componentRef) {
      this._detach();
    }
  }

  private create(): void {
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

  private changeMountingPoint(): void {
    if (!this.componentRef) return;
    if (this.mountingPoint === 'parent') {
    } else if (this.mountingPoint === 'body') {
      this.renderer.appendChild(document.body, this.componentRef.location.nativeElement);
    } else {
      this.renderer.appendChild(this.mountingPoint, this.componentRef.location.nativeElement);
    }
  }
}
