export interface EntireButtonGroupSettings {
  ripple: boolean;
  disabled: boolean;
  readonly: boolean;
  mandatory: boolean;
  multiple: boolean;
  max: number | undefined;
  stateless: boolean;
}

export type ButtonGroupSettings = Partial<EntireButtonGroupSettings>;
