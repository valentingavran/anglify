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
  | 'pageLast'
  | 'viewColumn';

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
  /**
   * Applies appropriate margins to the icon inside other components when placed bottom of other elements or texts.
   */
  bottom: boolean;
  /**
   * Changes the cursor to pointer mode.
   */
  clickable: boolean;
  /**
   * Name of the icon to display.
   */
  icon: string | undefined;
  /**
   * Specifies from which IconSet the icon should be displayed. If the iconSet property is not
   * specified, the icon will be searched for in the defaultSet and then displayed
   */
  iconSet: IconSet;
  internalIcons: InternalIconMappings;
  /**
   * Applies appropriate margins to the icon inside other components when placed to the left of another element or text.
   */
  left: boolean;
  /**
   * Applies appropriate margins to the icon inside other components when placed to the right of another element or text.
   */
  right: boolean;
  /**
   * By providing IconSettings, this default value can be overridden globally. Otherwise, this property
   * can be set for individual icons
   */
  size: ComponentSize;
  svgIconSets: SVGIconSets;
  /**
   * Applies appropriate margins to the icon inside other components when placed on top of another element or text.
   */
  top: boolean;
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
