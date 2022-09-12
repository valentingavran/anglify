import {
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Inject,
  Injector,
  Input,
  Renderer2,
  Self,
  TemplateRef,
  ViewContainerRef,
  type ComponentRef,
  type EmbeddedViewRef,
  type OnInit,
  type Type,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Position } from '../../composables/position/position.interface';
import { POSITION_SETTINGS } from '../../composables/position/position.token';
import { createSettingsProvider } from '../../factories/settings.factory';
import { BADGE_SETTINGS, DEFAULT_BADGE_SETTINGS } from './badge-settings.token';
import { BadgeComponent } from './badge.component';
import { EntireBadgeSettings } from './badge.interface';

@UntilDestroy()
@Directive({
  selector: '[anglifyBadge]',
  standalone: true,
  exportAs: 'anglifyBadge',
  providers: [createSettingsProvider<EntireBadgeSettings>('anglifyBadgeSettings', DEFAULT_BADGE_SETTINGS, BADGE_SETTINGS)],
})
export class BadgeDirective implements OnInit {
  @Input('anglifyBadge') public content!: TemplateRef<any> | Type<any> | string;

  @Input('badgePosition') public position: Position = this.settings.position;

  @Input('badgeBorder') public border = this.settings.border;

  private componentRef: ComponentRef<BadgeComponent> | undefined; // Badge Component Reference

  private embeddedView: EmbeddedViewRef<any> | undefined; // Badge Content Template Reference

  public constructor(
    @Self() @Inject('anglifyBadgeSettings') public settings: EntireBadgeSettings,
    private readonly element: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly injector: Injector,
    private readonly resolver: ComponentFactoryResolver,
    private readonly applicationRef: ApplicationRef,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.create();
  }

  private create() {
    if (this.componentRef) return;
    const factory = this.resolver.resolveComponentFactory(BadgeComponent);
    const injector = Injector.create({
      providers: [{ provide: POSITION_SETTINGS, useValue: { host: this.element.nativeElement } }],
    });
    this.componentRef = this.viewContainerRef.createComponent(factory, 0, injector, this.generateNgContent());
    this.componentRef.instance.position = this.position;
    this.componentRef.instance.border = this.border;

    this.cdRef.markForCheck();
  }

  private generateNgContent() {
    if (typeof this.content === 'string') {
      return [[this.renderer.createText(this.content)]];
    }

    if (this.content instanceof TemplateRef) {
      this.embeddedView = this.content.createEmbeddedView({});
      this.applicationRef.attachView(this.embeddedView);
      return [this.embeddedView.rootNodes];
    }

    return [[this.resolver.resolveComponentFactory(this.content).create(this.injector)]];
  }
}
