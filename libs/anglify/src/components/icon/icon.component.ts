import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, Self } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { createSettingsProvider } from '../../factories/settings.factory';
import { ComponentSize } from '../../utils/interfaces';
import { DEFAULT_ICON_SETTINGS, ICON_SETTINGS } from './icon-settings.token';
import { EntireIconSettings, IconSet, ICON_SET_CLASS_MAPPING } from './icon.interface';

/**
 * Anglify comes bootstrapped with support for Material Design Icons, Material Icons, Font Awesome 4, Font Awesome 5 and Custom Icons.
 * By default, applications will use the Material Design Icons.
 * Anglify supports icons that are provided via CDN's as well as Javascript/Typescript icon distributions.
 */
@Component({
  selector: 'anglify-icon',
  standalone: true,
  template: ``,
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireIconSettings>('anglifyIconSettings', DEFAULT_ICON_SETTINGS, ICON_SETTINGS)],
})
export class IconComponent implements Omit<EntireIconSettings, 'internalIcons' | 'svgIconSets'> {
  @Input() public icon = this.settings.icon;

  @Input() public iconSet: IconSet = this.settings.iconSet;

  @Input() public size: ComponentSize = this.settings.size;

  @Input() public clickable = this.settings.clickable;

  @Input() public left = this.settings.left;

  @Input() public right = false;

  @Input() public top = false;

  @Input() public bottom = false;

  public constructor(
    @Self() @Inject('anglifyIconSettings') private readonly settings: EntireIconSettings,
    private readonly sanitizer: DomSanitizer
  ) {}

  @HostBinding('class')
  protected get classList() {
    if (!this.icon) return [];

    const classNames = [ICON_SET_CLASS_MAPPING[this.iconSet], this.icon, `icon-size-${this.size}`];

    if (this.clickable) {
      classNames.push('clickable');
    }

    if (this.left) {
      classNames.push('left');
    }

    if (this.right) {
      classNames.push('right');
    }

    if (this.top) {
      classNames.push('top');
    }

    if (this.bottom) {
      classNames.push('bottom');
    }

    return classNames.join(' ');
  }

  @HostBinding('innerHTML')
  protected get content() {
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

  private static createSVGElement(svgPath: string) {
    return `<svg viewBox="0 0 24 24"><path d='${svgPath}' fill="currentColor"></path></svg>`;
  }
}
