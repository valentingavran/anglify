import { BooleanLike } from '../../utils/interfaces';

export interface EntireToolbarSettings {
  prominent: BooleanLike;
  collapse: BooleanLike;
}

export type ToolbarSettings = Partial<EntireToolbarSettings>;
