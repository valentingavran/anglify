import type { Subscriber } from 'rxjs';

export type SnackbarPosition = 'center' | 'leading';

export type EntireSnackbarSettings = {
  position: SnackbarPosition;
  stacked: boolean;
  timeout: number;
};

export type SnackbarSettings = Partial<EntireSnackbarSettings>;

export type SnackbarInput = {
  actions?: { id?: string; label?: string };
  label?: string;
};

export type SnackbarOptions<T = Record<string, unknown> & SnackbarInput> = SnackbarSettings & {
  data?: T;
  id: string;
};

export enum SnackbarInteralDismissReason {
  Dismissed = 'internal.dismissed',
  Priority = 'internal.priority',
  Timeout = 'internal.timeout',
}

export type SnackbarData<T = unknown> = {
  data?: T;
  reason: SnackbarInteralDismissReason | string;
};

export type SnackbarContext<T = SnackbarInput> = SnackbarOptions<T> & {
  $implicit: Subscriber<unknown>;
  completeWith(data: SnackbarData): void;
  createdAt: number;
};
