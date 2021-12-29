import { ComponentSize } from '../../utils/interfaces';

// TODO This type must always be up-to-date (add new required internal icons here)
export type InternalIcons = 'add' | 'edit';

export type IconSet = 'fa4' | 'fa5' | 'md' | 'mdi' | 'custom' | 'faSVG' | 'mdiSVG';
export type IconMapping = { [K in IconSet]: string };
export type IconMappingOverrides = Partial<IconMapping>;
export type InternalIconsMapping = { [T in InternalIcons]: IconMapping };
export type InternalIconsMappingOverrides = { [T in InternalIcons]?: IconMappingOverrides };

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

export interface IconSettings {
  defaultSet?: IconSet;
  svgIconSets?: SVGIconSets;
  internalIcons?: InternalIconsMappingOverrides;
  defaultSize?: ComponentSize;
}
