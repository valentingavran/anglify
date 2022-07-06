import { Subscriber } from 'rxjs';

export type SnackbarPosition = 'center' | 'leading';

export interface EntireSnackbarSettings {
  position: SnackbarPosition;
  stacked: boolean;
  timeout: number;
}

export type SnackbarSettings = Partial<EntireSnackbarSettings>;

export interface SnackbarInput {
  label?: string;
  actions?: { label?: string; id?: string };
}

export interface SnackbarOptions<T = SnackbarInput & Record<string, unknown>> extends SnackbarSettings {
  id: string;
  data?: T;
}

export interface SnackbarData<T = unknown> {
  reason: string;
  data?: T;
}

export interface SnackbarContext<T = SnackbarInput> extends SnackbarOptions<T> {
  completeWith: (data: SnackbarData) => void;
  $implicit: Subscriber<unknown>;
  createdAt: number;
}
