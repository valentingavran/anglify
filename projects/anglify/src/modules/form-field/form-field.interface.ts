export type FormFieldType = 'outlined' | 'filled';

export interface FormFieldSettings {
  defaultType?: FormFieldType;
  dense?: boolean;
  persistentHint?: boolean;
  persistentPlaceholder?: boolean;
  hideDetails?: boolean;
}
