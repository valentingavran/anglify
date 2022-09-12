import type { ComponentSize } from '../../utils/interfaces';

export type InternalIcons =
  | 'arrowDown'
  | 'arrowUp'
  | 'check'
  | 'chevronDown'
  | 'chevronLeft'
  | 'chevronRight'
  | 'close'
  | 'closeCircle'
  | 'edit'
  | 'pageFirst'
  | 'pageLast';

export type IconSet = 'custom' | 'fa4' | 'fa5' | 'faSVG' | 'md' | 'mdi' | 'mdiSVG';
export type InternalIconMappings = { [T in IconSet]: InternalIconSetDefinition };
export type InternalIconSetDefinition = { [T in InternalIcons]: string };

export type SVGIconSets = {
  custom?: { [T: string]: string };
  faSVG?: FontawesomeObject[];
  mdiSVG?: { [T: string]: string };
};

export type FontawesomeObject = {
  readonly html: string[];
  iconName: string;
  readonly node: HTMLCollection;
};

export type EntireIconSettings = {
  defaultSet: IconSet;
  defaultSize: ComponentSize;
  internalIcons: InternalIconMappings;
  svgIconSets: SVGIconSets;
};

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
