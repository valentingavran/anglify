export type EntireButtonGroupSettings = {
  disabled: boolean;
  mandatory: boolean;
  max: number | undefined;
  multiple: boolean;
  readonly: boolean;
  ripple: boolean;
  stateless: boolean;
};

export type ButtonGroupSettings = Partial<EntireButtonGroupSettings>;
