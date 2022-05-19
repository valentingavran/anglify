import { Subscriber } from 'rxjs';

export type Position = 'center' | 'leading';

export interface SnackbarSettings {
  position?: Position;
  stacked?: boolean;
  timeout?: number;
}

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
