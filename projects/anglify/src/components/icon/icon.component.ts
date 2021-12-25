import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Inject, Input, Output } from '@angular/core';
import { ICON_SETTINGS } from './icon-settings.token';
import { IconSet, IconSettings } from './icon.interface';
import { BooleanLike, ComponentSize } from '../../utils/interfaces';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const ICON_SET_CLASS_MAPPING: { [K in IconSet]: string } = {
  fa4: '',
  md: 'material-icons',
  custom: '',
  fa5: '',
  mdiSVG: '',
  mdi: 'mdi',
  faSVG: '',
};

/**
 * Anglify comes bootstrapped with support for Material Design Icons, Material Icons, Font Awesome 4, Font Awesome 5 and Custom Icons.
 * By default, applications will use the Material Design Icons.
 * Anglify supports icons that are provided via CDN's as well as Javascript/Typescript icon distributions.
 */
@Component({
  selector: 'anglify-icon',
  styleUrls: ['./icon.component.scss'],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  /**
   * Name of the icon to display
   * @default undefined
   */
  @Input() public icon?: string;

  /**
   * Specifies from which IconSet the icon should be displayed. If the iconSet property is not
   * specified, the icon will be searched for in the defaultSet and then displayed
   * @default "mdi"
   */
  @Input() public iconSet: IconSet;

  /**
   *  __normal__ is the default size.
   * By providing IconSettings, this default value can be overridden globally. Otherwise, this property
   * can be set for individual icons
   * @default "normal"
   */
  @Input() public size: ComponentSize;

  @HostBinding('class.clickable')
  @Input()
  public clickable = false;

  @HostBinding('class.disabled')
  @Input()
  public disabled = false;

  @Output() public click = new EventEmitter<void>();

  public constructor(@Inject(ICON_SETTINGS) private readonly settings: Required<IconSettings>, private readonly sanitizer: DomSanitizer) {
    this.iconSet = settings.defaultSet;
    this.size = settings.defaultSize;
  }

  @HostBinding('class')
  private get classes(): string | undefined {
    if (!this.icon) return;

    const iconSetClass = ICON_SET_CLASS_MAPPING[this.iconSet];
    return `${iconSetClass} ${this.icon} icon-size-${this.size}`;
  }

  @HostBinding('innerHTML')
  private get content(): SafeHtml | undefined {
    if (!this.icon) return undefined;
    if (this.iconSet === 'md') {
      return this.sanitizer.bypassSecurityTrustHtml(this.icon);
    } else if (this.iconSet === 'faSVG') {
      const content = this.settings.svgIconSets.faSVG
        ?.find(icon => icon.iconName === this.icon)
        ?.html.reduce((acc, curr) => acc + curr, '');
      if (!content) return undefined;
      return this.sanitizer.bypassSecurityTrustHtml(content);
    } else if (this.iconSet === 'mdiSVG') {
      const path = this.settings.svgIconSets.mdiSVG ? this.settings.svgIconSets.mdiSVG[this.icon] : undefined;
      if (!path) return undefined;
      return this.sanitizer.bypassSecurityTrustHtml(IconComponent.createSVGElement(path));
    } else if (this.iconSet === 'custom') {
      const path = this.settings.svgIconSets.custom ? this.settings.svgIconSets.custom[this.icon] : undefined;
      if (!path) return undefined;
      return this.sanitizer.bypassSecurityTrustHtml(IconComponent.createSVGElement(path));
    }
    return undefined;
  }

  private static createSVGElement(svgPath: string): string {
    return `<svg viewBox="0 0 24 24"><path d='${svgPath}' fill="currentColor"></path></svg>`;
  }
}
