import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input } from '@angular/core';
import { ICON_SETTINGS } from './icon-settings.token';
import { IconSet, IconSettings } from './icon.interface';
import { BooleanLike, ComponentSize } from '../../utils/interfaces';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isBooleanLikeTrue } from '../../utils/functions';

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
   * By providing IconSettings, this default value can be overridden globally. Otherwise, this property
   * can be set for individual icons
   * @default "regular"
   */
  @Input() public size: ComponentSize;
  @Input() public clickable: BooleanLike = false;
  @Input() public disabled: BooleanLike = false;

  public constructor(@Inject(ICON_SETTINGS) private readonly settings: Required<IconSettings>, private readonly sanitizer: DomSanitizer) {
    this.iconSet = settings.defaultSet;
    this.size = settings.defaultSize;
  }

  @HostBinding('class')
  private get classList(): string | undefined {
    if (!this.icon) return;

    const classNames = ['anglify-icon', ICON_SET_CLASS_MAPPING[this.iconSet], this.icon, `icon-size-${this.size}`];

    if (isBooleanLikeTrue(this.clickable)) {
      classNames.push('clickable');
    }

    if (isBooleanLikeTrue(this.disabled)) {
      classNames.push('disabled');
    }

    return classNames.join(' ');
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
