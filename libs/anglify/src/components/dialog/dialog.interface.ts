import type { TemplateRef, Type } from '@angular/core';
import type { Subscriber } from 'rxjs';

export type DialogOptions<T = Record<string, unknown>> = {
  data?: T;
  id: string;
};

export enum DialogInternalCloseReason {
  Backdrop = 'internal.backdrop',
  Escape = 'internal.escape',
}

export type ModalData<T = unknown> = {
  data?: T;
  reason: DialogInternalCloseReason | string;
};

export type DialogContext<T = Record<string, unknown>> = DialogOptions<T> & {
  $implicit: Subscriber<unknown>;
  completeWith(data: ModalData): void;
  component: TemplateRef<any> | Type<any>;
  createdAt: number;
};
