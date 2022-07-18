import type { ComponentSize } from '../../utils/interfaces';

// TODO This type must always be up-to-date (add new required internal icons here)
export type InternalIcons = 'check' | 'chevronDown' | 'close' | 'closeCircle' | 'edit';

export type IconSet = 'fa4' | 'fa5' | 'md' | 'mdi' | 'custom' | 'faSVG' | 'mdiSVG';
export type InternalIconMappings = { [T in IconSet]: InternalIconSetDefinition };
export type InternalIconSetDefinition = { [T in InternalIcons]: string };

export interface SVGIconSets {
  faSVG?: FontawesomeObject[];
  mdiSVG?: { [T: string]: string };
  custom?: { [T: string]: string };
}

export interface FontawesomeObject {
  iconName: string;
  readonly html: string[];
  readonly node: HTMLCollection;
}

export interface EntireIconSettings {
  defaultSet: IconSet;
  defaultSize: ComponentSize;
  internalIcons: InternalIconMappings;
  svgIconSets: SVGIconSets;
}

export type IconSettings = Partial<EntireIconSettings>;

export const ICON_SET_CLASS_MAPPING: { [K in IconSet]: string } = {
  fa4: 'fa',
  md: 'material-icons',
  custom: '',
  fa5: '',
  mdiSVG: '',
  mdi: 'mdi',
  faSVG: '',
};
