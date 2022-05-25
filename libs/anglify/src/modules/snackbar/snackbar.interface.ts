import { Subscriber } from 'rxjs';

export type SnackbarPosition = 'center' | 'leading';

export interface EntireSnackbarSettings {
  position: SnackbarPosition;
  stacked: boolean;
  timeout: number;
}

export type SnackbarSettings = Partial<EntireSnackbarSettings>;

export interface SnackbarData {
  label?: string;
  actions?: { label?: string; id?: string };
}

export interface SnackbarOptions<T = Record<string, unknown>> extends SnackbarSettings {
  id: string;
  data?: T;
}

export interface SnackbarContext<T = SnackbarData> extends SnackbarOptions<T> {
  completeWith: (result?: any) => void;
  $implicit: Subscriber<unknown>;
  createdAt: number;
}
