export type FormFieldType = 'outlined' | 'filled';

export interface EntireFormFieldSettings {
  defaultType: FormFieldType;
  dense: boolean;
  persistentHint: boolean;
  persistentPlaceholder: boolean;
  hideDetails: boolean;
}

export type FormFieldSettings = Partial<EntireFormFieldSettings>;
