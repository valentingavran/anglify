import type { Subscriber } from 'rxjs';
import type { Position } from '../../composables/position/position.interface';
import type { Overlay } from '../../services/overlay.service';

export type SnackbarPosition = Position | 'center';

export type EntireSnackbarSettings = {
  position: SnackbarPosition;
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

export enum SnackbarInternalDismissReason {
  Dismissed = 'internal.dismissed',
  Priority = 'internal.priority',
  Timeout = 'internal.timeout',
}

export type SnackbarData<T = unknown> = {
  data?: T;
  reason: SnackbarInternalDismissReason | string;
};

export type SnackbarContext<T = SnackbarInput> = SnackbarOptions<T> & {
  $implicit: Subscriber<unknown>;
  completeWith(data: SnackbarData): void;
  createdAt: number;
  overlayRef: Overlay;
};
