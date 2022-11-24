import { ViewContainerRef, type ComponentRef, type Provider } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';
import type { CheckboxIcons } from '../checkbox.interface';
import { CHECKBOX_ICONS_FACTORY } from '../tokens/checkbox-icons.token';

export class CheckboxIconRef {
  public readonly iconOnCompRef: ComponentRef<IconComponent>;

  public readonly iconOffCompRef: ComponentRef<IconComponent>;

  public constructor(public vcr: ViewContainerRef, checkboxIcons: CheckboxIcons) {
    this.iconOnCompRef = vcr.createComponent(IconComponent);
    this.iconOnCompRef.instance.icon = checkboxIcons.iconOnState;
    this.iconOnCompRef.instance.iconSet = checkboxIcons.iconPack ?? 'mdi';

    this.iconOffCompRef = vcr.createComponent(IconComponent);
    this.iconOffCompRef.instance.icon = checkboxIcons.iconOffState;
    this.iconOffCompRef.instance.iconSet = checkboxIcons.iconPack ?? 'mdi';
  }

  public removeCompRef(comp: 'OFFICON' | 'ONICON') {
    const compToRemove = comp === 'ONICON' ? this.iconOnCompRef.hostView : this.iconOffCompRef.hostView;
    const index = this.vcr.indexOf(compToRemove);
    this.vcr.remove(index);
  }
}

export function registerCustomIcons(checkboxIcons: CheckboxIcons): Provider {
  return {
    provide: CHECKBOX_ICONS_FACTORY,
    useFactory: (vcr: ViewContainerRef) => () => new CheckboxIconRef(vcr, checkboxIcons),
    deps: [ViewContainerRef],
  };
}
