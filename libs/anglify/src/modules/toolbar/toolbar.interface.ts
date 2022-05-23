import { BooleanLike } from '../../utils/interfaces';

export interface EntireToolbarSettings {
  prominent: BooleanLike;
  navigation: BooleanLike;
  collapse: BooleanLike;
}

export type ToolbarSettings = Partial<EntireToolbarSettings>;
