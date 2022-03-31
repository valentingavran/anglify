import type { BooleanLike } from "../../utils/interfaces";

export interface CheckboxSettings {
  disabled?: BooleanLike,
  checked?: BooleanLike,
  labelPosition?: 'before' | 'after',
  ripple?: BooleanLike
}
